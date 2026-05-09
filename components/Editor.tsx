import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom, useSelf } from "@liveblocks/react/suspense";
import { useEffect, useState } from "react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import stringToColor from "@/lib/stringToColor";
import { useTheme } from "./ThemeProvider";

type EditorProps = {
  doc: Y.Doc;
  provider: any;
  darkMode: boolean;
};

function BlockNote({ doc, provider, darkMode }: EditorProps) {
  const userInfo = useSelf((me) => me.info);
  const { theme } = useTheme();

  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name: userInfo?.name,
        color: stringToColor(userInfo?.email),
      },
    },
  });

  return (
    <div className="relative w-full max-w-10xl mx-auto">
      <BlockNoteView
        editor={editor}
        theme={theme === "dark" ? "dark" : "light"}
        className="min-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide"
      />
    </div>
  );
}

function Editor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();
  const { theme } = useTheme();

  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      <div className={`flex-1 w-full overflow-hidden ${theme === "dark" ? "bg-[#020817]" : "bg-white"}`}>
        <div className="h-full max-w-10xl mx-auto">
          <BlockNote
            doc={doc}
            provider={provider}
            darkMode={theme === "dark"}
          />
        </div>
      </div>
    </div>
  );
}

export default Editor;