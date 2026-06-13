import { useState } from "react";
import Aichat from "./aichatbot";

function FloatingChatbot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full cursor-pointer bg-blue-500 text-white shadow-lg z-50"
      >
        🤖
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-96 h-125 bg-white shadow-2xl rounded-xl z-50">
          <Aichat />
        </div>
      )}
    </>
  );
}

export default FloatingChatbot;