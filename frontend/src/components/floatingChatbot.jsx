import { useState } from "react";
import Aichat from "./aichatbot";

function FloatingChatbot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full cursor-pointer bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/40 hover:shadow-teal-500/60 hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center text-2xl border-2 border-teal-300/30"
      >
        {open ? '✕' : '🤖'}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-28 right-6 w-[calc(100vw-3rem)] sm:w-96 h-[32rem] max-h-[80vh] bg-slate-900 border border-slate-800 shadow-[0_0_40px_rgba(45,212,191,0.2)] rounded-2xl z-50 overflow-hidden backdrop-blur-xl animate-in slide-in-from-bottom-5 fade-in duration-300">
          <Aichat />
        </div>
      )}
    </>
  );
}

export default FloatingChatbot;