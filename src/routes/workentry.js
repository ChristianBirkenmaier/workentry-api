const express = require("express");
const router = express.Router();
const { Workentry } = require("../models");
const mongoose = require("mongoose");

// define the home page route
router.get("/", async (req, res) => {
    console.log("/");
    try {
        const workentries = await Workentry.find()
            .populate("category")
            .populate("project");
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
        const workentry = await Workentry.find(id)
            .populate("category")
            .populate("project");
        return res.json({ ok: true, data: workentry });
    } catch (err) {
        console.error("Error: ", err);
        res.json({ ok: false, error: err });
    }
});

router.post("/", async (req, res) => {
    try {
        const {
            project,
            category,
            fromDate,
            untilDate,
            optionalText,
        } = req.body;
        const newWorkentry = await Workentry.create({
            project: mongoose.Types.ObjectId(project),
            category: mongoose.Types.ObjectId(category),
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

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {
            project,
            category,
            fromDate,
            untilDate,
            optionalText,
        } = req.body;
        const updated = await Workentry.findOneAndUpdate(
            { _id: id },
            {
                project,
                category,
                fromDate,
                untilDate,
                optionalText,
            },
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
        await Workentry.deleteOne({ _id: id });
        res.json({ ok: true });
    } catch (err) {
        console.error(err);
        res.json({ ok: false, error: err });
    }
    // Vorhandenen Zeiteintrag löschen
});

module.exports = router;
