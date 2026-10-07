# 技術選定記録

## 概要

ここまでの検討を踏まえて決定した技術スタックと、その選定理由をまとめる。

## フレームワーク: Next.js (App Router) + vinext

### 決定

- **Next.js（App Router）**をReactフレームワークとして採用
- Cloudflareへのデプロイには **vinext** を使用（OpenNextではなく）

### 比較した代替案

| 選択肢                     | 不採用理由                                                                                                                                                         |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| React Router v7（旧Remix） | Cloudflareとの相性は良いが、Next.jsほどの機能・情報量はない。今回はNext.jsの充実したエコシステム（`next/og`によるOG画像生成、Metadata APIによるSEO統合など）を優先 |
| Astro + React Islands      | 静的サイトとの親和性は最も高いが、「React系フレームワークを使いたい」という希望と合わない（Reactはisland部分のみの利用になる）                                     |

### 採用理由

- OG画像生成（`feature/og-image.md`）を`next/og`（Satori）で実装でき、Metadata APIでSEO要件（動的title/description、構造化データ）も統合的に扱える
- Cloudflareも`vinext`によるNext.jsのWorkersデプロイを公式に推進しており、今後のサポートも期待できる

## 言語: TypeScript

- 型安全性を重視し、`any`型の使用は原則禁止（`docs/rules/AI-GUIDELINES.md`に準拠）

## アニメーション: motion

- 背景アニメーション（`feature/background-animation.md`）、プログレスバーのイージング、数字の切り替わり演出など、サイト全体のアニメーションに使用

## CSS: Tailwind CSS v4

## フォント: Baloo 2 / Zen Maru Gothic（Google Fonts）

- 数字（カウントダウン等）: `Baloo 2`
- 日本語テキスト: `Zen Maru Gothic`
- デザイン方向性F「イラストポップ融合」（`docs/wireframe.md`）で最終決定。比較検討の過程で`M PLUS Rounded 1c`等も試したが、最終的にこの組み合わせを採用した
- **数字フォントは`Fredoka`から`Baloo 2`に変更**: `Fredoka`は等幅数字（`tnum`）のOpenType機能を実装しておらず、`font-variant-numeric: tabular-nums`を指定しても効果がなかった（CSS側ではなくフォント側の対応状況の問題）。カウントダウンの秒表示など桁数が頻繁に変わる箇所でガタつきが発生したため、同系統の丸みのある書体かつ`tnum`に対応する`Baloo 2`に切り替えた

## クラス名結合: clsx + tailwind-merge（`cn`ユーティリティ）

- 条件分岐のあるTailwindクラスを安全に結合するため、`clsx` + `tailwind-merge`を`src/lib/cn.ts`の`cn()`関数として導入
- ボタンの選択状態（`aria-pressed`等）のような、状態に応じてクラスを出し分けるUIで使用する

## アイコン: Phosphor Icons

- 絵文字は使用せず、アイコンで統一する
- React実装時は`@phosphor-icons/react`パッケージを使用する
- SNSのブランドロゴ（X/LINE/Facebook/はてな/Threads）表現は未確定（`docs/wireframe.md`の未決事項を参照）

## パッケージマネージャー: pnpm

### 比較した代替案

| 選択肢 | 不採用理由                                                                                                                                            |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| bun    | インストール速度・新しさは魅力だが、Next.js + vinext + Wranglerという組み合わせでの実績がpnpmよりまだ少なく、ビルド時の非互換リスクを避けるため見送り |
| npm    | 動作に問題はないが、ディスク効率・速度でpnpmに劣るため見送り                                                                                          |

### 理由

- ディスク効率・インストール速度に優れ、Next.js + vinext + Wranglerという複雑な構成での実績・情報量が最も多い

## Lint/Formatter: Biome

- Rust製で高速。Lint（静的解析）とFormat（整形）が1ツールで完結する
- `docs/rules/AI-GUIDELINES.md`の「Linterのエラー・警告は原則すべて解消」方針に従う

## 背景アニメーションの描画方式

`feature/background-animation.md`で検討した構成に対応する、具体的な実装方針。

