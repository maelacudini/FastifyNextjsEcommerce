import type { HTMLAttributes } from "react"
import { VariantProps } from "class-variance-authority"
import { textVariants } from "./variants"

type TextType =
  | HTMLAttributes<HTMLParagraphElement>
  | HTMLAttributes<HTMLHeadingElement>
  | HTMLAttributes<HTMLSpanElement>

export type TextPropsType = VariantProps<typeof textVariants> & TextType & {
  tag?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}