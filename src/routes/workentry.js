const express = require("express");
const router = express.Router();
const { Workentry } = require("../models");

// define the home page route
router.get("/", async (req, res) => {
    console.log("/");
    try {
        const workentries = await Workentry.find();
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
        const workentry = await Workentry.find({ id });
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
            comment,
        } = req.body;
        const newWorkentry = await Workentry.create({
            projectName,
            categoryName,
            fromDate,
            untilDate,
            comment,
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
