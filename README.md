# deno_dax_example1

## 概要

TypeScript で shell スクリプトが書ける dax を Deno で使ってみる。\
Deno 1.41 で deno compile で生成される exe
のサイズがかなり小さくなった[*](https://www.publickey1.jp/blog/24/denodeno_141.html)ようなので、そちらも試す。

### 期待している事

- 型チェック
- エラーハンドリング
- 再利用性
- 簡便な配布

### [Deno](https://deno.com/)

- Deno
  は、現代のプログラマーにとって最も生産的で、安全で、パフォーマンスの高いJavaScript
  ランタイムです。
- [Denoとは?](https://zenn.dev/uki00a/books/effective-deno/viewer/what-is-deno)

### [dax](https://github.com/dsherret/dax)

- [zx](https://github.com/google/zx) にインスパイアされた Deno と Node.js
  用のクロスプラットフォームのシェルツール
- クロスプラットフォームのシェル
  - より多くのコードを Windows 上で動作させる
  - シェルの環境をカレントプロセスにエクスポートできる
  - deno_task_shell のパーサを使用
  - Windowsをより良くサポートするための一般的なコマンドを内蔵。
- 最小限のグローバルまたはグローバル・コンフィギュレーション
  - デフォルトの $ のインスタンスだけですが、これを使うことは必須ではありません
- カスタム CLI はない
- シェルスクリプトの代わりとして使うだけでなく、アプリケーションコードにも適している
- 作者の愛猫にちなんで名付けられた

## 開発環境構築

### 前提

- Windows_NT x64 10.0.19045
- Visual Studio Code 1.87.0
- deno 1.41.1 (release, x86_64-pc-windows-msvc)

### 構築

- 拡張機能
  [Deno](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)
  をインストール
  > 注意\
  > JavaScript や TypeScript は Deno
  > だけのものではないため、拡張機能をインストールしてもデフォルトでは無効になっている。以降の手順で有効化する必要がある。
- `.vscode/settings.json` が無ければ作成し以下を記述
  ```json
  {
    "deno.enable": true,
    "deno.lint": true,
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "denoland.vscode-deno"
  }
  ```
  ※`"deno.enable": true` 以外はオプション。詳細は
  [Deno for Visual Studio Code](https://github.com/denoland/vscode_deno) を参照
- `.vscode/launch.json` が無ければ作成し以下を記述
  ```json
  {
    "version": "0.2.0",
    "configurations": [
      {
        "request": "launch",
        "name": "Launch Program",
        "type": "node",
        "program": "${file}",
        "cwd": "${workspaceFolder}",
        "runtimeExecutable": "deno.EXE",
        "runtimeArgs": [
          "run",
          "--inspect-wait",
          "--allow-all"
        ],
        "attachSimplePort": 9229,
        "console": "externalTerminal"
      }
    ]
  }
  ```
  ※`"console": "externalTerminal"` にしないと echo が出力されず...
  他の対処法があれば教えてくだい。

## Hello, World!

### hello.ts

```ts
import $ from "https://deno.land/x/dax@0.39.2/mod.ts";

await $`echo "Hello, World!"`;
```

### デバッグ実行(F5) の場合

実行したい *.ts ファイルをアクティブにした状態で `F5`\
※別ウィンドウでコンソールが開く

```
Debugger listening on ws://127.0.0.1:9229/ws/2ff8ef4a-863e-4a28-8f65-a69f2509f266
Visit chrome://inspect to connect to the debugger.
Deno is waiting for debugger to connect.
Debugger session started.
Hello, World!
Program finished. Waiting for inspector to disconnect to exit the process...
Debugger session ended
続行するには何かキーを押してください . . .
```

### コンソールで手動実行の場合

```
> deno.exe run --allow-all ./hello.ts   
Hello, World!
```

※[dax](https://github.com/dsherret/dax) の README
に色々な使用例が記載されているので、他の使い方はそちらを参照
