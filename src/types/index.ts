import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Stock = "money" | "percent"

export type SelectOption = {
  key: string | number;
  title: string;
  [key: string]: any;
};