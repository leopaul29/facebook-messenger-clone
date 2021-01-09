import React, { forwardRef } from "react";
import DateFormat from "dateformat";
import Card from "@material-ui/core/Card";
import Tooltip from "@material-ui/core/Tooltip";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./Message.css";

const Message = forwardRef(({ message, username }, ref) => {
  const isUser = username === message.username;
  /*let timestamp = message.timestamp;
  if (timestamp == null) {
    timestamp = firebase.firestore.Timestamp.fromDate(new Date());
  }
  const dateMessage = timestamp.toDate();
  const formatedDate = DateFormat(
    dateMessage,
    "dddd, mmmm dS, yyyy, h:MM:ss TT"
  );*/

  return (
    <div ref={ref} className={`messages ${isUser && "messages__user"}`}>
      <div className="username">
        {!isUser && `${message.username || "Unknown User"}`}
      </div>
      <Card className={isUser ? "messages__userCard" : "messages__guestCard"}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
