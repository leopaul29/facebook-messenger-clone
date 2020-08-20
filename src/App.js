import React, { useState, useEffect } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import "./App.css";
import Message from "./Message";

function App() {
  // useState = variable in REACT
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  // useEffect = run code on a condition
  useEffect(() => {
    setUsername(prompt("Please enter your name"));
    // if its blank inside [], this code runs ONCE when the app components load
    // if we have a variable like input, it will be firing at every change
  }, []); // condition

  console.log(messages);

  const sendMessage = (event) => {
    // all the logic to send the message
    event.preventDefault(); // prevent form to refresh the page
    // append Message input to messages array
    setMessages([...messages, { username: username, text: input }]);
    setInput("");
  };

  return (
    <div className="App">
      <h1>Facebook-Messenger-clone</h1>
      <h2>Welcome {username}</h2>

      <form>
        <FormControl>
          <InputLabel>Enter a message</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            Send message
          </Button>
        </FormControl>
        {/* form and button type submit allow the enter to send the message */}
        {/* set the input value of the state */}
      </form>
      {/* messages themselves */}

      {messages.map((message) => (
        <Message username={message.username} text={message.text} />
      ))}
    </div>
  );
}

export default App;
