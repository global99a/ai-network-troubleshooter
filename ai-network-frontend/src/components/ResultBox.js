// import React, { useEffect, useState } from "react";

// function TypingText({ text }) {
//   const [displayText, setDisplayText] = useState("");

//   useEffect(() => {
//     let i = 0;
//     const interval = setInterval(() => {
//       setDisplayText((prev) => prev + text.charAt(i));
//       i++;
//       if (i >= text.length) clearInterval(interval);
//     }, 20);

//     return () => clearInterval(interval);
//   }, [text]);

//   return <pre>{displayText}</pre>;
// }

// export default TypingText;