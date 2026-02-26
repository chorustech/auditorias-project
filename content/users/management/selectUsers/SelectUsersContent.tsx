"use client";

/* COMPONENTS */
import { SectionContainer } from "@/components/shared/sectionContainer/SectionContainer";
import { DinamicTable } from "@/components/shared/dinamicTable/DinamicTable";
import { DinamicTh } from "@/components/shared/dinamicTable/dinamicRow/DinamicTh";
import { DinamicRow } from "@/components/shared/dinamicTable/dinamicRow/DinamicRow";
import { UserRowContent } from "./rowContent/UserRowContent";

/* DATA */
import { usersColumns } from "../../data/columns/usersColumns";

/* HOOKS */
import { useState, useEffect } from "react";

/* ICONS */
import { House } from "lucide-react";

/* NAVIGATION */
import { useRouter } from "next/navigation";

/* SERVER ACTION */
import { getUsers, UserData } from "@/temp/users/getUsers";

export function SelectUsersContent() {
  const router = useRouter();
  const [users, setUsers] = useState<UserData>({ data: [], count: 0 });
  const [loading, setLoading] = useState(true);
  const type = "usuario";

  const getTwBgColor = ({ index }: { index: number }) => {
    return index % 2 ? "bg-neutral-100" : "bg-white";
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();

      setUsers(data);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <SectionContainer>
      <DinamicTable
        theadColumns={usersColumns.map((column, index) => (
          <DinamicTh key={index} column={column} />
        ))}
        tbodyRows={users.data.map((user, index) => (
          <DinamicRow key={index} twBgColor={getTwBgColor({ index: index })}>
            <UserRowContent
              user={user}
              twBgColor={`${getTwBgColor({ index: index })}`}
            />
          </DinamicRow>
        ))}
        loading={loading}
        count={users.count}
        type={type}
        backAction={() => router.push("/home")}
        filterAction={() => {}}
        addAction={() => router.push("/users/add")}
        excelAction={() => {}}
        backContent={<House className="size-5"/>}
      />
    </SectionContainer>
  );
}
