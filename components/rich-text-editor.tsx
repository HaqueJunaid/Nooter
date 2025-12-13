'use client'
import './styles.scss'

import { TextStyleKit } from '@tiptap/extension-text-style'
import type { Editor, JSONContent } from '@tiptap/react'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { Button } from './ui/button'
import { updateNote } from '@/server/notes'
import { Toggle } from "@/components/ui/toggle"
import { BoldIcon, Code, Heading1Icon, Heading2Icon, Heading3Icon, Heading4Icon, Heading5Icon, Heading6Icon, ItalicIcon, ParkingSquare, StrikethroughIcon, Text } from 'lucide-react'

const extensions = [TextStyleKit, StarterKit]

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
    <div className="control-group">
      <div className="button-group">
        <Toggle
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={editorState.isBold ? 'is-active' : ''}
        >
          <BoldIcon />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={editorState.isItalic ? 'is-active' : ''}
        >
          <ItalicIcon />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={editorState.isStrike ? 'is-active' : ''}
        >
          <StrikethroughIcon />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          className={editorState.isCode ? 'is-active' : ''}
        >
          <Code />
        </Toggle>
        <Toggle onClick={() => editor.chain().focus().unsetAllMarks().run()}></Toggle>
        <Toggle onClick={() => editor.chain().focus().clearNodes().run()}>Clear nodes</Toggle>
        <Toggle
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editorState.isParagraph ? 'is-active' : ''}
        >
          Paragraph
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editorState.isHeading1 ? 'is-active' : ''}
        >
          <Heading1Icon />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editorState.isHeading2 ? 'is-active' : ''}
        >
          <Heading2Icon />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editorState.isHeading3 ? 'is-active' : ''}
        >
          <Heading3Icon />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editorState.isHeading4 ? 'is-active' : ''}
        >
          <Heading4Icon />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editorState.isHeading5 ? 'is-active' : ''}
        >
          <Heading5Icon />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editorState.isHeading6 ? 'is-active' : ''}
        >
          <Heading6Icon />
        </Toggle>
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editorState.isBulletList ? 'is-active' : ''}
        >
          <ParkingSquare />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editorState.isOrderedList ? 'is-active' : ''}
        >
          Ordered list
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editorState.isCodeBlock ? 'is-active' : ''}
        >
          Code block
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editorState.isBlockquote ? 'is-active' : ''}
        >
          Blockquote
        </Button>
        <Button onClick={() => editor.chain().focus().setHorizontalRule().run()}>Horizontal rule</Button>
        <Button onClick={() => editor.chain().focus().setHardBreak().run()}>Hard break</Button>
        <Button onClick={() => editor.chain().focus().undo().run()} disabled={!editorState.canUndo}>
          Undo
        </Button>
        <Button onClick={() => editor.chain().focus().redo().run()} disabled={!editorState.canRedo}>
          Redo
        </Button>
      </div>
    </div>
  )
}

interface RichTextEditorProps {
    content: JSONContent,
    noteId: string
}

export default ({content, noteId} : RichTextEditorProps) => {
    const [debounceTimer, setDebounceTimer] = React.useState<NodeJS.Timeout | null>(null)

    const editor = useEditor({
        immediatelyRender: false,
        extensions,
        onUpdate: ({ editor }) => {
            if (debounceTimer) clearTimeout(debounceTimer)
            
            const timer = setTimeout(() => {
                updateNote(noteId, {content: editor.getJSON()})
            }, 500)
            
            setDebounceTimer(timer)
        },
        content: content,
    })

    React.useEffect(() => {
        return () => {
            if (debounceTimer) clearTimeout(debounceTimer)
        }
    }, [debounceTimer])

    return (
        <div>
            {editor && <MenuBar editor={editor} />}
            <EditorContent editor={editor} />
        </div>
    )
}