const nodes = [
  {
    id: "1",
    label: "User A",
    performance: "80%",
    role: "Leader",
    children: ["2", "3"],
  },
  {
    id: "2",
    label: "User B",
    performance: "60%",
    role: "Member",
    children: [],
  },
  {
    id: "3",
    label: "User C",
    performance: "75%",
    role: "Member",
    children: ["4"],
  },
  {
    id: "4",
    label: "User D",
    performance: "90%",
    role: "Member",
    children: [],
  },
];

const links = [
  { source: "1", target: "2" },
  { source: "1", target: "3" },
  { source: "3", target: "4" },
];

exports.getNetworkData = (req, res) => {
  try {
    res.json({ nodes, links });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
