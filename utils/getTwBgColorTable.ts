export const getTwBgColorTable = ({ index }: { index: number }) => {
  return index % 2 ? "bg-neutral-100" : "bg-white";
};
