import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useTheme } from "./ThemeProvider";

function SidebarOptions({ href, id }: { href: string; id: string }) {
    const [data, _loading, _error] = useDocumentData(doc(db, "documents", id));
    const pathName = usePathname();
    const isActive = href.includes(pathName) && pathName !== "/";
    const { theme } = useTheme();

    if (!data) return null;

    return (
        <Link
            href={href}
            className={`relative border p-2 my-1 rounded-md w-46 ${isActive
                ? `${theme === "dark" ? "bg-[#020817]" : "bg-gray-300"} font-bold border-primary text-primary`
                : `${theme === "dark"
                    ? "bg-gray-300 text-[#020817] hover:bg-gray-800 hover:text-gray-300 border-gray-700"
                    : "bg-primary text-primary-foreground hover:bg-primary/90 border-gray-400"
                }`
                }`}
        >
            <p className="truncate">{data.title}</p>
        </Link>
    );
}

export default SidebarOptions;
