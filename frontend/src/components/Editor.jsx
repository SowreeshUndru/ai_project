import { useEffect, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

function CodeEditor({ filetree, currentobject, Setfiletree }) {
  const [code, setCode] = useState(filetree?.[currentobject]?.file?.contents || "");
  const editorRef = useRef(null);

  // Sync filetree updates
  useEffect(() => {
    setCode(filetree?.[currentobject]?.file?.contents || "");
  }, [filetree, currentobject]);

  // Function to handle text updates
  const handleInput = (e) => {
    const newText = e.target.innerText;
    setCode(newText);

    // Update filetree
    Setfiletree((prev) => ({
      ...prev,
      [currentobject]: { file: { contents: newText } },
    }));
  };

  return (
    <div className="relative h-full w-full min-h-screen bg-gray-700 text-white p-3 rounded-md overflow-auto">
      {/* Editable Code Block */}
      <pre
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="whitespace-pre-wrap outline-none caret-white font-mono"
        onInput={handleInput}
      >
        <SyntaxHighlighter language="javascript" style={dracula}>
          {code}
        </SyntaxHighlighter>
      </pre>
    </div>
  );
}

export default CodeEditor;
