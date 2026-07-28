# 算数大学 Version 7.0.1

教授画像がGitHub Pagesで表示されない問題を修正しました。

## 修正内容

7人分の教授画像を、外部のassetsフォルダではなくindex.htmlの内部へ直接埋め込みました。

そのため、GitHubへアップロードするファイルは基本的に以下の2つだけです。

- index.html
- .nojekyll

assetsフォルダをアップロードしなくても、教授画像が表示されます。

## GitHubへの反映

1. ZIPを展開する
2. GitHubのsansu-daigakuリポジトリを開く
3. 既存のindex.htmlを新しいindex.htmlで上書きする
4. .nojekyllもアップロードする
5. 公開ページで強制再読み込みする

Windows / Chromebook:
Ctrl + Shift + R

Mac:
Command + Shift + R

教師用初期パスコード：4180
