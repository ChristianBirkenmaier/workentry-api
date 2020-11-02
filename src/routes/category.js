const express = require("express");
const router = express.Router();

// define the home page route
router.get("/", (req, res) => {
    res.send("Category get all");
    // Alle Zeiteinträge zurückgeben
});
// define the about route
router.get("/:id", (req, res) => {
    const { id } = req.params;
    // Zeiteintrag mit bestimmter id zurückgeben
});

router.post("/", (req, res) => {
    // Neuen Zeiteintrag erstellen
});

router.put("/:id", (req, res) => {
    // Vorhandenen Zeiteintrag aktualisieren
});

router.delete("/:id", () => {
    // Vorhandenen Zeiteintrag löschen
});

module.exports = router;
