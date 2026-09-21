import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * shadcn/ui 标准的 className 合并工具。
 * 先做条件拼接，再用 tailwind-merge 消解冲突的 Tailwind 类。
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
