// src/components/ui/RichEditor.jsx
// Editor WYSIWYG lleuger basat en contentEditable + execCommand
// Sense dependències externes — funciona directament

import { useRef, useEffect, useCallback } from 'react'
import {
  Bold, Italic, Heading2, Heading3,
  List, ListOrdered, Quote, Link, Minus, RotateCcw, RotateCw
} from 'lucide-react'

export default function RichEditor({ value, onChange, placeholder = 'Escriu aquí...' }) {
  const editorRef = useRef(null)

  // Inicialitza contingut
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || ''
    }
  }, []) // només al muntar

  const exec = useCallback((command, val = null) => {
    editorRef.current?.focus()
    document.execCommand(command, false, val)
    onChange(editorRef.current?.innerHTML || '')
  }, [onChange])

  const handleInput = useCallback(() => {
    onChange(editorRef.current?.innerHTML || '')
  }, [onChange])

  const insertLink = useCallback(() => {
    const url = window.prompt('URL de l\'enllaç:')
    if (url) exec('createLink', url)
  }, [exec])

  const TOOLS = [
    { icon: Bold,         title: 'Negreta',      action: () => exec('bold'),           group: 1 },
    { icon: Italic,       title: 'Cursiva',      action: () => exec('italic'),         group: 1 },
    { icon: Heading2,     title: 'Títol H2',     action: () => exec('formatBlock','h2'),group: 2 },
    { icon: Heading3,     title: 'Subtítol H3',  action: () => exec('formatBlock','h3'),group: 2 },
    { icon: List,         title: 'Llista',       action: () => exec('insertUnorderedList'), group: 3 },
    { icon: ListOrdered,  title: 'Llista num.',  action: () => exec('insertOrderedList'),   group: 3 },
    { icon: Quote,        title: 'Cita',         action: () => exec('formatBlock','blockquote'), group: 3 },
    { icon: Link,         title: 'Enllaç',       action: insertLink,                   group: 4 },
    { icon: Minus,        title: 'Línia',        action: () => exec('insertHorizontalRule'), group: 4 },
    { icon: RotateCcw,    title: 'Desfer',       action: () => exec('undo'),           group: 5 },
    { icon: RotateCw,     title: 'Refer',        action: () => exec('redo'),           group: 5 },
  ]

  return (
    <div className="border border-border rounded-lg overflow-hidden focus-within:border-mid transition-colors">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-border bg-paper flex-wrap">
        {TOOLS.map((tool, i) => {
          const Icon = tool.icon
          const showDivider = i > 0 && TOOLS[i-1].group !== tool.group
          return (
            <div key={tool.title} className="flex items-center">
              {showDivider && <div className="w-px h-4 bg-border mx-1"/>}
              <button
                type="button"
                title={tool.title}
                onMouseDown={e => { e.preventDefault(); tool.action() }}
                className="p-1.5 rounded hover:bg-white hover:shadow-sm transition-all text-mid hover:text-ink">
                <Icon size={14} strokeWidth={1.5}/>
              </button>
            </div>
          )
        })}
        <div className="ml-auto font-mono text-[9px] text-mid/50">HTML</div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        data-placeholder={placeholder}
        className="rich-editor min-h-[200px] p-4 text-sm text-ink focus:outline-none"
      />
    </div>
  )
}
