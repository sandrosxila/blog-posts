import PostBoard from "@/components/post-board";
import { authOptions } from './api/auth/[...nextauth]/route'
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";

export default async function Home() {

  const session = await getServerSession(authOptions)
  if(session?.error === "RefreshTokenError") {
    await signIn("keycloak");
  }

  return (
    <PostBoard />
  );
}
