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
        const { category } = req.body;
        const newCategory = await Category.create({
            category,
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

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { category } = req.body;
        const updated = await Category.findOneAndUpdate(
            { _id: id },
            { category },
            { new: true }
        );
        res.json({ ok: true, data: updated });
    } catch (err) {
        console.error(err);
        res.json({ ok: false, error: err });
    }
    // Vorhandenen Zeiteintrag aktualisieren
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Category.deleteOne({ _id: id });
        res.json({ ok: true });
    } catch (err) {
        console.error(err);
        res.json({ ok: false, error: err });
    }
    // Vorhandenen Zeiteintrag löschen
});

module.exports = router;
