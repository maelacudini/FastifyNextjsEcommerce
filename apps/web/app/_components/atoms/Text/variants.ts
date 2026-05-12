import { cva } from "class-variance-authority";

export const textVariants = cva(
  "",
  {
    variants: {
      size: {
        "default": "text-base",
        "sm": "text-sm",
        "lg": "text-lg",
        "xl": "text-xl",
        "2xl": "text-2xl",
        "3xl": "text-3xl",
        "4xl": "text-4xl",
        "5xl": "text-5xl",
        "6xl": "text-6xl",
      },
      weight: {
        default: "font-normal",
        thin: "font-thin",
        extralight: "font-extralight",
        light: "font-light",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        extrabold: "font-extrabold",
        black: "font-black",
      },
      color: {
        default: "text-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
      },
      font: {
        sans: "font-sans",
        heading: "font-heading",
      },
    },
    defaultVariants: {
      size: "default",
      weight: "default",
      color: "default",
      font: "sans",
    },
  }
)