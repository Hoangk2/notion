import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react/suspense";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/firebase";

const useOwner = () => {
    const [isOwner, setIsOwner] = useState(false);
    const { user } = useUser();
    const room = useRoom();
    
    const [usersInRoom] = useCollection(
        room?.id ? query(collectionGroup(db, "rooms"), where("roomId", "==", room.id)) : null
        
    );
    
    useEffect(() => {
        if (usersInRoom?.docs && usersInRoom.docs.length > 0) {
        const owners = usersInRoom.docs.filter(
            (doc) => doc.data().role === "owner"
        );
        if (
            owners.some(
                (owner) => owner.data().userId === user?.primaryEmailAddress?.emailAddress      
            )
        ) {
            setIsOwner(true);
        }
    }
}, [usersInRoom, user]);
return isOwner;
};

export default useOwner;
