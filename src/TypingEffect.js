import React, { useState, useEffect } from "react";

// const TypingEffect = (props) => {
//   const [text, setText] = useState("");
//   const messages = [props.text];
//   const speed = 50;
//   let index = 0;
//   let timer;

//   useEffect(() => {
//     timer = setInterval(() => {
//       if (index >= messages.length) {
//         clearInterval(timer);
//         return;
//       }

//       setText(messages[index].substring(0, text.length + 1));
//       if (text === messages[index]) {
//         clearInterval(timer);
//         setTimeout(() => {
//           timer = setInterval(() => {
//             if (text === "") {
//               clearInterval(timer);
//               index++;
//               if (index < messages.length) {
//                 timer = setInterval(() => {
//                   setText(messages[index].substring(0, text.length + 1));
//                   if (text === messages[index]) {
//                     clearInterval(timer);
//                   }
//                 }, speed);
//               }
//             } else {
//               setText(text.substring(0, text.length - 1));
//             }
//           }, speed);
//         }, 2000);
//       }
//     }, speed);

//     return () => clearInterval(timer);
//   }, [index, text]);

//   return <p>Assistant:{text}</p>;
// };

const TypingEffect = (props) => {
  const [text, setText] = useState("");
  const messages = [props.text];
  const speed = 50;
  let index = 0;
  let timer;

  useEffect(() => {
    timer = setInterval(() => {
      if (index >= messages.length) {
        clearInterval(timer);
        return;
      }

      setText(messages[index].substring(0, text.length + 1));
      if (text === messages[index] && text.length !== messages[index].length) {
        // add check to only trigger next message if text hasn't reached message length
        clearInterval(timer);
        setTimeout(() => {
          timer = setInterval(() => {
            if (text === "") {
              clearInterval(timer);
              index++;
              if (index < messages.length) {
                timer = setInterval(() => {
                  setText(messages[index].substring(0, text.length + 1));
                  if (
                    text === messages[index] &&
                    text.length !== messages[index].length
                  ) {
                    // add check to only trigger next message if text hasn't reached message length
                    clearInterval(timer);
                  }
                }, speed);
              }
            } else {
              setText(text.substring(0, text.length - 1));
            }
          }, speed);
        }, 2000);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [index, text]);

  return (
    <div className="text-inline">
      <p className="role">Assistant:</p>
      <p>{text}</p>
    </div>
  );
};

export default TypingEffect;
