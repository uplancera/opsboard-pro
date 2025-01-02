"use server";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
export async function signInWithCredentials(formData: FormData) {
  try {
    await signIn("credentials", { email: formData.get("email"), password: formData.get("password"), redirectTo: "/dashboard" });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) return { success: false, message: "Invalid email or password." };
    throw error;
  }
}
