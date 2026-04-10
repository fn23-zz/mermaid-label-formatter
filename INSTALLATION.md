# Installation Guide / インストールガイド

This document explains how to install and distribute the **Mermaid Label Formatter** extension depending on your use case.
このドキュメントでは、利用シーンに応じた **Mermaid Label Formatter** 拡張機能のインストールおよび配布方法について説明します。

---

## 1. Personal Use / 個人での利用

### [JP] 個人での利用 (単一PC)
開発者自身が現在のPCで利用する場合。

#### 開発モード
変更をすぐにテストしたい場合：
1. VS Codeでこのプロジェクトフォルダを開きます。
2. `F5` キーを押して「拡張機能の開発ホスト」を起動します。

#### 常時利用モード
標準的な拡張機能として利用する場合：
1. プロジェクトをビルドします: `npm run compile`。
2. ビルドされたフォルダを含むプロジェクト全体を、VS Codeの拡張機能ディレクトリにコピーします：
   - **Windows**: `%USERPROFILE%\.vscode\extensions`
   - **macOS/Linux**: `~/.vscode/extensions`

### [EN] For Personal Use (Single PC)
If you are the developer and want to use the extension on your current machine.

#### Development Mode
To test changes immediately:
1. Open this project folder in VS Code.
2. Press `F5` to launch the "Extension Development Host".

#### Permanent Installation
To use it as a standard extension:
1. Build the project: `npm run compile`.
2. Copy the entire project folder to your VS Code extensions directory:
   - **Windows**: `%USERPROFILE%\.vscode\extensions`
   - **macOS/Linux**: `~/.vscode/extensions`

---

## 2. Multiple PCs / 複数のPCでの利用

### [JP] 複数のPCでの利用
自分が使用する、いくつかの別のPCで利用する場合。

#### 方法: `.vsix` パッケージの使用
1. **元のPCで**: `npx @vscode/vsce package` を実行してパッケージファイルを作成します。これにより `mermaid-label-formatter-0.0.1.vsix` が生成されます。
2. **転送**: 生成された `.vsix` ファイルをUSBメモリやクラウドストレージ経由で他のPCにコピーします。
3. **ターゲットPCでの設定**:
    - VS Codeを開きます。
    - 拡張機能ビュー（`Ctrl+Shift+X`）を表示します。
    - 拡張機能パネルの右上にある「...」（その他のアクション）をクリックします。
    - **「VSIX からインストール... (Install from VSIX...)」** を選択します。
    - コピーしたファイルを選択します。

### [EN] For Personal Use (Multiple PCs)
If you want to use the same extension on several of your own computers.

#### Method: Using `.vsix` package
1. **On the source PC**: Generate a package file by running `npx @vscode/vsce package`. This will create a file named `mermaid-label-formatter-0.0.1.vsix`.
2. **Transfer**: Copy the `.vsix` file to your other PCs via USB, cloud storage, etc.
3. **On the target PC**:
    - Open VS Code.
    - Go to the **Extensions** view (`Ctrl+Shift+X`).
    - Click the **"..."** (More Actions) menu in the Extensions pane.
    - Select **"Install from VSIX..."**.
    - Choose the `.vsix` file you transferred.

---

## 3. Distributing to Friends / 知人への配布

### [JP] 少数の知人への配布
少数の知り合いに利用してもらう場合。

#### 配布方法
`.vsix` ファイルをメールやファイル共有サービスで直接配布します。

#### 利用者向け手順書 (そのまま配布可能です)
> #### 【手順書】Mermaid Label Formatter のインストール方法
> 
> **概要**: Markdown内のMermaidラベルを自動整形するVS Code拡張機能です。
> 
> **インストール手順**:
> 1. 配布された `mermaid-label-formatter-0.0.1.vsix` ファイルをPCに保存します。
> 2. Visual Studio Code を起動します。
> 3. 左側のサイドバーにある「拡張機能」アイコンをクリックします（または `Ctrl+Shift+X`）。
> 4. 拡張機能パネル上部の「...」ボタンをクリックし、**「VSIX からインストール...」** を選択します。
> 5. 保存した `.vsix` ファイルを選択して「インストール」をクリックします。
> 6. インストール完了後、VS Codeを再起動することをお勧めします。

### [EN] For Distributing to Friends (Small Group)
If you want to share the extension with a few people you know.

#### Distribution Method
Distribute the `.vsix` file directly via email or file sharing services.

#### User Installation Guide (Share this with them)
> #### How to Install Mermaid Label Formatter
> 
> 1. Download the provided `mermaid-label-formatter-0.0.1.vsix` file.
> 2. Open **Visual Studio Code**.
> 3. Click on the **Extensions** icon in the Activity Bar on the side of VS Code (or press `Ctrl+Shift+X`).
> 4. Click the **"..."** (More Actions) icon at the top of the Extensions view.
> 5. Select **"Install from VSIX..."**.
> 6. Select the `mermaid-label-formatter-0.0.1.vsix` file you downloaded.
> 7. Once installed, it is recommended to restart VS Code.

---

## 4. Public Release / 不特定多数への公開

### [JP] 不特定多数への公開
世界中の誰でも利用できるようにする場合。

#### 配布方法
**Visual Studio Marketplace** に公開するのが最も標準的です。

#### 公開フロー (開発者向け)
1. **アカウント準備**: Microsoft DevLabs / Azure DevOps のアカウントを作成し、Publisher（発行者）を作成します。
2. **ツールの準備**: ターミナルで `npm install -g @vscode/vsce` を実行して、公開用ツールをインストールします。
3. **ログイン**: ターミナルで `vsce login <あなたの発行者名>` を実行して、発行者としてログインします。
4. **公開**: プロジェクトのルートディレクトリで `vsce publish` を実行します。これにより、自動的に最新版のビルドとアップロードが行われます。

#### 利用者向け手順書 (一般ユーザー向け)
> #### 【手順書】Mermaid Label Formatter のインストール方法
> 
> 1. Visual Studio Code を起動します。
> 2. 左側のサイドバーにある「拡張機能」アイコンをクリックします（または `Ctrl+Shift+X`）。
> 3. 検索窓に 「Mermaid Label Formatter」 と入力します。
> 4. 検索結果に表示された拡張機能の「インストール」ボタンをクリックします。

### [EN] For Public Release (General Public)
If you want to make the extension available to everyone in the world.

#### Distribution Method
Publish the extension to the **Visual Studio Marketplace**.

#### Publication Workflow (For the Developer)
1. **Prepare Account**: Create a Microsoft DevLabs / Azure DevOps account and set up a Publisher.
2. **Install Tool**: Install the publishing tool via terminal: `npm install -g @vscode/vsce`.
3. **Login**: Log in to your publisher account: `vsce login <your-publisher-name>`.
4. **Publish**: Run `vsce publish` from the project root. This automatically builds and uploads the extension.

#### User Installation Guide (For the Public)
> #### How to Install Mermaid Label Formatter
> 
> 1. Open **Visual Studio Code**.
> 2. Click on the **Extensions** icon in the Activity Bar (or press `Ctrl+Shift+X`).
> 3. In the search bar, type: `Mermaid Label Formatter`.
> 4. Find the extension in the results and click the **Install** button.