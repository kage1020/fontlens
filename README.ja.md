# Font Lens

フォントを比較・プレビューするためのシンプルなウェブアプリケーション

## 概要

Font Lensは、Google Fontsライブラリを活用したフォントプレビュー・比較アプリケーションです。デザイナーや開発者が最適なフォントを選ぶ際に、複数のフォントを同時に表示して比較することができます。

**今すぐ試す:** [fontlens.kage1020.com](https://fontlens.kage1020.com) - 無料でご利用いただけます！

## 主な機能

- 人気のあるGoogle Fontsの検索と表示
- 複数のフォントを同時に表示して比較
- フォントの並び替えとカスタマイズ
- フォントのウェイトやスタイルの調整
- レスポンシブデザイン対応

## 技術スタック

- [Next.js](https://nextjs.org/) - Reactフレームワーク
- [TypeScript](https://www.typescriptlang.org/) - 型安全なJavaScript
- [Google Fonts API](https://developers.google.com/fonts) - フォントデータ
- [shadcn/ui](https://ui.shadcn.com/) - UIコンポーネント

## 開発環境のセットアップ

### 前提条件

- Node.js (v18以上)
- pnpm

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/kage1020/font-lens.git
cd font-lens

# 依存関係のインストール
pnpm install

# 環境変数の設定
# .env.localファイルをプロジェクトルートに作成し、Google Fonts APIキーを設定
# GOOGLE_API_KEY=あなたのAPIキー

# 開発サーバーの起動
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認できます。

## 使い方

1. トップページで「Add Another Font」ボタンをクリックしてフォントを追加
2. 検索ボックスでフォントを検索
3. 選択したフォントが一覧に表示され、比較可能に
4. 矢印ボタンでフォントの順序を変更可能
5. 各フォントカードで、テキスト、サイズ、ウェイトなどをカスタマイズ

## TODO

- ローカルフォントを使えるようにする
- monospaceフォントやリガチャ対応フォントを揃える

## ライセンス

[MIT](LICENSE)
