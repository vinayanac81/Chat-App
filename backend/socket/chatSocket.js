export const chatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User Connected");
    socket.on("message", (message) => {
      console.log(message);
      io.emit("message", message);
    });
    socket.on("disconnect", () => {
      console.log("User Disconnected");
    });
  });
};
