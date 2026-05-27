# MeON Support Site

MeON (iOS app) のサポート / 法務ページの静的サイト。GitHub Pages で公開しています。

## ページ構成

| Path             | 内容                       |
| ---------------- | -------------------------- |
| `index.html`     | ホーム (アプリ紹介)        |
| `terms.html`     | 利用規約                   |
| `privacy.html`   | プライバシーポリシー       |
| `tokushoho.html` | 特定商取引法に基づく表記   |
| `contact.html`   | お問い合わせ + FAQ         |
| `assets/style.css` | 共通スタイル              |

## 公開手順 (初回のみ)

1. GitHub の **Settings → Pages** を開く
2. **Source: Deploy from a branch**
3. **Branch: main** / **Folder: / (root)** を選択して **Save**
4. 数分で `https://modelinks.github.io/meon-support/` で公開される

## カスタムドメインを使う場合

`CNAME` ファイルを作成しドメイン (`meon.modelinks.jp` 等) を 1 行で書き、DNS の CNAME を `modelinks.github.io` に向ければ完了。

## 更新

HTML / CSS を編集 → commit & push するだけで自動デプロイ (1-2 分)。
