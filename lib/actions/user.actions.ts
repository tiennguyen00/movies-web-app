"use server";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../server/appwrite";

export const signUp = async (email: string, password: string) => {
  try {
    const { account } = await createAdminClient();

    const newUsers = await account.create(ID.unique(), email, password);
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("my-custom-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return JSON.parse(JSON.stringify(newUsers));
  } catch {
    return null;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    return JSON.parse(JSON.stringify(session));
  } catch {}
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    return null;
  }
}

export async function logoutAccount() {
  try {
    const { account } = await createAdminClient();
    cookies().delete("my-custom-session");
    await account.deleteSession("current");
  } catch {}
}
