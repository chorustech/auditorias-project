export type StyleObject = {
  font?: {
    bold: boolean;
    color: {
      rgb: string;
    };
  };
  alignment?: {
    vertical: "center";
    horizontal: "center" | "left";
    wrapText: boolean;
  };
  fill?: {
    patternType: "solid";
    fgColor: {
      rgb: string;
    };
  };
  border?: {
    top: {
      style: "thin" | "medium" | "thick" | "dashed" | "dotted" | "double";
      color: {
        rgb: string;
      };
    };
    bottom: {
      style: "thin" | "medium" | "thick" | "dashed" | "dotted" | "double";
      color: {
        rgb: string;
      };
    };
    left: {
      style: "thin" | "medium" | "thick" | "dashed" | "dotted" | "double";
      color: {
        rgb: string;
      };
    };
    right: {
      style: "thin" | "medium" | "thick" | "dashed" | "dotted" | "double";
      color: {
        rgb: string;
      };
    };
  };
};
