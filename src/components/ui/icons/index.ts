// src/components/ui/icons/index.ts

import { brandIcons } from "./brands";
import { codeIcons } from "./code";
import { fileIcons } from "./file";
import { techIcons } from "./tech";
import { uiIcons } from "./ui";

export type IconData =
  | string
  | {
      body: string;
      viewBox?: string;
      strokeLinecap?: "butt" | "round" | "square" | "inherit";
      strokeLinejoin?: "miter" | "round" | "bevel" | "inherit";
    };

export const ICONS = {
  ...uiIcons,
  ...brandIcons,
  ...techIcons,
  ...codeIcons,
  ...fileIcons,
} as const;

export type UiIcon = keyof typeof uiIcons;
export type BrandIcon = keyof typeof brandIcons;
export type TechIcon = keyof typeof techIcons;

export type IconName = UiIcon | BrandIcon | TechIcon;
