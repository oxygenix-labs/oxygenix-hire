"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, ListOrdered } from "lucide-react";

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function Editor({ value, onChange, placeholder }: EditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: placeholder || "Write something...",
                emptyEditorClass:
                    "is-editor-empty before:content-[attr(data-placeholder)] before:text-muted-foreground before:float-left before:pointer-events-none",
            }),
        ],
        immediatelyRender: false,
        content: value,
        editorProps: {
            attributes: {
                class: "min-h-[300px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 prose prose-sm max-w-none dark:prose-invert",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 border rounded-md p-1 bg-muted/50">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive("bold") ? "bg-muted" : ""}
                    type="button"
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive("italic") ? "bg-muted" : ""}
                    type="button"
                >
                    <Italic className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive("bulletList") ? "bg-muted" : ""}
                    type="button"
                >
                    <List className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive("orderedList") ? "bg-muted" : ""}
                    type="button"
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}
