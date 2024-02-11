import React, { useRef, useState } from "react";
import AceEditor from "react-ace";
import CopyToClipboard from "react-copy-to-clipboard";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-nord_dark";
import "ace-builds/src-noconflict/theme-ambiance";

interface CodeDisplayProps {
  code: string;
  darkMode?: boolean;
  theme: string;
  editorOptions: {
    readOnly: boolean;
    showLineNumbers: boolean;
    tabSize: number;
    displayIndentGuides: boolean;
    highlightActiveLine: boolean;
    highlightSelectedWord: boolean;
  };
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({
  code,
  darkMode = true,
  theme,
  editorOptions,
}) => {
  const editorRef = useRef<any>(null);
  const [isCopied, setIsCopied] = useState(false);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openThemeDialog, setOpenThemeDialog] = useState(false);

  const handleCopyClick = () => {
    setIsCopied(true);
    setCopyButtonClass("copy-btn-animated");
    setTimeout(() => {
      setIsCopied(false);
      setCopyButtonClass("");
    }, 1000);
  };

  const toggleCollapse = () => {
    const editor = editorRef.current?.editor;
    const session = editor?.session;
    if (isCollapsed) {
      for (let i = 0; i < session.getLength(); i++) {
        session.unfold(i, true);
      }
    } else {
      editor.session.foldAll();
    }
    setIsCollapsed(!isCollapsed);
  };

  const editorControlsStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
  };

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100vw",
    height: "100vh",
    maxWidth: "100%",
    maxHeight: "100%",
    backgroundColor: "#1E1E1E",
    color: "white",
    border: "4px solid #2c3e50",
    borderRadius: "8px",
    padding: "1em",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const [copyButtonClass, setCopyButtonClass] = useState("");

  return (
    <div className="code-container" style={containerStyle}>
      <div style={editorControlsStyle}>
        <CopyToClipboard text={code} onCopy={handleCopyClick}>
          <button
            className={`btn ${copyButtonClass} dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600`}
          >
            {/* SVG for Copy Icon */}
            <svg
              className="w-4 h-4 fill-current text-slate-500 dark:text-slate-400 shrink-0"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19,21H8c-1.104,0-2-0.896-2-2V7c0-1.104,0.896-2,2-2h3v2H8v12h11V9h-1V7h3c1.104,0,2,0.896,2,2v10C21,20.104,20.104,21,19,21z" />
              <path d="M15,1H4C2.896,1,2,1.896,2,3v12c0,1.104,0.896,2,2,2h1V7c0-1.104,0.896-2,2-2h10V3C17,1.896,16.104,1,15,1z" />
            </svg>
          </button>
        </CopyToClipboard>
        <button
          className="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
          onClick={toggleCollapse}
        >
          {isCollapsed ? <ExpandIcon /> : <CollapseIcon />}
        </button>
      </div>
      <AceEditor
        ref={editorRef}
        mode="typescript"
        theme={theme}
        value={code}
        fontSize={14}
        style={{ width: "100%", height: "100%" }}
        setOptions={editorOptions}
      />
    </div>
  );
};

export default CodeDisplay;
// SVG for Expand Icon
const ExpandIcon = () => (
  <svg
    className="w-4 h-4 fill-current text-slate-500 dark:text-slate-400 shrink-0"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z" />
  </svg>
);

const CollapseIcon = () => (
  <svg
    className="w-4 h-4 fill-current text-slate-500 dark:text-slate-400 shrink-0"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1.646 11.354a.5.5 0 00.708 0L8 5.707l5.646 5.647a.5.5 0 00.708-.708l-6-6a.5.5 0 00-.708 0l-6 6a.5.5 0 000 .708z" />
  </svg>
);
