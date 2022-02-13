import React, { forwardRef } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Avatar } from "@material-ui/core";
import "./Message.css";

const Message = forwardRef(({ message, username }, ref) => {
  const isUser = username === message.username;

  return (
    <div ref={ref} className={`messages ${isUser && "messages__user"}`}>
      {!isUser && (
        <div className="messages_avatar">
          <Avatar src={message.avatar} />
        </div>
      )}
      <div className="messages_text">
        {!isUser && (
          <div className="username">
            {`${message.username || "Unknown User"}`}
          </div>
        )}
        <Card className={isUser ? "messages__userCard" : "messages__guestCard"}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {message.message}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
});

export default Message;
