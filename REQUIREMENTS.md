# 技術記事投稿プラットフォーム 要件定義書

## プロジェクト概要

YouTube 撮影用のシンプルな技術記事投稿プラットフォームを構築する。

## 技術スタック

- **フロントエンド**: Next.js 14 (App Router)
- **スタイリング**: Tailwind CSS
- **バックエンド**: Supabase
- **認証**: Supabase Auth (メール/パスワード + Google 認証)
- **データベース**: PostgreSQL (Supabase)
- **言語**: TypeScript

## 機能要件

### 1. 認証機能

- メールアドレス/パスワードでのユーザー登録・ログイン
- Google 認証でのログイン
- ログアウト機能

### 2. 記事投稿機能

- Markdown 形式での記事作成
- 記事の投稿（公開）
- 記事の編集
- 記事の削除
- 下書き保存機能

### 3. 記事閲覧機能

- 記事一覧表示
- 記事詳細表示
- Markdown のレンダリング

### 4. ユーザー機能

- マイページ（自分の投稿記事一覧）
- プロフィール表示（ユーザー名、アイコン）

## 画面構成

1. **ホーム画面** - 記事一覧
2. **記事詳細画面** - 記事の内容表示
3. **記事投稿/編集画面** - Markdown エディタ
4. **ログイン/サインアップ画面**
5. **マイページ** - 自分の記事管理

## データベース設計

### テーブル構成

#### 1. profiles（ユーザープロフィール）

- id (UUID) - Supabase Auth の user_id と連携
- username (TEXT) - ユーザー名
- avatar_url (TEXT) - アバター画像 URL
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

#### 2. posts（記事）

- id (UUID) - プライマリキー
- user_id (UUID) - 投稿者 ID（profiles テーブルを参照）
- title (TEXT) - 記事タイトル
- content (TEXT) - 記事本文（Markdown）
- is_published (BOOLEAN) - 公開/下書きフラグ
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- published_at (TIMESTAMP) - 公開日時

## 非機能要件

- レスポンシブデザイン対応
- シンプルで使いやすい UI
- 基本的な SEO 対応（メタタグ設定）

## 開発フェーズ

1. **Phase 1**: 環境構築と Supabase セットアップ
2. **Phase 2**: 認証機能の実装
3. **Phase 3**: 記事投稿・編集機能の実装
4. **Phase 4**: 記事一覧・詳細表示の実装
5. **Phase 5**: マイページ機能の実装
6. **Phase 6**: UI/UX の改善とテスト

## 今回のスコープ外

- コメント機能
- いいね機能
- タグ・カテゴリー機能
- 検索機能
- 決済機能
- 画像アップロード機能（記事内の画像は外部 URL のみ）
