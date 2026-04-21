import React, { useState, useEffect } from "react";
import axios from "axios";
import InputBox from "../components/InputBox";

// Typing animation component
function TypingText({ text }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayText("");

    const interval = setInterval(() => {
      setDisplayText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 20);

    return () => clearInterval(interval);
  }, [text]);

  return <pre>{displayText}</pre>;
}

function Home() {
  const [log, setLog] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // 👇 NEW STATE to store last sent message
  const [lastLog, setLastLog] = useState("");

  const handleAnalyze = async () => {
    if (!log) return;

    const currentLog = log; // store before clearing

    setLastLog(currentLog); // save to show in chat
    setLog(""); // ✅ CLEAR INPUT BOX

    setLoading(true);
    setResult("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/analyze",
        currentLog,
        { headers: { "Content-Type": "text/plain" } }
      );

      setResult(response.data);
    } catch (error) {
      console.log(error);
      setResult("Error connecting to backend");
    }

    setLoading(false);
  };

  return (
    <div className="chat-container">
      <h1>AI Network Troubleshooter</h1>

      <div className="chat-box">
        {/* ✅ Show LAST message (not current input) */}
        {lastLog && <div className="user-msg">{lastLog}</div>}

        {/* Loading */}
        {loading && (
          <div className="ai-msg typing">
            Analyzing<span>.</span><span>.</span><span>.</span>
          </div>
        )}

        {/* AI Response */}
        {!loading && result && (
          <div className="ai-msg">
            <TypingText text={result} />
          </div>
        )}
      </div>

      <InputBox log={log} setLog={setLog} onAnalyze={handleAnalyze} />
    </div>
  );
}

export default Home;