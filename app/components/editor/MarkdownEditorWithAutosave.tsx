'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import MDEditor from '@uiw/react-md-editor'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import './markdown-editor.css'

interface MarkdownEditorWithAutosaveProps {
  value: string
  onChange: (value: string) => void
  onAutosave?: (content: string) => Promise<void>
  autosaveInterval?: number // in milliseconds
  placeholder?: string
  height?: number
  onSave?: (content: string) => void
}

export default function MarkdownEditorWithAutosave({
  value,
  onChange,
  onAutosave,
  autosaveInterval = 30000, // Default: 30 seconds
  placeholder = '記事の内容を入力してください...',
  height = 500,
  onSave
}: MarkdownEditorWithAutosaveProps) {
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const autosaveTimerRef = useRef<NodeJS.Timeout | null>(null)
  const lastSavedValueRef = useRef(value)

  const handleChange = useCallback((val?: string) => {
    const newValue = val || ''
    onChange(newValue)
    
    // Reset autosave timer
    if (onAutosave && autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current)
    }
    
    // Set new autosave timer if content has changed
    if (onAutosave && newValue !== lastSavedValueRef.current) {
      autosaveTimerRef.current = setTimeout(async () => {
        setIsSaving(true)
        try {
          await onAutosave(newValue)
          lastSavedValueRef.current = newValue
          setLastSaved(new Date())
        } catch (error) {
          console.error('Autosave failed:', error)
        } finally {
          setIsSaving(false)
        }
      }, autosaveInterval)
    }
  }, [onChange, onAutosave, autosaveInterval])

  const handleManualSave = useCallback(async () => {
    if (onSave) {
      onSave(value)
    } else if (onAutosave) {
      setIsSaving(true)
      try {
        await onAutosave(value)
        lastSavedValueRef.current = value
        setLastSaved(new Date())
      } catch (error) {
        console.error('Save failed:', error)
      } finally {
        setIsSaving(false)
      }
    }
  }, [value, onSave, onAutosave])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault()
      handleManualSave()
    }
  }, [handleManualSave])

  // Cleanup autosave timer on unmount
  useEffect(() => {
    return () => {
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current)
      }
    }
  }, [])

  const formatLastSaved = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    
    if (minutes < 1) return 'たった今'
    if (minutes === 1) return '1分前'
    if (minutes < 60) return `${minutes}分前`
    
    const hours = Math.floor(minutes / 60)
    if (hours === 1) return '1時間前'
    if (hours < 24) return `${hours}時間前`
    
    return date.toLocaleString('ja-JP')
  }

  return (
    <div className="markdown-editor-container" onKeyDown={handleKeyDown}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold">記事エディタ</h3>
          {isSaving && (
            <span className="text-sm text-gray-500">保存中...</span>
          )}
          {!isSaving && lastSaved && (
            <span className="text-sm text-gray-500">
              最終保存: {formatLastSaved(lastSaved)}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            {isPreviewMode ? '編集モード' : 'プレビューモード'}
          </button>
          {(onSave || onAutosave) && (
            <button
              type="button"
              onClick={handleManualSave}
              disabled={isSaving}
              className="px-4 py-2 text-sm bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300 rounded-md transition-colors"
            >
              {isSaving ? '保存中...' : '保存 (Ctrl+S)'}
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
      
      <div className="mt-2 flex justify-between text-sm text-gray-500">
        <span>文字数: {value.length}</span>
        {onAutosave && (
          <span>自動保存: {autosaveInterval / 1000}秒ごと</span>
        )}
      </div>
    </div>
  )
}