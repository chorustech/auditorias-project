/* DATA */
import {
  mainEvenStyles,
  mainOddStyles,
  rowEvenStyles,
  rowOddStyles,
} from "@/components/shared/download/data/shared/mainStyles";
import { usersColumnsId } from "@/components/shared/download/data/users/usersColumnsId";

/* LIBS */
import * as XLSX from "xlsx-js-style";

/* TYPES */
import { LettersObject } from "@/components/shared/download/types/shared/lettersObject";
import { UserType } from "@/temp/Users/Infrastructure/Types/userData";

export function setColumnsStyles(
  worksheet: XLSX.WorkSheet,
  users: UserType[],
): XLSX.WorkSheet {
  worksheet = setColumnsStylesLoop(worksheet, usersColumnsId, users);

  return worksheet;
}

function setColumnsStylesLoop(
  worksheet: XLSX.WorkSheet,
  columnsIdObject: LettersObject,
  users: UserType[],
): XLSX.WorkSheet {
  columnsIdObject.main.forEach(
    (letter, index) =>
      (worksheet[letter + "1"].s =
        index % 2 === 0 ? mainEvenStyles : mainOddStyles),
  );

  users.forEach((_, index) => {
    columnsIdObject.main.forEach(
      (letter) =>
        (worksheet[letter + (index + 2)].s =
          index % 2 === 0 ? rowEvenStyles : rowOddStyles),
    );
  });

  return worksheet;
}
