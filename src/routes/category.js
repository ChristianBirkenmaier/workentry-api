const express = require("express");
const router = express.Router();
const { Category } = require("../models");

// define the home page route
router.get("/", async (req, res) => {
    try {
        // res.send("Category get all");
        const categories = await Category.find();
        res.json({ ok: true, data: categories });
    } catch (err) {
        console.error(err);
        res.json({ ok: false, error: err });
    }
    // Alle Zeiteinträge zurückgeben
});
// define the about route
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        // res.send("Category get all");
        const category = await Category.find(id);
        res.json({ ok: true, data: category });
    } catch (err) {
        console.error(err);
        res.json({ ok: false, error: err });
    }
    // Zeiteintrag mit bestimmter id zurückgeben
});

router.post("/", async (req, res) => {
    // Neuen Zeiteintrag erstellen
    try {
        const { categoryName } = req.body;
        const newCategory = await Category.create({
            categoryName,
        });
        res.json({
            ok: true,
            data: newCategory,
        });
    } catch (err) {
        console.error("Error: ", err);
        res.json({ ok: false, error: err });
    }
});

router.put("/:id", (req, res) => {
    // Vorhandenen Zeiteintrag aktualisieren
});

router.delete("/:id", () => {
    // Vorhandenen Zeiteintrag löschen
});

module.exports = router;
