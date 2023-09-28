import messagesModel from "../models/messages.model.js";

class MessagesManager {
  getMessages = async () => {
    try {
      const messages = await messagesModel.find().lean().exec();
      return messages;
    } catch (error) {
      console.error(`Error trying to get messages: ${error}`);
    };
  };

  addMessage = async (msg) => {
    try {
      const user = msg.user.trim();
      const message = msg.text.trim();
      if(user.length < 1 || message.length < 1) return;
      const formattedMessage = {
        user: user,
        message: message
      };  
      const newMessage = new messagesModel(formattedMessage);
      await newMessage.save();
      return newMessage;
    } catch (error) {
      console.error(`Error al enviar mensaje: ${error}`);
    };
  };
};

const messagesManager = new MessagesManager();

export default messagesManager;