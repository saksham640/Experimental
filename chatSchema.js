const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    from:{
        type: String,
        required: true,
    },
    to:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        maxlength: 500,
    },
    created_at:{
        type: Date,
        required: true,
    },
});

const Chat = mongoose.model("Chat", ChatSchema);


module.exports = Chat;
