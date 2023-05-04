import { useEffect, useState } from "react";
import ChatContainer from "./ChatContainer.js";

const App = () => {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [previousChats, setPreviousChats] = useState([]); // {title:'', user:'', assistant:''}
  const [currentTitle, setCurrentTitle] = useState(undefined);
  const [historyTitles, setHistoryTitles] = useState([]);

  useEffect(() => {
    if (!currentTitle && input && reply) {
      setCurrentTitle(input);
      setHistoryTitles((prev) => {
        return [...prev, input];
      });
    }
    if (currentTitle && input && reply) {
      setPreviousChats((prev) => {
        return [
          ...prev,
          {
            title: currentTitle,
            user: input,
            assistant: reply,
          },
        ];
      });
      setInput("");
    }

    console.log(`useEffect`);
  }, [reply, currentTitle]);

  const getMessage = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        messages: input,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      console.log(input);
      const response = await fetch(
        "http://localhost:8000/completions",
        options
      );
      const data = await response.json();
      const chatGPTreply = data.choices[0].message.content;
      setReply(chatGPTreply);

      // setInput("");
      console.log(chatGPTreply);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickHistory = (value) => {
    setCurrentTitle(value);
  };

  console.log(previousChats, historyTitles, currentTitle);

  return (
    <div className="app">
      <section className="sidebar">
        <button
          onClick={() => {
            setCurrentTitle("");
          }}
        >
          + New Chat
        </button>
        <ul className="history">
          {historyTitles?.map((e, idx) => {
            return (
              <div
                key={idx}
                className="historyList"
                onClick={() => handleClickHistory(e)}
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <li> {e} </li>
              </div>
            );
          })}
        </ul>
        <nav>
          <p>LINGLI OU</p>
          <button>Switch Color</button>
        </nav>
      </section>
      <section className="main">
        <h1>chatGPT clone</h1>
        <div className="feed">
          {previousChats?.map((e, idx) => {
            if (e.title === currentTitle) {
              return (
                <ChatContainer
                  key={idx}
                  user={e.user}
                  assistant={e.assistant}
                  IsLastOne={idx === previousChats.length - 1}
                ></ChatContainer>
              );
            }
          })}
        </div>

        <div className="bottomSection">
          <div className="input-container">
            <input
              placeholder="Send a message"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  getMessage();
                }
              }}
            />
            <div id="submit" onClick={getMessage}>
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </div>
          </div>
          <p className="info">
            A project using React as front end library, nodeJS as backend
            server, CSS file compelety created by chatGPT, intergrat openAI API
            to clone a chatGPT
          </p>
        </div>
      </section>
    </div>
  );
};

export default App;
