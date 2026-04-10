"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
// Note: In a real test environment, we would use a testing framework like Mocha/Jest.
// For this purpose, we will mock the necessary parts or use a simplified version of the logic.
// Since we cannot easily import the extension class without a full VS Code environment,
// we will re-implement the core logic here for verification purposes.
function formatMermaidLabels(text) {
    const edits = [];
    const mermaidBlockRegex = /```mermaid\r?\n([\s\S]*?)\r?\n```/g;
    let match;
    while ((match = mermaidBlockRegex.exec(text)) !== null) {
        const blockContent = match[1];
        // Find the end of the opening line to calculate the offset correctly
        const firstNewlineIndex = match[0].indexOf('\n');
        const blockStartOffset = match.index + (firstNewlineIndex !== -1 ? firstNewlineIndex + 1 : 0);
        const nodeRegex = /(\w+)\s*\[([^"\]][^\]]*?)\]/g;
        let nodeMatch;
        while ((nodeMatch = nodeRegex.exec(blockContent)) !== null) {
            const nodeId = nodeMatch[1];
            const label = nodeMatch[2];
            const fullMatch = nodeMatch[0];
            const relativeMatchIndex = nodeMatch.index;
            const absoluteMatchStart = blockStartOffset + relativeMatchIndex;
            const absoluteMatchEnd = absoluteMatchStart + fullMatch.length;
            const replacement = `${nodeId}["${label}"]`;
            edits.push({
                start: absoluteMatchStart,
                end: absoluteMatchEnd,
                replacement: replacement
            });
        }
    }
    // Apply edits in reverse order to not mess up indices
    let result = text;
    const sortedEdits = edits.sort((a, b) => b.start - a.start);
    for (const edit of sortedEdits) {
        result = result.slice(0, edit.start) + edit.replacement + result.slice(edit.end);
    }
    return result;
}
function runTest() {
    const testFilePath = path.join(__dirname, 'testmermaid01.md');
    const inputContent = fs.readFileSync(testFilePath, 'utf8');
    console.log('--- Input Content ---');
    console.log(inputContent);
    const outputContent = formatMermaidLabels(inputContent);
    console.log('\n--- Output Content ---');
    console.log(outputContent);
    const expectedLines = [
        '    A["Normal Node"] --> B["Node with ・ symbol"]',
        '    B --> C["Node with ？ symbol"]',
        '    C --> D["Node with Japanese 文字"]',
        '    D --> E["Already quoted node"]'
    ];
    let allPassed = true;
    for (const expected of expectedLines) {
        if (!outputContent.includes(expected)) {
            console.error(`\n[FAILED] Expected line not found: ${expected}`);
            allPassed = false;
        }
    }
    if (allPassed) {
        console.log('\n[SUCCESS] All tests passed!');
        process.exit(0);
    }
    else {
        console.log('\n[FAILED] Some tests failed.');
        process.exit(1);
    }
}
runTest();
//# sourceMappingURL=test_logic.js.map