# 開発ロードマップ

`docs/`配下の各ドキュメント（要件・機能仕様・技術選定・ワイヤーフレーム）を踏まえた、実装のフェーズ分けと全体の流れ。

## フェーズ構成

### Phase 0: プロジェクトセットアップ

基盤がないと何も作れないため最優先。

- Next.js(App Router) + TypeScript + pnpm プロジェクト初期化
- Tailwind CSS v4 セットアップ
- Biome（Lint/Format）セットアップ
- Vitest セットアップ
- Cloudflare Workers（vinext）へのデプロイ導線確認（最小構成でデプロイできることを確認）
- フォント（Fredoka / Zen Maru Gothic）導入

### Phase 1: コア機能（MVP）

ワイヤーフレームで固めたトップページの中核部分。

- カウントダウン表示（`feature/countdown.md`）
- プログレスバー（リング/横長、`feature/progress-bar.md`）
- 時期によって変わる文言（`feature/messages.md`）
- タイムゾーン基準の実装（`docs/timezone.md`、JST固定）
- 基本レイアウト（ヘッダー・ファーストビュー、方向性F配色・フォント適用）

### Phase 2: 背景・ビジュアル演出

Phase 1が動いた上で、視覚的な魅力を加える。

- 背景アニメーション（天候・太陽/月の軌道、`feature/background-animation.md`）
- ダークモード切り替え（`feature/dark-mode.md`）
- タブタイトル・favicon動的更新（`feature/tab-title-favicon.md`）
- リング塗り足しアニメーション・形状切り替え（スワイプ/トグル）

### Phase 3: シェア機能

バズを狙う上での中核機能。

- SNSシェア（テキスト・アスキーアート、`feature/share.md`）
- OG画像動的生成（`feature/og-image.md`）
- 画像シェア（高解像度版、優先度低）

### Phase 4: SEO・非機能品質

公開前に固めるべき品質面。

- SEO対応（動的title/description、JSON-LD、`docs/seo.md`）
- パフォーマンス対応（更新ループ統合、`prefers-reduced-motion`等、`docs/performance.md`）
- エラーハンドリング・フォールバック（`docs/error-handling.md`）
- アクセシビリティ最低限対応

### Phase 5: 付加機能

MVPがあれば成立するが、あると楽しい・効果が高いもの。

- 累計訪問者数カウンター（`feature/visitor-counter.md`）
- 隠し要素・イースターエッグ（`feature/easter-egg.md`）
- 過去の年の記録ページ（`feature/archive.md`、将来検討）

### Phase 6: 公開準備

- プライバシー注記ページ（`docs/license.md`）
- 利用素材のライセンス最終確認
- 独自ドメイン等の最終確認（`docs/budget.md`）
- 本番デプロイ・動作確認

## 進め方の原則

- 各フェーズは目安であり、厳密に順番通りでなくてもよい（Phase 1とPhase 2の一部を並行するなど）
- 1 Issue = 1タスクの原則（`docs/rules/ISSUE.md`）を守り、上記の各項目をさらに具体的なIssueに分割する
- 実装中の細かいデザイン調整は、ワイヤーフレーム（Artifact）を都度参照しつつ、その場でjudgeする方針（`docs/wireframe.md`参照）
