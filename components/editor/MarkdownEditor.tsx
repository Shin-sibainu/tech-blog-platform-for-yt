'use client'

import dynamic from 'next/dynamic'
import { useState, useCallback } from 'react'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { ssr: false }
)

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  height?: number
}

export default function MarkdownEditor({ 
  value, 
  onChange, 
  placeholder = '記事の内容を入力してください...',
  height = 500 
}: MarkdownEditorProps) {
  const [isPreview, setIsPreview] = useState<'edit' | 'preview'>('edit')

  const handleChange = useCallback((val?: string) => {
    onChange(val || '')
  }, [onChange])


  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              setIsPreview('edit')
            }}
            className={`px-3 py-1 text-sm rounded ${
              isPreview === 'edit' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            編集
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              setIsPreview('preview')
            }}
            className={`px-3 py-1 text-sm rounded ${
              isPreview === 'preview' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            プレビュー
          </button>
        </div>
      </div>
      
      <div data-color-mode="light">
        <MDEditor
          value={value}
          onChange={handleChange}
          preview={isPreview}
          height={height}
          textareaProps={{
            placeholder,
          }}
          previewOptions={{
            rehypePlugins: [],
          }}
        />
      </div>

      <div className="mt-2 text-sm text-gray-500">
        <p>Markdownがサポートされています。ショートカット: Ctrl+B (太字), Ctrl+I (斜体), Ctrl+K (リンク)</p>
      </div>
    </div>
  )
}