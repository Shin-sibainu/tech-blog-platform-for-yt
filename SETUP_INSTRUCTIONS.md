# セットアップ手順

## 1. データベースの設定（重要）

現在、データベースのテーブルが作成されていないため、以下の手順でSupabaseにSQLスキーマを適用してください。

### Supabaseでのスキーマ適用手順：

1. [Supabase Dashboard](https://supabase.com/dashboard) にアクセス
2. プロジェクト `vshmilrimgysxcfrpngn` を選択
3. 左メニューから「SQL Editor」をクリック
4. 「New query」をクリック
5. `docs/database-schema.sql` の内容をコピー＆ペースト
6. 「Run」ボタンをクリックしてスキーマを実行

### 実行されるテーブル：
- `profiles` テーブル（ユーザープロフィール）
- `posts` テーブル（記事）
- RLSポリシー設定
- トリガー関数の設定

## 2. 環境変数の確認

`.env.local` ファイルが正しく設定されていることを確認：

```
NEXT_PUBLIC_SUPABASE_URL=https://vshmilrimgysxcfrpngn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=（設定済み）
```

## 3. 開発サーバーの起動

```bash
npm run dev
```

## 4. 機能テスト

データベースが正しく設定されたら、以下の機能をテストできます：

### 認証機能
- ユーザー登録: `/auth/signup`
- ログイン: `/auth/login`
- Google認証（設定済み）

### 記事機能
- ホームページ: `/`
- 記事一覧: `/posts`
- 記事詳細: `/posts/[id]`

## 5. トラブルシューティング

### エラー: "Error fetching posts"
→ データベーススキーマが適用されていない可能性があります。上記手順1を実行してください。

### エラー: "relation 'profiles' does not exist"
→ `profiles`テーブルが作成されていません。SQLスキーマを実行してください。

### 認証エラー
→ Supabaseダッシュボードで認証プロバイダーが有効になっているか確認してください。

## 6. 次に実装が必要な機能

- 記事投稿・編集機能（TICKET-008, 009）
- マイページ機能（TICKET-013, 014）

## サポート

問題が発生した場合は、以下を確認してください：
1. Supabaseプロジェクトが正常に動作している
2. SQLスキーマが正しく適用されている
3. 環境変数が正しく設定されている
4. ネットワーク接続が正常である