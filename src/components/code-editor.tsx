import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { oneDark } from "@codemirror/theme-one-dark"

interface CodeEditorProps {
  value: string
  onChange?: (value: string) => void
  height?: string
  readOnly?: boolean
}

export function CodeEditor({
  value,
  onChange,
  height = "300px",
  readOnly = false,
}: CodeEditorProps) {
  return (
    <CodeMirror
      value={value}
      height={height}
      extensions={[javascript({ typescript: true })]}
      theme={oneDark}
      readOnly={readOnly}
      onChange={(val) => onChange?.(val)}
    />
  )
}
