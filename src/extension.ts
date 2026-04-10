import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, the "mermaid-label-formatter" extension is now active!');

    const formattingProvider = new MermaidLabelFormatter();
    context.subscriptions.push(
        vscode.languages.registerDocumentFormattingEditProvider('markdown', formattingProvider)
    );
}

export function deactivate() {}

class MermaidLabelFormatter implements vscode.DocumentFormattingEditProvider {
    public provideDocumentFormattingEdits(
        document: vscode.TextDocument,
        _options: vscode.FormattingOptions,
        token: vscode.CancellationToken
    ): vscode.TextEdit[] {
        const edits: vscode.TextEdit[] = [];
        const text = document.getText();

        // Mermaid code blocks regex: ```mermaid\n(content)\n``` (supports CRLF)
        const mermaidBlockRegex = /```mermaid\r?\n([\s\S]*?)\r?\n```/g;
        let match;

        while ((match = mermaidBlockRegex.exec(text)) !== null) {
            const blockContent = match[1];
            // Calculate the start of the content within the full match
            // match[0] is "```mermaid\ncontent\n```"
            // We find where the content starts by skipping the header and the first newline
            const headerEndIndex = match[0].indexOf(blockContent);
            const blockStartOffset = match.index + headerEndIndex;
            const blockEndOffset = blockStartOffset + blockContent.length;

            // Within the mermaid block, find node definitions: ID[Label]
            // This regex looks for: ID[Label] where Label doesn't start with "
            // It captures: 1: ID, 2: Label
            const nodeRegex = /([\w-]+)\s*\[([^"\]][^\]]*?)\]/g;
            let nodeMatch;

            while ((nodeMatch = nodeRegex.exec(blockContent)) !== null) {
                const nodeId = nodeMatch[1];
                const label = nodeMatch[2];
                const fullMatch = nodeMatch[0];
                
                // Calculate the absolute position in the document
                const relativeMatchIndex = nodeMatch.index;
                const absoluteMatchStart = blockStartOffset + relativeMatchIndex;
                const absoluteMatchEnd = absoluteMatchStart + fullMatch.length;

                // Create the replacement: ID["Label"]
                const replacement = `${nodeId}["${label}"]`;

                edits.push(vscode.TextEdit.replace(
                    new vscode.Range(
                        document.positionAt(absoluteMatchStart),
                        document.positionAt(absoluteMatchEnd)
                    ),
                    replacement
                ));
            }
        }

        return edits;
    }
}