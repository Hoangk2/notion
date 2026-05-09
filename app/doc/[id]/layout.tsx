import { ReactNode } from "react";
import { auth } from "@clerk/nextjs/server";
import RoomProvider from "@/components/RoomProvider";

async function DocumentLayout({ children, params }: { children: ReactNode; params: Promise<{id :string}> }) {
  auth.protect();
  const id = (await params).id
  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}

export default DocumentLayout;
