"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import LoadingSpinner from "./LoadingSpinner";
import Editor from "./Editor";
import useOwner from "../hooks/useOwner";
import DeleteDocument from "./DeleteDocument";
import InviteUser from "./InviteUser";
import ManageUsers from "./ManageUsers";
import Avatars from "./Avatars";
import { useTheme } from "./ThemeProvider";

function Document({ id }: { id: string }) {
  const docRef = doc(db, "documents", id);
  const [data, loading, error] = useDocumentData(docRef);
  const [input, setInput] = useState("");
  const [isUpdating, startTransition] = useTransition();
  const isOwner = useOwner();
  const { theme } = useTheme();

  useEffect(() => {
    if (data?.title) {
      setInput(data.title);
    }
  }, [data]);

  const updateTitle = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      startTransition(async () => {
        await updateDoc(docRef, {
          title: input,
          lastUpdated: new Date().toISOString(),
        });
      });
    } catch (err) {
      console.error("Error updating title:", err);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.error("Error details:", error.message);
  }

  if (!data) {
    console.warn("No data found for document ID:", id);
  }

  return (
    <div className={`flex-1 h-full transition-colors duration-200 ${theme === "dark"
      ? "bg-[#020817] text-white"
      : "bg-white"
      } p-5`}>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col pb-5">
          <form
            onSubmit={updateTitle}
            className="flex flex-col sm:flex-row w-full gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Document title"
              className={`flex-1 ${theme === "dark"
                ? "bg-gray-800 text-white border-gray-700"
                : ""
                }`}
            />
            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={isUpdating || !input.trim()}
                className="flex-1 sm:flex-none whitespace-nowrap"
              >
                {isUpdating ? "Updating..." : "Update"}
              </Button>

              {isOwner && (
                <div className="flex gap-2 flex-1 sm:flex-none">
                  <InviteUser />
                  <DeleteDocument />
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className={`flex max-w-6xl mx-auto justify-between items-center mb-5 ${theme === "dark" ? "text-gray-200" : ""
        }`}>
        <ManageUsers />
        <Avatars />
      </div>

      <hr className={`pb-10 ${theme === "dark" ? "border-gray-800" : ""}`} />

      <Editor />
    </div>
  );
}

export default Document;