"use client"

import './styles.scss'

import { TextStyleKit } from "@tiptap/extension-text-style"
import type { Editor, JSONContent } from "@tiptap/react"
import { EditorContent, useEditor, useEditorState } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
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
  Subscript as SubsctiptIcon,
  Superscript as SuperscriptIcon,
  SubscriptIcon,
  Highlighter,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { BulletList, OrderedList } from "@tiptap/extension-list"
import Blockquote from "@tiptap/extension-blockquote"
import Underline from "@tiptap/extension-underline"
import TextAlign from '@tiptap/extension-text-align'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import { updateNote } from '@/server/notes'
import Highlight from '@tiptap/extension-highlight'
import { useEffect, useRef } from 'react'

const extensions = [TextStyleKit, StarterKit, BulletList, OrderedList, Blockquote, Underline, Subscript, Superscript, TextAlign.configure({
  types: ['heading', 'paragraph'],
  }),
  Highlight.configure({
    multicolor: true
  })
]

function MenuBar({
  editor,
}: { editor: Editor }) {
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
        isHighlight: ctx.editor.isActive("highlight") ?? false,
        isSuperscript: ctx.editor.isActive("superscript") ?? false,
        isSubscript: ctx.editor.isActive("subscript") ?? false,
        isTextLeft: ctx.editor.isActive("textAlign", { align: "left" }) ?? false,
        isTextCenter: ctx.editor.isActive("textAlign", { align: "center" }) ?? false,
        isTextRight: ctx.editor.isActive("textAlign", { align: "right" }) ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      }
    },
  })

  return (
    <TooltipProvider>
      <div className="editor-menubar">
        <div className="flex flex-wrap w-full items-center gap-1">
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
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                pressed={editorState.isHighlight}
                className="editor-button"
              >
                <Highlighter className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Highlight</p>
            </TooltipContent>
          </Tooltip>

          <div className="separator" />

          {/* Yet to add the feature */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle size="sm"
                onClick={() => {
                  // TODO: Implement image upload feature
                }}
                className="editor-button">
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
              <Toggle size="sm"
                onClick={() => editor.chain().focus().toggleSuperscript().run()}
                pressed={editorState.isSuperscript}
                className="editor-button">
                <SuperscriptIcon className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Superscript</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle size="sm"
                onClick={() => editor.chain().focus().toggleSubscript().run()}
                pressed={editorState.isSubscript}
                className="editor-button">
                <SubscriptIcon className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Subscript</p>
            </TooltipContent>
          </Tooltip>

          <div className="separator" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle size="sm"
                onClick={() => editor.chain().focus().toggleTextAlign('left').run()}
                pressed={editorState.isTextLeft}
                className="editor-button">
                <AlignLeft className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Align Left</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle size="sm"
                onClick={() => editor.chain().focus().toggleTextAlign('center').run()}
                pressed={editorState.isTextCenter}
                className="editor-button">
                <AlignCenter className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Align Center</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle size="sm"
                onClick={() => editor.chain().focus().toggleTextAlign('right').run()}
                pressed={editorState.isTextRight}
                className="editor-button">
                <AlignRight className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Align Right</p>
            </TooltipContent>
          </Tooltip>

          <div className="separator" />
        </div>
      </div>
    </TooltipProvider>
  )
}

interface RichTextEditorProps {
  content?: JSONContent,
  noteId: string
}

export default function RichTextEditor({ content, noteId }: RichTextEditorProps) {
  const debounceTimeRef = useRef<NodeJS.Timeout | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions,
    onUpdate: ({editor}) => {
      if (debounceTimeRef.current) clearTimeout(debounceTimeRef.current);

      debounceTimeRef.current = setTimeout(() => {
        updateNote(noteId, {content: editor.getJSON()});
      }, 500)
    },
    content
  })

  useEffect(() => {
    return () => {
      if (debounceTimeRef.current) clearTimeout(debounceTimeRef.current)
    }
  }, [])

  return (
    <div>
      {editor && <MenuBar editor={editor} />}
      <div className="editor-content pl-5! pr-5! pt-0! pb-0! border-l border-r border-b bg-transparent!">
        <EditorContent editor={editor} className='overflow-y-auto max-h-[60vh]! lg:max-h-[2500px]!' />
      </div>
    </div>
  )
}