import { FC, PropsWithChildren } from "react"
import { TextPropsType } from "./types"
import { cn } from "@/lib/shadcn/utils"
import { textVariants } from "./variants"

export const Text: FC<PropsWithChildren<TextPropsType>> = ({
  children,
  color = "default",
  size = "default",
  weight = "default",
  tag = "p",
  font = "sans",
  className = "",
  ...otherProps
}) => {
  const Tag: TextPropsType['tag'] = tag

  return (
    <Tag
      className={ cn(textVariants({color, size, weight, font, className}))}
      {...otherProps}
    >
      {children}
    </Tag>
  )
}
