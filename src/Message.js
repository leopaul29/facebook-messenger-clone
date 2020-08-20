import React, { forwardRef } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./Message.css";

const Message = forwardRef(({ message, username }, ref) => {
    const isUser = username === message.username;

    return (
        <div ref={ref} className={`messages ${isUser && "messages__user"}`}>
            <Card
                className={
                    isUser ? "messages__userCard" : "messages__guestCard"
                }
            >
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {!isUser && `${message.username || 'Unknown User'}: `} {message.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
});

export default Message;
