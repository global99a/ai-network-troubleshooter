import React from "react";

function InputBox({ log, setLog, onAnalyze }) {
  return (
    <div className="input-box">
      <textarea
        placeholder="Paste network logs here..."
        value={log}
        onChange={(e) => setLog(e.target.value)}
      />

      <button onClick={onAnalyze}>Analyze</button>
    </div>
  );
}

export default InputBox;