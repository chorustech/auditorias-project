/* TYPES */
import { StyleObject } from "@/components/shared/download/types/shared/styleObject";

export const mainEvenStyles: StyleObject = {
  font: {
    bold: true,
    color: { rgb: "FFFFFFFF" },
  },
  fill: {
    patternType: "solid",
    fgColor: { rgb: "FF00A0D0" },
  },
  alignment: {
    horizontal: "center",
    vertical: "center",
    wrapText: true,
  },
};

export const mainOddStyles: StyleObject = {
  font: {
    bold: true,
    color: { rgb: "FFFFFFFF" },
  },
  fill: {
    patternType: "solid",
    fgColor: { rgb: "FF0BB1E3" },
  },
  alignment: {
    horizontal: "center",
    vertical: "center",
    wrapText: true,
  },
};

export const sectionEvenStyles: StyleObject = {
  font: {
    bold: true,
    color: { rgb: "FFFFFFFF" },
  },
  fill: {
    patternType: "solid",
    fgColor: { rgb: "FFF97316" },
  },
  alignment: {
    horizontal: "center",
    vertical: "center",
    wrapText: true,
  },
};

export const sectionOddStyles: StyleObject = {
  font: {
    bold: true,
    color: { rgb: "FFFFFFFF" },
  },
  fill: {
    patternType: "solid",
    fgColor: { rgb: "FFF43F5E" },
  },
  alignment: {
    horizontal: "center",
    vertical: "center",
    wrapText: true,
  },
};

export const sectionEvenSentencesStyles: StyleObject = {
  font: {
    bold: false,
    color: { rgb: "FF000000" },
  },
  fill: {
    patternType: "solid",
    fgColor: { rgb: "FFFED7AA" },
  },
  alignment: {
    horizontal: "left",
    vertical: "center",
    wrapText: true,
  },
  border: {
    top: {
      color: { rgb: "FFF97316" },
      style: "medium",
    },
    bottom: {
      color: { rgb: "FFF97316" },
      style: "medium",
    },
    left: {
      color: { rgb: "FFF97316" },
      style: "medium",
    },
    right: {
      color: { rgb: "FFF97316" },
      style: "medium",
    },
  },
};

export const sectionOddSentencesStyles: StyleObject = {
  font: {
    bold: false,
    color: { rgb: "FF000000" },
  },
  fill: {
    patternType: "solid",
    fgColor: { rgb: "FFFECDD3" },
  },
  alignment: {
    horizontal: "left",
    vertical: "center",
    wrapText: true,
  },
  border: {
    top: {
      color: { rgb: "FFF43F5E" },
      style: "medium",
    },
    bottom: {
      color: { rgb: "FFF43F5E" },
      style: "medium",
    },
    left: {
      color: { rgb: "FFF43F5E" },
      style: "medium",
    },
    right: {
      color: { rgb: "FFF43F5E" },
      style: "medium",
    },
  },
};

export const rowEvenStyles: StyleObject = {
  alignment: {
    horizontal: "left",
    vertical: "center",
    wrapText: true,
  },
};

export const rowOddStyles: StyleObject = {
  fill: {
    patternType: "solid",
    fgColor: { rgb: "FFE5E5E5" },
  },
  alignment: {
    horizontal: "left",
    vertical: "center",
    wrapText: true,
  },
};

export const sentenceWhileTrueStyles: StyleObject = {
  font: {
    bold: true,
    color: { rgb: "FFFFFFFF" },
  },
  fill: {
    patternType: "solid",
    fgColor: { rgb: "FF22C55E" },
  },
  alignment: {
    horizontal: "center",
    vertical: "center",
    wrapText: true,
  },
  border: {
    top: {
      color: { rgb: "FF16A34A" },
      style: "medium",
    },
    bottom: {
      color: { rgb: "FF16A34A" },
      style: "medium",
    },
    left: {
      color: { rgb: "FF16A34A" },
      style: "medium",
    },
    right: {
      color: { rgb: "FF16A34A" },
      style: "medium",
    },
  },
};

export const sentenceWhileFalseStyles: StyleObject = {
  font: {
    bold: true,
    color: { rgb: "FFFFFFFF" },
  },
  fill: {
    patternType: "solid",
    fgColor: { rgb: "FFEF4444" },
  },
  alignment: {
    horizontal: "center",
    vertical: "center",
    wrapText: true,
  },
  border: {
    top: {
      color: { rgb: "FFDC2626" },
      style: "medium",
    },
    bottom: {
      color: { rgb: "FFDC2626" },
      style: "medium",
    },
    left: {
      color: { rgb: "FFDC2626" },
      style: "medium",
    },
    right: {
      color: { rgb: "FFDC2626" },
      style: "medium",
    },
  },
};
