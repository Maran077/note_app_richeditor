import React, { useCallback, useState } from "react";
import { FaLink, FaList, FaListOl, FaUnderline } from "react-icons/fa6";
import { FaQuoteRight, FaCode, FaImage } from "react-icons/fa";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Button from "./Button";
import { UseMutateFunction } from "@tanstack/react-query";

type Props = {
  content?: string;
  isLoading: boolean;
  mutate: UseMutateFunction<void | unknown, Error, string, unknown>;
};

enum Level {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
}

const extensions = [
  StarterKit,
  Underline,
  Link.configure({
    openOnClick: true,
    autolink: true,
  }),
];

function NoteEditor({ content, isLoading, mutate }: Props) {
  const [textSizeLevel, setTextSizeLevel] = useState<number>(3);

  const editor = useEditor({
    extensions,
    content,
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) {
      return;
    }
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);
  if (!editor) return null;

  const decraeseTextSize = () => {
      
    console.log(textSizeLevel)
    if (textSizeLevel - 1 < 0) return;
    const size:Level = textSizeLevel - 1;
    console.log(size)
    editor?.chain().focus().toggleHeading({ level: size }).run();
    setTextSizeLevel((prev) => prev - 1);
    
  };
  const incraeseTextSize = () => {
    console.log(textSizeLevel)
    if (textSizeLevel + 1 > 6) return;
    const size:Level = textSizeLevel + 1;
    console.log(size)
    editor?.chain().focus().toggleHeading({ level: size }).run();
    setTextSizeLevel((prev) => prev + 1);
  };

  return (
    <div className="flex h-[100dvh] flex-col items-center justify-center gap-3 bg-color-sixty py-3">
      <main className="relative h-[90%] w-[90%]  rounded-lg bg-white p-4  ">
        <div
          id="tools"
          className="text-md flex flex-wrap items-center justify-around gap-2 font-[500] uppercase text-color-thirty *:cursor-pointer *:select-none sm:text-xl md:text-2xl"
        >
          <span
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`${editor.isActive("bold") ? "is-active text-color-ten" : ""} font-extrabold`}
          >
            b
          </span>
          <span
            style={{ fontStyle: "italic" }}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={
              editor.isActive("italic") ? "is-active text-color-ten" : ""
            }
          >
            i
          </span>
          <span
            onClick={decraeseTextSize}
            className={
              editor?.isActive("heading", { level: textSizeLevel - 1 })
                ? "is-active text-color-ten"
                : ""
            }
          >
            A
          </span>
          <span
            style={{ textTransform: "lowercase" }}
            onClick={incraeseTextSize}
            className={
              editor?.isActive("heading", { level: textSizeLevel + 1 })
                ? "is-active text-color-ten"
                : ""
            }
          >
            a
          </span>
          <span
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`${editor.isActive("strike") ? "is-active text-color-ten" : ""} line-through`}
          >
            s
          </span>
          <FaUnderline
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`${editor.isActive("underline") ? "is-active text-color-ten" : ""} line-through`}
          />
          <FaLink
            onClick={setLink}
            className={
              editor.isActive("link") ? "is-active text-color-ten" : ""
            }
          />
          <FaQuoteRight
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={
              editor.isActive("blockquote") ? "is-active text-color-ten" : ""
            }
          />
          <FaCode
            onClick={() => editor.commands.toggleCodeBlock()}
            className={`${editor.isActive("codeblock") ? "is-active text-color-ten" : ""} line-through`}
          />
          <FaList
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`${editor.isActive("bulletList") ? "is-active text-color-ten" : ""} line-through`}
          />
          <FaListOl
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`${editor.isActive("orderedList") ? "is-active text-color-ten" : ""} line-through`}
          />
        </div>
        <EditorContent editor={editor} />
      </main>
      <div
        className="ms-[5dvw] self-start"
        onClick={() => mutate(editor.getHTML())}
      >
        <Button buttonName={isLoading ? "Loading..." : "Save"} />
      </div>
    </div>
  );
}

export default NoteEditor;
