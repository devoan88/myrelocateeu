import RegisterForm from "@/components/auth/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create a free RelocateEU account for your relocation checklist.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
