import { ButtonHTMLAttributes } from "react";
import { sizes, variants } from "./style";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { 
  variant?: keyof typeof variants,
  size?: keyof typeof sizes,
  asChild?: boolean
}