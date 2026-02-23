export interface SearchArea {
  search(slug: string): Promise<number>;
}
