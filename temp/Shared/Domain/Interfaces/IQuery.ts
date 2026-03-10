export interface IQuery<T> {
  page: number;
  perPage: number;
  order: "asc" | "desc";
  orderBy: keyof T;
  filters: Filter<T>[];
  checkFilters: boolean;
}

interface Filter<T> {
  field: keyof T;
  operator: Operator;
  value: string | number;
}

type Operator = "=" | "!=" | "<" | "<=" | ">" | ">=";
