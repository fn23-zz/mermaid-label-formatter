# Mermaid Label Formatter 動作確認手順書

本拡張機能は、Markdown 内の Mermaid コードブロックにおいて、ラベルをダブルクォーテーションで囲むことで、記号による描画エラーを回避するためのものです。

## 1. 開発モードでの動作確認手順 (推奨)

開発中の拡張機能をすぐに VS Code 上で試すための最も簡単な方法です。

1. **VS Code でプロジェクトを開く**
   `e:\work\Cline\mermaid-label-formatter` ディレクトリを VS Code で開きます。

2. **デバッグの開始**
   - キーボードの `F5` キーを押すか、左側の「実行とデバッグ」アイコンをクリックし、「Run Extension」を選択します。
   - これにより、新しい VS Code ウィンドウ（**Extension Development Host**）が立ち上がります。

3. **テストファイルの準備**
   - 新しく立ち上がったウィンドウで、`test/testmermaid01.md` を開きます。

4. **整形コマンドの実行**
   - 開いた `testmermaid01.md` のエディタ上で右クリックし、**「ドキュメントの整形」 (Format Document)** を選択します。
   - または、ショートカットキー `Shift + Alt + F` を押します。

5. **結果の確認**
   - コードブロック内のラベルが以下のように書き換わっていることを確認してください。
    - `A[Normal Node]` $\rightarrow$ `A["Normal Node"]`
    - `B[Node with ・ symbol]` $\rightarrow$ `B["Node with ・ symbol"]`
    - `C[Node with ？ symbol]` $\rightarrow$ `C["Node with ？ symbol"]`
    - `D[Node with Japanese 文字]` $\rightarrow$ `D["Node with Japanese 文字"]`

---

## 2. 実際の検証手順 (Markdown PDF での確認)

記号によるエラーを回避する本来の目的を確認する手順です。

1. **拡張機能のインストール** (上記「パッケージ化」の手順で作成した `.vsix` を使用)
2. **Markdown PDF の準備**
   - VS Code に `Markdown PDF` 拡張機能がインストールされていることを確認します。
3. **PDF 出力の実行**
   - `test/testmermaid01.md` を開き、コマンドパレット (`Ctrl + Shift + P`) から `Markdown PDF: export(pdf)` を実行します。
4. **描画の確認**
   - 生成された PDF を開き、Mermaid の図の中に「・」や「？」が含まれていても、エラーにならずに正しく表示されていることを確認します。

---

## 3. (参考) パッケージ化してインストールする方法

作成した拡張機能を他の環境へ配布・インストールする場合の手順です。

1. **vsce のインストール** (未インストールの場合)
   ```bash
   npm install -g @vscode/vsce
   ```

2. **パッケージの作成**
   プロジェクトのルートディレクトリで以下のコマンドを実行します。
   ```bash
   vsce package
   ```
   成功すると、`mermaid-label-formatter-0.0.1.vsix` のようなファイルが生成されます。

3. **VS Code へのインストール**
   - VS Code の「拡張機能」ビューを開きます。
   - 右上の「...」メニューから「VSIX からインストール...」を選択し、生成されたファイルを選択します。