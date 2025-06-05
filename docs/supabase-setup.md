# Supabaseセットアップ手順

## 1. Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com) にアクセスしてアカウントを作成
2. 新しいプロジェクトを作成
3. プロジェクトの設定から以下の情報を取得：
   - Project URL
   - anon/public key

## 2. 環境変数の設定

`.env.local` ファイルに以下の値を設定してください：

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## 3. データベーススキーマの適用

Supabaseダッシュボードの SQL Editor で `docs/database-schema.sql` の内容を実行してください。

### 実行される内容：
- `profiles` テーブルの作成（ユーザープロフィール）
- `posts` テーブルの作成（記事）
- RLS（Row Level Security）ポリシーの設定
- 自動更新トリガーの設定
- 新規ユーザー作成時の自動プロフィール作成

## 4. 認証設定

Supabaseダッシュボードで以下を設定：

1. Authentication > Providers
   - Email/Password認証を有効化
   - Google OAuth を設定（必要に応じて）

2. Authentication > URL Configuration
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/**`

## 5. 確認事項

- `.env.local` ファイルが `.gitignore` に含まれていることを確認
- データベーススキーマが正しく適用されたことを確認
- 認証プロバイダーが有効になっていることを確認

## トラブルシューティング

### エラー: "Invalid API key"
→ `.env.local` の環境変数が正しく設定されているか確認

### エラー: "relation 'profiles' does not exist"
→ データベーススキーマが適用されているか確認

### 認証エラー
→ Supabaseダッシュボードで認証プロバイダーが有効になっているか確認