| レイヤー                                                       | 実装方式                                           | 理由                                                                                                                                                                                                        |
| -------------------------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 空のグラデーション                                             | CSS（カスタムプロパティ + motionでトランジション） | 単一要素の色変化のみのため、軽量なCSSで十分                                                                                                                                                                 |
| 太陽・月の軌道                                                 | SVG/div + motion                                   | オブジェクト数が少なく（最大2つ）、DOMベースのアニメーションで十分な性能が出る                                                                                                                              |
| 天候パーティクル（雨・雪・雲など）                             | **tsParticles**（Canvasベース）                    | 大量の粒子を同時に動かすため、DOM操作ではなくCanvas描画が必須。実装コストを抑えるため専用ライブラリを採用                                                                                                   |
| 背景に漂う軽い季節装飾（絵文字・画像の粒子）                   | tsParticlesの画像/絵文字シェイプ機能               | 天候パーティクルと同じ基盤を流用し、実装・保守コストを抑える                                                                                                                                                |
| 特定の日の主役キャラクター演出（雪だるま・スイカ・かぼちゃ等） | **Lottie**（`lottie-react`）                       | [LottieFiles](https://lottiefiles.com/)の無料素材をそのまま利用でき、自前でイラスト・アニメーションを作る必要がない。Satori/next-ogでは使えないため、OG画像ではなくサイト本体の背景アニメーション限定の採用 |

### キャラクター演出（Lottie）の採用理由

- 自前でのイラスト制作・アニメーション実装に自信がないため、既製の高品質ベクターアニメーションをそのまま再生できるLottieを採用
- LottieFilesで「snowman」「pumpkin」「halloween」「watermelon」等のキーワード検索で無料素材を探し、ライセンスを確認した上で利用する
- 比較した代替: **Rive**（Lottieと同系統のツール。インタラクティブ性は高いが、無料素材のコミュニティ規模がLottieよりまだ小さいため見送り）

## 天文計算ライブラリ: suncalc（想定）

- 緯度経度・日時から日の出/日の入り時刻や太陽・月の位置を計算する軽量ライブラリ
- 外部APIを必要とせず、クライアント/サーバーどちらでも計算可能

## テスト: Vitest

- Next.js・TypeScriptとの親和性が高く、高速に動作する
- E2Eテスト（Playwright等）の要否は、実装が進んだ段階で必要に応じて検討する

## インフラ: Cloudflare Workers + Workers Static Assets

### 決定

- Cloudflare Pagesではなく **Workers + Workers Static Assets** を採用

### 理由

- Cloudflare公式が新規プロジェクトにはPagesではなくWorkersを推奨している（Pagesは既存デプロイの保守向け）
- OG画像の動的生成・天候APIの呼び出しなど、サーバーサイド処理が必要な機能が多く、Workersの実行環境が適している

## データストア: Cloudflare KV

### 用途

- 累計訪問者数カウンター（`feature/visitor-counter.md`）
- 過去の年のスナップショットデータ（`feature/archive.md`）

### 理由

- どちらも単純なキーバリューの読み書きで十分なユースケースであり、D1のようなリレーショナルDBは不要と判断

## アセットストレージ: Cloudflare R2（想定）

- OG画像・シェア画像用の背景イラスト（`feature/og-image.md`）など、事前生成した静的画像アセットの保存先として想定
- 最終的な技術選定は実装時に確定する

## スケジュール実行: Cloudflare Cron Triggers

- 過去の年のアーカイブスナップショット生成（`feature/archive.md`）に使用。毎年1/1 00:05頃（JST）に自動実行

## 外部API: Open-Meteo（天気データ）

### 決定

- 背景アニメーション（`feature/background-animation.md`）の天候表現に、**Open-Meteo**（無料・APIキー不要）を採用

### 理由

- APIキーの管理が不要で、個人開発のコスト・運用負荷を抑えられる
- Cloudflare Workers経由で呼び出し、地域単位・4時間ごとにエッジキャッシュしてコストを抑制する

## 位置情報: Cloudflare `request.cf`

- ブラウザのGeolocation APIの許可プロンプトを必須にせず、Cloudflare Workersが自動付与するIPベースの位置情報をデフォルトとして使用
- ユーザーが許可した場合のみ、ブラウザのGeolocation APIでより正確な位置情報に上書きする

## アナリティクス: Cloudflare Web Analytics

- Cookie不要でプライバシーに配慮したアクセス解析。Cloudflareでホスティングするため導入も容易

## Git運用

- `docs/rules/`配下（`BRANCHING.md` / `COMMIT-MESSAGE.md` / `ISSUE.md` / `PR.md`）の規約にそのまま従う
- **プロジェクト固有の決定**: `dev`ブランチは使わず`main`+作業ブランチのみ、PRのデフォルトマージ方式は**Squash and Merge**
- リポジトリ: `year-project`（GitHub `raiton-boo`、Public）としてセットアップ済み

## 検討中・未決の技術要素

- OG画像・シェア画像用アセットの具体的なR2フォルダ構成（例: `/og/{quarter}/{variant}.png`、`/og/special/{event}.png`）
- 過去の年のスナップショットのKVデータ構造（例: キー`archive:{year}`にJSONを保存）
- 累計訪問者数カウンターのKVキー設計（例: キー`visitor:total`）
- CI/CD（具体的な構成は実装時に決定）

## 見送った技術・方針

- **残り日数・進捗率のJSON API公開**: 悪意あるリクエスト集中によるコスト増を懸念し、`feature.md`で見送りと記録済み
