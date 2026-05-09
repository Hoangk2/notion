'use client'
import { SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Breadcrumb from "./Breadcrumbs";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import React from 'react';
import { useTheme } from './ThemeProvider';
import { MenuSquareIcon } from "lucide-react"
import NewDocumentButton from "./NewDocumentButton"
import { useCollection } from "react-firebase-hooks/firestore"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { collectionGroup, where, query, DocumentData } from "firebase/firestore";
import { db } from "@/firebase"
import { useEffect, useState } from "react"
import SidebarOptions from "./SidebarOptions"

interface RoomDocument extends DocumentData {
    createdAt: string;
    role: "owner" | "editor";
    userId: string;
    roomId: string;
}

interface HeaderProps {
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
    const { user } = useUser();
    const { theme, toggleTheme } = useTheme();
    const style = `gap-2 hover:text-white ${theme === "dark"
        ? "text-gray-300 bg-[#020817] hover:bg-gray-100 hover:text-gray-700"
        : "text-gray-700 bg-white hover:bg-[#020817] hover:text-gray-300"
        }`;
    const [groupedData, setGroupedData] = useState<{
        owner: RoomDocument[];
        editor: RoomDocument[];
    }>({
        owner: [],
        editor: [],
    });

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
        <div className={className}>
            <div className="flex flex-row gap-2 items-center justify-center p-3">
                <div className="lg:hidden">
                    <Sheet>
                        <SheetTrigger>
                            <MenuSquareIcon className={theme === "dark" ? "text-white" : "text-gray-700"} size={24} />
                        </SheetTrigger>
                        <SheetContent side={"left"} className={theme === "dark" ? "bg-[#020817]" : "bg-white"}>
                            <SheetHeader>
                                <SheetTitle className={theme === "dark" ? "text-white" : "text-[#020817]"}>Menu</SheetTitle>
                                <div className="overflow-y-auto scrollbar-hide">{menuOptions}</div>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>

                {user && (
                    <h1 className="lg:text-2xl text-1xl text-primary font-semibold">
                        {user.firstName}
                        {`'s `} Space
                    </h1>
                )}

                <div className="hidden md:block ml-auto">
                    <Breadcrumb />
                </div>

                <div className="flex ml-auto">
                    <div className="flex gap-2">
                        <Button className={style} onClick={toggleTheme}>
                            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                        </Button>
                        <UserButton />
                    </div>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>

                </div>
            </div>
        </div>
    );
};

export default Header;