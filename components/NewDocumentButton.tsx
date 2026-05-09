"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { creatNewDocument } from "@/actions/actions";
import { useUser } from "@clerk/nextjs";
import { useTheme } from "./ThemeProvider";

const NewDocumentButton = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { theme } = useTheme();

  const handleCreatNewDocument = () => {
    if (!isSignedIn) {
      router.push(
        "https://chief-lion-94.accounts.dev/sign-up?redirect_url=https://notion-clone-m0hamedhanys-projects.vercel.app/"
      );
      return;
    }

    startTransition(async () => {
      const { docId } = await creatNewDocument();
      router.push(`/doc/${docId}`);
    });
  };

  return (
    <Button onClick={handleCreatNewDocument} disabled={isPending} className={`${theme === "dark"
      ? "bg-gray-300 text-[#020817] hover:bg-gray-800 hover:text-gray-300 border-gray-700"
      : "bg-primary text-primary-foreground hover:bg-primary/90 border-gray-400"
      }`}>
      {isPending ? "Creating..." : "Create New Document"}
    </Button>
  );
};

export default NewDocumentButton;
