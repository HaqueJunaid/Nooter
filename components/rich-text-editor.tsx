"use client"

import './styles.scss'

import { TextStyleKit } from "@tiptap/extension-text-style"
import type { Editor, JSONContent } from "@tiptap/react"
import { EditorContent, useEditor, useEditorState } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import React from "react"
import { Toggle } from "@/components/ui/toggle"
import {
  BoldIcon,
  Code,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  LinkIcon,
  List,
  ListOrdered,
  ImageIcon,
  QuoteIcon,
  Redo2Icon,
  StrikethroughIcon,
  UnderlineIcon,
  Undo2Icon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Subscript,
  Superscript,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { BulletList, OrderedList } from "@tiptap/extension-list"
import Blockquote from "@tiptap/extension-blockquote"
import Underline from "@tiptap/extension-underline"

const extensions = [TextStyleKit, StarterKit, BulletList, OrderedList, Blockquote, Underline]

function MenuBar({
  editor,
}: { editor: Editor}) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isUnderline: ctx.editor.isActive("underline") ?? false,
        canUnderline: ctx.editor.can().chain().toggleUnderline().run() ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      }
    },
  })

  return (
    <TooltipProvider>
      <div className="editor-menubar">
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editorState.canUndo}
                className="editor-button"
              >
                <Undo2Icon className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Undo</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editorState.canRedo}
                className="editor-button"
              >
                <Redo2Icon className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Redo</p>
            </TooltipContent>
          </Tooltip>

          <div className="separator" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                pressed={editorState.isHeading1}
                className="editor-button"
              >
                <Heading1Icon className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Heading 1</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                pressed={editorState.isHeading2}
                className="editor-button"
              >
                <Heading2Icon className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Heading 2</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                pressed={editorState.isHeading3}
                className="editor-button"
              >
                <Heading3Icon className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Heading 3</p>
            </TooltipContent>
          </Tooltip>

          <div className="separator" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                pressed={editorState.isBulletList}
                className="editor-button"
              >
                <List className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bullet List</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                pressed={editorState.isOrderedList}
                className="editor-button"
              >
                <ListOrdered className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ordered List</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                pressed={editorState.isBlockquote}
                className="editor-button"
              >
                <QuoteIcon className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Quote</p>
            </TooltipContent>
          </Tooltip>

          <div className="separator" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editorState.canBold}
                pressed={editorState.isBold}
                className="editor-button"
              >
                <BoldIcon className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bold</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editorState.canItalic}
                pressed={editorState.isItalic}
                className="editor-button"
              >
                <ItalicIcon className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Italic</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editorState.canStrike}
                pressed={editorState.isStrike}
                className="editor-button"
              >
                <StrikethroughIcon className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Strikethrough</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editorState.canCode}
                pressed={editorState.isCode}
                className="editor-button"
              >
                <Code className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Code</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                disabled={!editorState.canUnderline}
                pressed={editorState.isUnderline}
                className="editor-button"
              >
                <UnderlineIcon className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Underline</p>
            </TooltipContent>
          </Tooltip>

          <div className="separator" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle size="sm" className="editor-button">
                <LinkIcon className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Link</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle size="sm" className="editor-button">
                <ImageIcon className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Image</p>
            </TooltipContent>
          </Tooltip>

          <div className="separator" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle size="sm" className="editor-button">
                <Superscript className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Superscript</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle size="sm" className="editor-button">
                <Subscript className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Subscript</p>
            </TooltipContent>
          </Tooltip>

          <div className="separator" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle size="sm" className="editor-button">
                <AlignLeft className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Align Left</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle size="sm" className="editor-button">
                <AlignCenter className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Align Center</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle size="sm" className="editor-button">
                <AlignRight className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Align Right</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle size="sm" className="editor-button">
                <AlignJustify className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Align Justify</p>
            </TooltipContent>
          </Tooltip>

          <div className="separator" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle size="sm" className="editor-button">
                <ImageIcon className="size-4" />
                <span className="text-sm">Add</span>
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}

interface RichTextEditorProps {
  content?: JSONContent
}

export default function RichTextEditor({ content }: RichTextEditorProps) {
  const [theme, setTheme] = React.useState<"light" | "dark">("dark")

  const editor = useEditor({
    immediatelyRender: false,
    extensions,
    content: content || {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "Getting started" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Welcome to the " },
            { type: "text", text: "Simple Editor", marks: [{ type: "code" }] },
            { type: "text", text: " template! This template integrates " },
            { type: "text", text: "open source", marks: [{ type: "bold" }] },
            { type: "text", text: " UI components and Tiptap extensions licensed under " },
            { type: "text", text: "MIT", marks: [{ type: "bold" }] },
            { type: "text", text: "." },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Integrate it by following the " },
            { type: "text", text: "Tiptap UI Components docs" },
            { type: "text", text: " or using our " },
            { type: "text", text: "CLI" },
            { type: "text", text: " tool." },
          ],
        },
        {
          type: "codeBlock",
          content: [{ type: "text", text: "npx @tiptap/cli init" }],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Features" }],
        },
        {
          type: "blockquote",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "A fully responsive rich text editor with built-in support for common formatting and layout tools. Type markdown ",
                  marks: [{ type: "italic" }],
                },
                { type: "text", text: "**", marks: [{ type: "italic" }] },
                { type: "text", text: " or use keyboard shortcuts ", marks: [{ type: "italic" }] },
                { type: "text", text: "⌘+B", marks: [{ type: "italic" }] },
                { type: "text", text: " for ", marks: [{ type: "italic" }] },
                { type: "text", text: "most", marks: [{ type: "strike" }] },
                { type: "text", text: " all common markdown marks. ✅", marks: [{ type: "italic" }] },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Add images, customize alignment, and apply " },
            { type: "text", text: "advanced formatting" },
            { type: "text", text: " to make your writing more engaging and professional." },
          ],
        },
      ],
    },
  })

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  return (
      <div className="editor-container">
        {editor && <MenuBar editor={editor}/>}
        <div className="editor-content">
          <EditorContent editor={editor} className='overflow-y-scroll max-h-[600px]' />
        </div>
      </div>
  )
}