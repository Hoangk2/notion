'use client'
import NewDocumentButton from "./NewDocumentButton"
import { useCollection } from "react-firebase-hooks/firestore"
import { useUser } from "@clerk/nextjs"
import { collectionGroup, where, query, DocumentData } from "firebase/firestore";
import { db } from "@/firebase"
import { useEffect, useState } from "react"
import { useTheme } from "./ThemeProvider"
import SidebarOptions from "./SidebarOptions"

interface RoomDocument extends DocumentData {
    createdAt: string;
    role: "owner" | "editor";
    userId: string;
    roomId: string;
}
interface SidebarProps {
    className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
    const [groupedData, setGroupedData] = useState<{
        owner: RoomDocument[];
        editor: RoomDocument[];
    }>({
        owner: [],
        editor: [],
    });

    const { theme } = useTheme();
    const { user } = useUser();
    const [data, _loading, _error] = useCollection(
        user && (
            query(
                collectionGroup(db, 'rooms'),
                where('userId', '==', user.emailAddresses[0].toString()),
            )
        )
    )
    useEffect(() => {
        if (!data) return;
        const grouped = data.docs.reduce<{
            owner: RoomDocument[];
            editor: RoomDocument[];
        }>(
            (acc, curr) => {
                const roomData = curr.data() as RoomDocument;
                if (roomData.role === "owner") {
                    acc.owner.push({
                        id: curr.id,
                        ...roomData,
                    }
                    );
                } else {
                    acc.editor.push({
                        id: curr.id,
                        ...roomData,
                    });
                }
                return acc;
            }
            , { owner: [], editor: [] });

        setGroupedData(grouped);
    }, [data])
    const menuOptions = (
        <>
            <NewDocumentButton />
            <div className="flex py-1 flex-col">
                {groupedData.owner.length === 0 ? (
                    <h2 className="text-gray-500 font-semibold text-sm">
                        You have no documents
                    </h2>
                ) : (
                    <>
                        <h2 className="text-gray-500 font-semibold text-sm">My Documents</h2>
                        {groupedData.owner.map((doc) => (
                            <SidebarOptions key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
                        ))}
                    </>
                )}
                {groupedData.editor.length === 0 ? (
                    <h2 className="text-gray-500 font-semibold text-sm">
                        You have no shared documents
                    </h2>
                ) : (
                    <>
                        <h2 className="text-gray-500 font-semibold text-sm">Shared with me</h2>
                        {groupedData.editor.map((doc) => (
                            <SidebarOptions key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
                        ))}
                    </>
                )}
            </div>
        </>
    );
    return (
        <div className={` ${className}  scrollbar-hide`}>
            <div className={`lg:p-5 relative ${theme === "dark" ? "bg-[#020817] text-gray-200" : "bg-gray-200"}   `}>
                <div className="hidden lg:inline overflow-y-auto scrollbar-hide">
                    {menuOptions}
                </div>
            </div>
        </div>
    )
}
export default Sidebar