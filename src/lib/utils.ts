import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));


export const tryCatch = async (fn: () => Promise<any>) => {
  try {
    return await fn();
  } catch (error) {
    throw error;
  }
};