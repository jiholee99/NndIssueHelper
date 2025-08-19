import { useState } from "react";

export default function PopupExample({ isOpen, setIsOpen, textToCopy }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="rounded-xl bg-white p-6 shadow-lg w-full max-w-sm max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold">Share this link</h2>
        <pre className="mt-2 break-all text-sm text-gray-700 whitespace-pre-wrap">{textToCopy}</pre>

        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={handleCopy}
            className="rounded bg-green-600 px-3 py-1.5 text-white hover:bg-green-700"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
