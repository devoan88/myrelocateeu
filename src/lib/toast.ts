import { toast } from "sonner";

export function toastProgressSaved() {
  toast.success("Progress saved");
}

export function toastStepCompleted() {
  toast.success("Step completed");
}

export function toastReportSubmitted() {
  toast.success("Report submitted");
}

export function toastSaveError() {
  toast.error("Error saving");
}
