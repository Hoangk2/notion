import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react/suspense";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

const useOwner = () => {
  const [isOwner, setIsOwner] = useState(false);
  const { user } = useUser();
  const room = useRoom();

  useEffect(() => {
    if (!user || !room?.id) return;
    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) return;

    const roomRef = doc(db, "users", email, "rooms", room.id);
    getDoc(roomRef).then((snapshot) => {
      setIsOwner(snapshot.exists() && snapshot.data()?.role === "owner");
    });
  }, [user, room?.id]);

  return isOwner;
};

export default useOwner;