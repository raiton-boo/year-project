# SEO方針（詳細）

`requirements.md` 4.2章の内容を詳細化する。

## 構造化データ（JSON-LD）

以下3種類のスキーマタイプを組み合わせて使用する。

- **WebSite**: サイト全体の基本情報
- **WebApplication**: カウントダウンツールとしての「アプリ」的性質を表現し、ツール系サイトとしての検索露出を狙う
- **Event**: 「年の終わり」を特定日時のイベントとして表現する

具体的なプロパティ設計（`name`, `description`, `startDate`/`endDate`等）は実装時に決定する。

## 動的title/description

- `requirements.md`で既に決定済み: 残り日数を反映した内容に日次で更新する
- タブタイトルの動的更新（`feature/tab-title-favicon.md`）とは別軸（こちらはSSR時点でのメタタグ、あちらはクライアントサイドでのタブ表示）

## OGP（Open Graph Protocol）

- `og:image`: `feature/og-image.md`で定義した動的生成画像
- **Twitter Card**: `summary_large_image`を採用し、OG画像を大きく表示することでイラストの訴求力を活かす

## sitemap.xml / robots.txt

- `requirements.md`で決定済み: ページ数は少ないが基本整備として用意する

## 未決事項

- JSON-LD各スキーマの具体的なプロパティ設計
- `/archive`配下のページが増えた際のsitemap自動更新の仕組み
