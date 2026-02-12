"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, ListOrdered, Wand2 } from "lucide-react";

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

    const generateAIContent = () => {
        // Simulation of AI generation
        const templates = [
            `
      <h3>Job Summary</h3>
      <p>We are looking for a talented individual to join our growing team...</p>
      <h3>Responsibilities</h3>
      <ul>
        <li>Collaborate with cross-functional teams</li>
        <li>Write clean, maintainable code</li>
        <li>Participate in code reviews</li>
      </ul>
      <h3>Requirements</h3>
      <ul>
        <li>3+ years of experience</li>
        <li>Strong problem-solving skills</li>
      </ul>
      `,
            `
      <h3>About the Role</h3>
      <p>As a key member of our team, you will drive innovation...</p>
      <h3>What You'll Do</h3>
      <ul>
        <li>Lead project initiatives</li>
        <li>Mentor junior developers</li>
      </ul>
      `,
        ];
        const randomTemplate = templates[Math.floor(Math.random() * templates.length)]!;
        editor.commands.setContent(randomTemplate);
        onChange(randomTemplate);
    };

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
                <div className="flex-1" />
                <Button
                    variant="outline"
                    size="sm"
                    onClick={generateAIContent}
                    className="text-violet-600 border-violet-200 hover:bg-violet-50 hover:text-violet-700 gap-2"
                    type="button"
                >
                    <Wand2 className="h-3 w-3" />
                    AI Generate
                </Button>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}
