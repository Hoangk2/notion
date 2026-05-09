"use client";

import { useState, useTransition } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { useRoom } from "@liveblocks/react/suspense";
import { removeUserFromDocument } from "@/actions/actions";
import useOwner from "../hooks/useOwner";

function ManageUsers() {
    const { user } = useUser();
    const room = useRoom();
    const isOwner = useOwner();

    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const [usersInRoom] = useCollection(
    user && room?.id
        ? query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
        : null
    );
    const handleDelete = async (userId: string) => {
    startTransition(async () => {
        if (!user) return;

        const { success } = await removeUserFromDocument(room.id, userId);

        if (success) {
        toast.success("User removed from room successfully.");
        } else {
        toast.error("Failed to remove the user from the room.");
        }
    });
    };

    return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button asChild variant="outline">
        <DialogTrigger>Users ({usersInRoom?.docs.length})</DialogTrigger>
        </Button>

        <DialogContent>
        <DialogHeader>
            <DialogTitle>Users with Access</DialogTitle>
            <DialogDescription>
            Below is a list of all users who have access to this document.
            </DialogDescription>
        </DialogHeader>

        <hr className="my-2" />

        <div>
            {usersInRoom?.docs.map((doc) => (
            <div
                key={doc.data().userId}
                className="flex items-center justify-between"
            >
                <p className="font-light">
                {doc.data().userId === user?.emailAddresses[0].toString()
                    ? `You (${doc.data().userId})`
                    : doc.data().userId}
                </p>

                <div className="flex items-center my-1">
                <Button variant="outline">{doc.data().role}</Button>

                {isOwner &&
                    doc.data().userId !== user?.emailAddresses[0].toString() && (
                    <Button
                        variant="destructive"
                        onClick={() => handleDelete(doc.data().userId)}
                        disabled={isPending}
                        size="sm"
                        className="ml-1"
                    >
                        {isPending ? "Removing..." : "X"}
                    </Button>
                    )}
                </div>
            </div>
            ))}
        </div>
        </DialogContent>
    </Dialog>
    );
}

export default ManageUsers;
