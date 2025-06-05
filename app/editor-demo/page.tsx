'use client'

import { useState } from 'react'
import MarkdownEditorWithAutosave from '../components/editor/MarkdownEditorWithAutosave'

export default function EditorDemoPage() {
  const [content, setContent] = useState(`# Markdownエディタのデモ

このページでは、Markdownエディタの機能を試すことができます。

## 主な機能

- **リアルタイムプレビュー**: 右上のボタンでプレビューモードに切り替え
- **自動保存**: 30秒ごとに自動的に保存（このデモでは実際には保存されません）
- **ショートカット**: Ctrl+S（Mac: Cmd+S）で手動保存

## Markdownの書き方

### 見出し

\`\`\`markdown
# 大見出し
## 中見出し
### 小見出し
\`\`\`

### リスト

**番号なしリスト:**
- アイテム1
- アイテム2
- アイテム3

**番号付きリスト:**
1. 最初の項目
2. 次の項目
3. 最後の項目

### コードブロック

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### 引用

> これは引用文です。
> 複数行にわたることもできます。

### リンクと画像

[リンクのテキスト](https://example.com)

![画像の説明](https://via.placeholder.com/150)

### 表

| ヘッダー1 | ヘッダー2 | ヘッダー3 |
|----------|----------|----------|
| セル1    | セル2    | セル3    |
| セル4    | セル5    | セル6    |

---

**太字のテキスト** と *イタリック体のテキスト*

インラインコード: \`const x = 10;\`
`)

  const handleAutosave = async (content: string) => {
    // デモ用の擬似的な自動保存処理
    console.log('Autosaving content:', content.substring(0, 50) + '...')
    // 実際のアプリケーションでは、ここでAPIを呼び出して保存します
    return new Promise<void>((resolve) => {
      setTimeout(resolve, 1000) // 1秒の遅延をシミュレート
    })
  }

  const handleSave = () => {
    console.log('Manual save triggered')
    alert('記事が保存されました！（デモ版のため実際には保存されていません）')
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Markdownエディタ デモ</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <MarkdownEditorWithAutosave
          value={content}
          onChange={setContent}
          onAutosave={handleAutosave}
          onSave={handleSave}
          autosaveInterval={30000}
          height={600}
        />
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded-md">
        <h2 className="text-lg font-semibold mb-2">使い方のヒント</h2>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>編集モードとプレビューモードを切り替えて、リアルタイムで結果を確認できます</li>
          <li>30秒ごとに自動保存されます（画面上部に保存状態が表示されます）</li>
          <li>Ctrl+S（Mac: Cmd+S）で手動保存もできます</li>
          <li>Markdownの基本的な記法がすべて使用できます</li>
        </ul>
      </div>
    </div>
  )
}