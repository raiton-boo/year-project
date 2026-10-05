# 機能一覧

`requirements.md`で定義した機能のうち、詳細仕様を詰める必要があるものを`feature/`配下に個別ドキュメントとして切り出す。
本ファイルは全体の一覧（インデックス）として機能し、各機能の詳細はリンク先を参照する。

| 機能                                 | 詳細ドキュメント                                                   | ステータス         |
| ------------------------------------ | ------------------------------------------------------------------ | ------------------ |
| 残り時間表示（カウントダウン）       | [feature/countdown.md](feature/countdown.md)                       | 検討中             |
| プログレスバー                       | [feature/progress-bar.md](feature/progress-bar.md)                 | 検討中             |
| 時期によって変わる文言               | [feature/messages.md](feature/messages.md)                         | 検討中             |
| OG画像（動的生成）                   | [feature/og-image.md](feature/og-image.md)                         | 検討中             |
| SNSシェア機能                        | [feature/share.md](feature/share.md)                               | 検討中             |
| 過去の年の記録ページ                 | [feature/archive.md](feature/archive.md)                           | 検討中（将来検討） |
| タブタイトル・favicon動的更新        | [feature/tab-title-favicon.md](feature/tab-title-favicon.md)       | 検討中             |
| ダークモード対応                     | [feature/dark-mode.md](feature/dark-mode.md)                       | 検討中             |
| 隠し要素・イースターエッグ           | [feature/easter-egg.md](feature/easter-egg.md)                     | 検討中             |
| 累計訪問者数カウンター               | [feature/visitor-counter.md](feature/visitor-counter.md)           | 検討中             |
| 背景アニメーション（天候・天体連動） | [feature/background-animation.md](feature/background-animation.md) | 検討中             |

## 検討したが見送った機能

- **残り日数・進捗率のJSON API公開**: 技術アピールとしては魅力的だが、アクセス増加時や悪意あるリクエスト集中による負荷増（コスト増）を懸念して見送り

## ステータスの定義

- **未着手**: まだヒアリング・検討を開始していない
- **検討中**: ヒアリング中、仕様を詰めている最中
- **確定**: 仕様が固まり、実装着手可能な状態
