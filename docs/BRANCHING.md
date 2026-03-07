# ブランチ運用ルール

## 目的

- main ブランチを本番とする。develop を統合・検証用に残す。feature/\* で開発する。

## ブランチ一覧

- feature/\*
  - 各機能や修正用。開発はここで行い、完了したら develop に反映。
  - develop へのマージは PR を省略して直接 push/merge して構いません（PRしてもいい）。
  - CI（lint/test/build）が必須。
- develop
  - 統合・動作確認用。プレビューデプロイや結合テストを行う。
  - 安定したら develop → main の PR を作成してレビュー・マージする（main への直接マージは禁止）。
- main
  - 本番ブランチ。main へのマージ（PR）で本番用 CI/CD（ビルド → デプロイ）を実行する。
  - リリースは main 上でタグを切って記録する（例: v1.0.0）。タグ push によってデプロイがトリガされます。

## リリース手順

1. feature/\* を develop に反映（直接マージ可）。
2. develop 上で統合・確認（CI実行）。
3. develop → main に PR を作成してレビュー・マージする。
4. main にマージ後、RELEASE_NOTES.md を更新しタグを作成（git tag -a vX.Y.Z）。
5. タグ push により CI/CD がデプロイを実行。

## CI / CD の役割

- CI: PR（および develop push）で lint / test / build を実行（品質チェック）。
- CD: タグ push（main 上のタグ）でビルド→デプロイを実行（本番公開）。

## ブランチ保護（推奨）

- main: 直接 push 禁止、status checks（CI）必須、PR マージ必須（レビュー 1 人を推奨）。
