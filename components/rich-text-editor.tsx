'use client'
import './styles.scss'

import { TextStyleKit } from '@tiptap/extension-text-style'
import type { Editor, JSONContent } from '@tiptap/react'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { updateNote } from '@/server/notes'
import { Toggle } from "@/components/ui/toggle"
import { BoldIcon, Code, CodeXmlIcon, Heading1Icon, Heading2Icon, Heading3Icon, Heading4Icon, Heading5Icon, Heading6Icon, ItalicIcon, List, ListOrdered, ParkingSquare, QuoteIcon, Redo2Icon, StrikethroughIcon, UnderlineIcon, Undo2Icon } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { BulletList, OrderedList } from '@tiptap/extension-list'
import Blockquote from '@tiptap/extension-blockquote'

const extensions = [TextStyleKit, StarterKit, BulletList, OrderedList, Blockquote]

function MenuBar({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: ctx => {
      return {
        isBold: ctx.editor.isActive('bold') ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive('strike') ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isUnderline: ctx.editor.isActive('underline') ?? false,
        canUnderline: ctx.editor.can().chain().toggleUnderline().run() ?? false,
        isCode: ctx.editor.isActive('code') ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive('paragraph') ?? false,
        isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,
        isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
        isBlockquote: ctx.editor.isActive('blockquote') ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      }
    },
  })

  return (
    <div>
      <div className="flex flex-wrap gap-2 border rounded-md p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editorState.canBold}
              className={editorState.isBold ? 'is-active' : ''}
            >
              <BoldIcon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Bold</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editorState.canItalic}
              className={editorState.isItalic ? 'is-active' : ''}
            >
              <ItalicIcon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Italic</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editorState.canStrike}
              className={editorState.isStrike ? 'is-active' : ''}
            >
              <StrikethroughIcon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Strike</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              disabled={!editorState.canUnderline}
              className={editorState.isUnderline ? 'is-active' : ''}
            >
              <UnderlineIcon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Underline</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              onClick={() => editor.chain().focus().toggleCode().run()}
              disabled={!editorState.canCode}
              className={editorState.isCode ? 'is-active' : ''}
            >
              <Code />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Code</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={editorState.isHeading1 ? 'is-active' : ''}
            >
              <Heading1Icon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Heading 1</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editorState.isHeading2 ? 'is-active' : ''}
            >
              <Heading2Icon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Heading 2</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={editorState.isHeading3 ? 'is-active' : ''}
            >
              <Heading3Icon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Heading 3</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
              className={editorState.isHeading4 ? 'is-active' : ''}
            >
              <Heading4Icon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Heading 4</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editorState.isBulletList ? 'is-active' : ''}
            >
              <List />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Unordered List</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editorState.isOrderedList ? 'is-active' : ''}
            >
              <ListOrdered />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ordered List</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editorState.isCodeBlock ? 'is-active' : ''}
            >
              <CodeXmlIcon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Code Block</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editorState.isBlockquote ? 'is-active' : ''}
            >
              <QuoteIcon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Quote</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle onClick={() => editor.chain().focus().undo().run()} disabled={!editorState.canUndo}>
              <Undo2Icon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Undo</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle onClick={() => editor.chain().focus().redo().run()} disabled={!editorState.canRedo}>
              <Redo2Icon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Redo</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

interface RichTextEditorProps {
  content?: JSONContent,
  noteId: string
}

export default ({ content, noteId }: RichTextEditorProps) => {
  const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null)

  const editor = useEditor({
    immediatelyRender: false,
    extensions,
    onUpdate: ({ editor }) => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)

      debounceTimerRef.current = setTimeout(() => {
        updateNote(noteId, { content: editor.getJSON() })
      }, 1000)
    },
    content,
  })

  React.useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
    }
  }, [])

  return (
    <div>
      {editor && <MenuBar editor={editor} />}
      <div className="rich-text-editor border rounded-md p-4 mt-2">
        <EditorContent editor={editor} className='max-h-[500px] overflow-y-scroll' />
      </div>
    </div>
  )
}