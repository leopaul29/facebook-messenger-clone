import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./Message.css";

function Message({ message, username }) {
  const isUser = username === message.username;

  return (
    <div className={`messages ${isUser && "messages__user"}`}>
      <Card className={isUser ? "messages__userCard" : "messages__guestCard"}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {message.username}: {message.text}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Message;
