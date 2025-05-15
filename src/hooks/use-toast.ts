
import { useToast as useToastOriginal } from "@/components/ui/toast"
import { toast as toastOriginal } from "@/components/ui/toast"

export const useToast = useToastOriginal
export const toast = toastOriginal

export type { ToastProps, ToastActionElement } from "@/components/ui/toast"
