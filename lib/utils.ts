import axios from "axios";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const logError = (error: unknown, context: string) => {
  if (axios.isAxiosError(error)) {
    console.error(
      `[Axios Error in ${context}]:`,
      error.response?.data || error.message
    );
  } else if (error instanceof Error) {
    console.error(`[Error in ${context}]:`, error.message);
  } else {
    console.error(`[Unknown Error in ${context}]:`, error);
  }
};
