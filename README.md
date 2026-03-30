# 今年あとどんくらい？

> 今年が「あとどれくらい残っているか」を直感的に可視化するWebアプリケーション。

![サイトのスクショ](docs/images/)

## ABOUT

今年1年がどれくらい過ぎて、あとどれくらい残っているのかを可視化するツールです。

「時間」という目に見えないものを、ノイズのないミニマルなUIとタイポグラフィで美しく表現することにこだわりました。余白を活かし、情報の視認性を最優先しています。

## FEATURES

- リアルタイムな残り時間のカウントダウン (日・時間・分・秒)
- 今年の経過率 (%) とプログレスバー表示
- 進捗率に応じたメッセージの変化

## UPCOMING

- [ ] ダークモード・ライトモードの切り替え機能
- [ ] SNSへのシェア機能
- [ ] 単位（日・週・月）のトグル切り替え機能

---

## TECH STACK

- Framework: `Next.js`
- Language: `TypeScript`
- Styling: `Tailwind CSS`
- Font: `Noto Sans JP` / `Noto Sans Mono`

## GETTING STARTED

ローカル環境でのセットアップ手順です。

```bash
# リポジトリのクローン
git clone https://github.com/raiton-boo/year-project.git
cd year-project

# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev
```

ブラウザで `http://localhost:3000` を開いて確認してください。

## CONTRIBUTING

バグ報告や機能追加などのプルリクエストを歓迎します。

1. このリポジトリをフォークする (Fork)
2. 新しいブランチを作成する 例:
   - `git checkout -b feature/your-feature-name`
   - `git checkout -b fix/your-fix-name`
3. 変更をコミットする (`git commit -m 'Add some feature'`)
4. ブランチにプッシュする (`git push origin feature/your-feature-name`)
5. Pull Request を作成する

## LICENSE

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
