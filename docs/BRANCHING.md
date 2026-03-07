# ブランチ運用ルール

## 目的

- mainブランチを本番とする。developを統合・検証用に残す。feature/\* で開発。

## ブランチ一覧

- feature/\*
  - 各機能や修正用。開発はここで行い、完了したら develop へ PR を作成。
  - CI（lint/test/build）が必須。
- develop
  - 統合・動作確認用。プレビューデプロイや結合テストを行う。
  - 安定したら develop → main の PR を作成してマージ。
- main
  - 本番ブランチ。main へのマージ（PR）で本番用 CI/CD（ビルド → デプロイ）を実行する。
  - タグを切って正式リリースを記録する（例: v1.0.0）。

## リリース手順

1. feature/\* を develop にマージ（PR）して統合・確認する。
2. develop 上で最終確認を行う。
3. develop → main に PR を作成してレビュー・マージする。
4. main にマージ後、RELEASE_NOTES.md を更新してタグを作成する（git tag -a vX.Y.Z）。
5. タグ push によって CI/CD がデプロイを実行。

## CI / CD の役割

- CI: PR で lint / test / build を実行（品質チェック）。
- CD: main へのマージ時に本番デプロイを実行。

## ブランチ保護

- main: 直接 push 禁止、status checks（CI）必須、PR マージを必須にする（レビュー数は任意で設定）。
