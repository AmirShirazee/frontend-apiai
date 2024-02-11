export interface EditorOptions {
  readOnly: boolean;
  showLineNumbers: boolean;
  tabSize: number;
  displayIndentGuides: boolean;
  highlightActiveLine: boolean;
  highlightSelectedWord: boolean;
}

// Update the type for setEditorOptions to match React state setter type
export interface EditorSettingsModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  editorOptions: EditorOptions;
  setEditorOptions: React.Dispatch<React.SetStateAction<EditorOptions>>;
  userId?: string;
}

export type BooleanKeys<T> = {
  [K in keyof T]: T[K] extends boolean ? K : never;
}[keyof T];

export interface ToggleOptionProps {
  optionLabel: string;
  optionKey: BooleanKeys<EditorOptions>;
  editorOptions: EditorOptions;
  setEditorOptions: React.Dispatch<React.SetStateAction<EditorOptions>>;
}
