import express from "express";
import createUser from "../Controllers/createUser.js"
import getUser from "../Controllers/getUser.js";
import { verifyToken } from "../utils/verifyToken.js";
import createNote from "../Controllers/createNote.js";
import updateNote from "../Controllers/updateNote.js";
import getAllNotes from "../Controllers/getAllNotes.js";
import deleteNote from "../Controllers/deleteNote.js";
import updateIsPinned from "../Controllers/updateIsPinned.js";
import signOut from "../Controllers/signOut.js";
import searchNotes from "../Controllers/searchNotes.js";
const router = express.Router();

router.post("/signup", createUser);
router.post('/signin', getUser)
router.get("/signout", verifyToken, signOut);

router.post("/add", verifyToken, createNote);
router.put("/edit/:noteId", verifyToken, updateNote);
router.get("/all-notes", verifyToken, getAllNotes);
router.delete("/delete/:noteId", verifyToken, deleteNote);
router.put("/notePin/:noteId", verifyToken, updateIsPinned);

router.get("/search", verifyToken, searchNotes);

export default router;