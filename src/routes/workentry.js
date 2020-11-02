const express = require("express");
const router = express.Router();
const { Workentry } = require("../models");
const mongoose = require("mongoose");

// define the home page route
router.get("/", async (req, res) => {
    console.log("/");
    try {
        const workentries = await Workentry.find().populate(
            "categoryName",
            "projectName"
        );
        res.json({ ok: true, data: workentries });
    } catch (err) {
        console.error("Error: ", err);
        res.json({ ok: false, error: err });
    }
    // Alle Zeiteinträge zurückgeben
});
// define the about route
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // Zeiteintrag mit bestimmter id zurückgeben
        const workentry = await Workentry.find(id).populate(
            "projectName",
            "categoryName"
        );
        return res.json({ ok: true, data: workentry });
    } catch (err) {
        console.error("Error: ", err);
        res.json({ ok: false, error: err });
    }
});

router.post("/", async (req, res) => {
    try {
        const {
            projectName,
            categoryName,
            fromDate,
            untilDate,
            optionalText,
        } = req.body;
        const newWorkentry = await Workentry.create({
            projectName: mongoose.Types.ObjectId(projectName),
            categoryName: mongoose.Types.ObjectId(categoryName),
            fromDate,
            untilDate,
            optionalText,
        });
        console.log(req.body);
        res.json({
            ok: true,
            data: newWorkentry,
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
