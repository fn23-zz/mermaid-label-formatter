# mermaid-label-formatter

Format Mermaid labels to prevent rendering errors in Markdown files.

## Usage

1. Open a Markdown file (e.g., `sample.md`).
2. Right-click or press `Shift + Alt + F` to execute the format command.

## Example

Labels will be automatically quoted:

- `A[Normal Node]` → `A["Normal Node"]`
- `B[Node with ・ symbol]` → `B["Node with ・ symbol"]`
- `C[Node with ? symbol]` → `C["Node with ? symbol"]`
- `D[Node with Japanese 文字]` → `D["Node with Japanese 文字"]`
