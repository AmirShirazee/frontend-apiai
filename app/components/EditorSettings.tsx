'use client';

import { Dialog, Transition } from '@headlessui/react';
import React from 'react';
import { useUpdateEditorSettingsMutation } from '@/redux/userSlice';
import { EditorSettingsModalProps, ToggleOptionProps } from '@/shared/types/interfaces';

const ToggleOption: React.FC<ToggleOptionProps> = ({
  optionLabel,
  optionKey,
  editorOptions,
  setEditorOptions,
}) => {
  const isOptionEnabled = editorOptions[optionKey] as boolean;

  return (
    <div className="flex items-center justify-between my-2">
      <div className="text-sm text-slate-400 dark:text-slate-300">{optionLabel}</div>
      <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
        <input
          type="checkbox"
          name={optionKey}
          id={`switch-${optionKey}`}
          checked={isOptionEnabled}
          className="toggle-checkbox absolute block w-6 h-6 rounded-full appearance-none cursor-pointer"
          onChange={() => {
            setEditorOptions((prev) => ({
              ...prev,
              [optionKey]: !prev[optionKey],
            }));
          }}
        />
        <label
          htmlFor={`switch-${optionKey}`}
          className="toggle-label block overflow-hidden h-6 rounded-full cursor-pointer"
        ></label>
      </div>
    </div>
  );
};

const EditorSettingsModal: React.FC<EditorSettingsModalProps> = ({
  isOpen,
  setIsOpen,
  editorOptions,
  setEditorOptions,
  userId,
}) => {
  const [updateEditorSettings, { isLoading, error }] = useUpdateEditorSettingsMutation();

  const handleSave = async () => {
    if (!userId) {
      alert('User ID is undefined. Cannot save settings.');
      return;
    }

    try {
      const result = await updateEditorSettings({ userId, editorOptions }).unwrap();

      if (result.message === 'User updated successfully') {
        setIsOpen(false);
      } else {
        alert('Error saving editor settings: ' + result.message);
      }
    } catch (error) {
      alert('An exception occurred while saving settings.');
    }
  };

  if (!editorOptions) {
    return null;
  }

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setIsOpen(false)}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-transparent" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-slate-900 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-slate-500">
                    Editor Settings
                  </Dialog.Title>
                  <div className="mt-2">
                    {/* Editor Settings Toggles */}
                    <ToggleOption
                      optionLabel="Read Only"
                      optionKey="readOnly"
                      editorOptions={editorOptions}
                      setEditorOptions={setEditorOptions}
                    />
                    <ToggleOption
                      optionLabel="Show Line Numbers"
                      optionKey="showLineNumbers"
                      editorOptions={editorOptions}
                      setEditorOptions={setEditorOptions}
                    />
                    <ToggleOption
                      optionLabel="Display Indent Guides"
                      optionKey="displayIndentGuides"
                      editorOptions={editorOptions}
                      setEditorOptions={setEditorOptions}
                    />
                    <ToggleOption
                      optionLabel="Highlight Active Line"
                      optionKey="highlightActiveLine"
                      editorOptions={editorOptions}
                      setEditorOptions={setEditorOptions}
                    />
                    <ToggleOption
                      optionLabel="Highlight Selected Word"
                      optionKey="highlightSelectedWord"
                      editorOptions={editorOptions}
                      setEditorOptions={setEditorOptions}
                    />
                    <div className="flex items-center py-2">
                      <label htmlFor="tabSize" className="mr-2">
                        Tab Size:
                      </label>
                      <select
                        id="tabSize"
                        className="border-gray-300 rounded-md"
                        value={editorOptions.tabSize}
                        onChange={(e) =>
                          setEditorOptions({
                            ...editorOptions,
                            tabSize: parseInt(e.target.value, 10),
                          })
                        }
                      >
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="8">8</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 space-x-3 flex justify-end">
                {' '}
                {/* Adjusted for right alignment */}
                <button
                  type="button"
                  className="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 px-4 py-2 flex items-center justify-center" // Adjusted classes for styling
                  onClick={handleSave}
                >
                  <svg
                    className="w-4 h-4 fill-current text-indigo-500 shrink-0 mr-2" // Added margin to separate icon from text
                    viewBox="0 0 16 16"
                  >
                    <path d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z" />
                  </svg>
                  Save
                </button>
                <button
                  type="button"
                  className="btn dark:bg-slate-600 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-500 px-4 py-2 flex items-center justify-center" // Adjusted classes for styling
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    className="w-4 h-4 fill-current text-gray-300 shrink-0 mr-2" // Close icon style
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />{' '}
                    {/* Close icon path */}
                  </svg>
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditorSettingsModal;
