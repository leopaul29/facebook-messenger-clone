import React, { useState, useEffect } from "react";
import GithubCorner from "react-github-corner";
import DateFormat from "dateformat";
import { Avatar, FormControl, Input } from "@material-ui/core";
import "./App.css";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

function App() {
  // useState = variable in REACT
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [userList, setUserList] = useState([]);

  // useEffect = run code on a condition
  useEffect(() => {
    // if its blank inside [], this code runs ONCE when the app components load
    // if we have a variable like input, it will be firing at every change
    let username = prompt("Please enter your name");
    //let username = "Leo";
    if (username == "") username = "Unknown";
    setUsername(username);
  }, []); // condition

  useEffect(() => {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 2);

    // delete old messages
    db.collection("messages")
      .where("timestamp", "<", yesterday)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });

    // run once when the app component loads
    db.collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            message: doc.data(),
          }))
        );
      });
  }, []);

  function intitializeUserList(message) {
    if (userList.includes(message.username) || message.username === username)
      return;
    const newList = userList.concat(message.username);
    setUserList(newList);
  }

  const sendMessage = (event) => {
    // all the logic to send the message
    event.preventDefault(); // prevent form to refresh the page

    db.collection("messages").add({
      username: username,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      avatar:
        "https://eu.ui-avatars.com/api/?name=" + username.replace(" ", "+"),
    });
    // append Message input to messages array
    /*setMessages([
      ...messages,
      {
        username: username,
        message: input,
      },
    ]);*/

    setTimeout(() => {
      const chat = document.querySelector("#chat");
      chat.scroll({ behavior: "smooth" });
      chat.scrollTop = chat.scrollHeight;
    }, 500);

    setInput("");
  };

  const githubCornerUrl =
    "https://github.com/leopaul29/facebook-messenger-clone";

  return (
    <div className="App">
      <GithubCorner
        href={githubCornerUrl}
        bannerColor="#70B7FD"
        octoColor="#fff"
        size={80}
        direction="right"
        target="_blank"
        rel="noopener noreferrer"
      />
      <div className="container">
        <nav className="nav">
          <img
            className="nav__logo"
            src="Facebook_Messenger_logo_2020.svg"
            alt="messenger logo"
          />

          <div className="nav__header">
            <h1 className="nav__title">Messenger App</h1>
            <h5 className="nav__userlist">
              {username}
              {userList.length != 0 &&
                userList.map((username) => {
                  return ", " + username;
                })}
            </h5>
          </div>
        </nav>

        <div id="chat" className="messageList">
          <FlipMove>
            {messages.map(({ id, message }) => {
              intitializeUserList(message);
              return <Message key={id} username={username} message={message} />;
            })}
          </FlipMove>{" "}
        </div>
        <div className="footer">
          {/* form and button type submit allow the enter to send the message */}
          <form className="app__form">
            <FormControl className="app__formControl">
              {/* set the input value of the state */}
              <Input
                className="app__input"
                placeholder="Enter a message..."
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />

              <IconButton
                className="app__iconButton"
                disabled={!input}
                variant="contained"
                color="primary"
                type="submit"
                onClick={sendMessage}
              >
                <SendIcon />
              </IconButton>
            </FormControl>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
