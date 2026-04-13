"use client";

/* COMPONENTS */
import { SectionContainer } from "@/components/shared/sectionContainer/SectionContainer";
import { DinamicTable } from "@/components/shared/dinamicTable/DinamicTable";
import { DinamicTh } from "@/components/shared/dinamicTable/dinamicRow/DinamicTh";
import { DinamicRow } from "@/components/shared/dinamicTable/dinamicRow/DinamicRow";
import { UserRowContent } from "@/content/users/management/selectUsers/rowContent/UserRowContent";
import { FilterUsersContent } from "@/content/users/management/selectUsers/filterUsers/FilterUsersContent";
import { ExcelDownloadUsersButton } from "@/components/shared/download/ExcelDownloadUsersButton";

/* DATA */
import { usersColumns } from "@/content/users/data/columns/usersColumns";

/* HOOKS */
import { useState, useEffect } from "react";

/* ICONS */
import { House } from "lucide-react";

/* NAVIGATION */
import { useRouter } from "next/navigation";

/* TYPES */
import { UserPrimitive } from "@/src/users";

/* SERVER ACTION */
import { getAllUsersAction } from "@/src/users/infrastructure/actions/get-all";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";
import { useUsersFilter } from "@/stores/filter/users/filterUsersStore";
import { useModal } from "@/stores/modal/modalStore";

/* UTILS */
import { getTwBgColorTable } from "@/utils/getTwBgColorTable";

export function SelectUsersContent() {
  const router = useRouter();
  const [users, setUsers] = useState<{ data: UserPrimitive[]; count: number }>({
    data: [],
    count: 0,
  });
  const [loading, setLoading] = useState(true);

  const { setModal } = useModal();
  const { setAnnouncement } = useAnnouncement();
  const { filter, setFilter } = useUsersFilter();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!filter) return;

      try {
        setLoading(true);

        // ✅ Pasamos el filter a la action
        const response = await getAllUsersAction({
          page: filter.page,
          perPage: filter.perPage,
          order: filter.order,
          orderBy: filter.orderBy,
          filters: filter.filters ?? [],
        });

        if (response.ok) {
          setUsers({ data: response.data, count: response.count });
        } else {
          setAnnouncement({
            isActivated: true,
            isOk: false,
            message: response.message,
          });
        }
      } catch (error) {
        console.log("Hubo un error al obtener los usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [filter, setAnnouncement]);

  const nextPage = () => {
    if (!filter) return;
    const totalPages = Math.ceil(users.count / filter.perPage);
    if (filter.page + 1 < totalPages) {
      setFilter({ ...filter, page: filter.page + 1 });
    }
  };

  const prevPage = () => {
    if (!filter || filter.page === 0) return;
    setFilter({ ...filter, page: filter.page - 1 });
  };

  const hasNextPage =
    filter && (filter.page + 1) * filter.perPage < users.count;
  const totalPages = filter ? Math.ceil(users.count / filter.perPage) : 1;

  return (
    <SectionContainer>
      <DinamicTable
        theadColumns={usersColumns.map((column, index) => (
          <DinamicTh key={index} column={column} />
        ))}
        tbodyRows={users.data.map((user, index) => (
          <DinamicRow key={index} twBgColor={getTwBgColorTable({ index })}>
            <UserRowContent
              user={user}
              twBgColor={getTwBgColorTable({ index })}
            />
          </DinamicRow>
        ))}
        loading={loading}
        count={users.count}
        type={"usuario"}
        backAction={() => router.push("/home")}
        filterAction={() =>
          setModal({
            isActivated: true,
            title: "Filtrar",
            body: <FilterUsersContent />,
          })
        }
        addAction={() => router.push("/users/add")}
        excelButtonContent={
          <ExcelDownloadUsersButton
            query={{
              page: 0,
              perPage: users.count,
              order: filter?.order ?? "asc",
              orderBy: filter?.orderBy ?? "id",
              filters: filter?.filters ?? [],
            }}
          />
        }
        backContent={<House className="size-5" />}
        goBack={filter?.page !== 0}
        goNext={!!hasNextPage}
        goBackAction={prevPage}
        goNextAction={nextPage}
        pageFirstHalf={(filter?.page ?? 0) + 1}
        pageSecondHalf={totalPages > 0 ? totalPages : 1}
      />
    </SectionContainer>
  );
}
