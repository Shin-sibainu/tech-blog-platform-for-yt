'use client'

import React, { useState, useCallback } from 'react'
import MDEditor from '@uiw/react-md-editor'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  height?: number
  onSave?: (content: string) => void
}

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = '記事の内容を入力してください...',
  height = 500,
  onSave
}: MarkdownEditorProps) {
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  const handleChange = useCallback((val?: string) => {
    onChange(val || '')
  }, [onChange])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault()
      if (onSave) {
        onSave(value)
      }
    }
  }, [value, onSave])

  return (
    <div className="markdown-editor-container" onKeyDown={handleKeyDown}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">記事エディタ</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            {isPreviewMode ? '編集モード' : 'プレビューモード'}
          </button>
          {onSave && (
            <button
              type="button"
              onClick={() => onSave(value)}
              className="px-4 py-2 text-sm bg-blue-500 text-white hover:bg-blue-600 rounded-md transition-colors"
            >
              保存 (Ctrl+S)
            </button>
          )}
        </div>
      </div>
      
      <MDEditor
        value={value}
        onChange={handleChange}
        preview={isPreviewMode ? 'preview' : 'edit'}
        height={height}
        data-color-mode="light"
        textareaProps={{
          placeholder: placeholder,
        }}
      />
      
      <div className="mt-2 text-sm text-gray-500">
        <span>文字数: {value.length}</span>
      </div>
    </div>
  )
}