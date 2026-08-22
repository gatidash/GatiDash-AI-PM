import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// shadcn/21st convention: merge conditional + tailwind classes safely
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
