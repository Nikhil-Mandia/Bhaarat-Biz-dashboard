exports.handleMessage = (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }

  req.io.emit("message", message);

  res.status(200).json({ message: "Message sent" });
};
