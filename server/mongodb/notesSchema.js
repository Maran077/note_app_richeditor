const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  note: {
    type: String,
    required: [true, "No notes? That's cool, but a little note won't hurt."],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: Number,
    ref: "User",
    required: [true, "Every note needs a creator! Provide a user ID."],
  },
});

const NoteModel = mongoose.model("Note", noteSchema);

module.exports = NoteModel;
