import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generate a unique ID (for mock data - in production, use database-generated IDs)
let idCounter = 0;
export function generateId(prefix: string = "id"): string {
  idCounter++;
  return `${prefix}-${idCounter}-${Math.random().toString(36).substring(2, 9)}`;
}
