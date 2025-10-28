"use server";

import { signIn, signOut, auth } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate() {
  try {
    await signIn("facebook", { redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Credenciais inválidas.";
        default:
          return "Algo deu errado.";
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: "/login" });
}

export async function getSession() {
  return await auth();
}
