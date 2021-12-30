const router = require('express').Router();
const { createNewNote, validateNote, deleteById } = require('../../lib/notes');
const { notesArray } = require('../../db/db.json');

router.get('/notes', (req, res) => {
    res.json(notesArray);
});

router.post('/notes', (req, res) => {
    req.body.id = notesArray.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted!');
    } else {
        const note = createNewNote(req.body, notesArray);
        res.json(note);
    }
});

router.delete('/notes/:id', (req, res) => {
    deleteById(req.params.id, notesArray);
});

module.exports = router;