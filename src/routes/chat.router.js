import { Router } from "express";
import messagesManager from "../dao/manager/MessagesManager.js";

const router = Router();

const chatMessagesRouter = (socketServer) => {
  socketServer.on("connection", async (socket) => {
    console.log(`New connection: ${socket.id}`);

    // Bring chat history on connection
    try {
      const history = await messagesManager.getMessages();
      // Send history
      socket.emit("history", history);
    } catch (error) {
      console.error(`Error al conseguir mensajes: ${error}`);
    }

    // Send message
    socket.on("message", async (msg) => {
      try {
        const newMessage = await messagesManager.addMessage(msg);
        // Send last message
        socketServer.emit("currentMessage", newMessage);
      } catch (error) {
        console.error(`Error al conseguir mensajes: ${error}`);
      }
    });
  });

  router.get("/", async (req, res) => {
    res.status(200).render("chat", {
      script: "chat",
      style: "chat",
      title: "coder chat",
    });
  });

  return router;
};

export default chatMessagesRouter;
