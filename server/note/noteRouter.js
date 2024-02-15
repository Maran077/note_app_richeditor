const catchAndAsync = require("../middlewere/catchAndAsync.js");
const cookieVerify = require("../middlewere/cookie.js");
const ErrorHandler = require("../middlewere/errorHandler.js");
const NoteModel = require("../mongodb/notesSchema.js");

const router = require("express").Router();

router.post(
  "/note",
  cookieVerify,
  catchAndAsync(async (req, res, next) => {
    const { note } = req.body;
    const { userId } = req.user;
    await NoteModel.create({
      note,
      userId,
    });
    res
      .status(200)
      .json({ success: true, message: "Note successfully created" });
  })
);

router.get(
  "/note",
  cookieVerify,
  catchAndAsync(async (req, res, next) => {
    const { userId } = req.user;
    const notes = await NoteModel.find({ userId });
    res.status(200).json({ success: true, notes });
  })
);

router.get(
  "/note/single",
  cookieVerify,
  catchAndAsync(async (req, res, next) => {
    const { id } = req.query;
    const { userId } = req.user;
    const notes = await NoteModel.findById(id);
    if (notes.userId !== userId)
      return next(new ErrorHandler("You can only access your note only", 401));
    res.status(200).json({ success: true, note: notes.note });
  })
);

router.put(
  "/note",
  cookieVerify,
  catchAndAsync(async (req, res, next) => {
    const { note } = req.body;
    const { id } = req.query;
    const { userId } = req.user;
    const notes = await NoteModel.findByIdAndUpdate(id, { note });
    if (notes.userId !== userId)
      return next(new ErrorHandler("You can only access your note only", 401));
    res.status(200).json({
      success: true,
      message: "Note successfully updated",
      updateNote: note,
    });
  })
);

module.exports = router;
