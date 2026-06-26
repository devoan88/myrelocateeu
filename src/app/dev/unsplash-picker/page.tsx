import UnsplashImagePicker from "@/components/dev/UnsplashImagePicker";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unsplash image picker (dev)",
  robots: { index: false, follow: false },
};

export default function UnsplashPickerPage() {
  return <UnsplashImagePicker />;
}
