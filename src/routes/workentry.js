const express = require("express");
const router = express.Router();
const { Workentry } = require("../models");
const mongoose = require("mongoose");
const {
    workentryHandlers: { get, getAll },
} = require("../handlers");
const { query } = require("express");

// define the home page route
router.get("/", async (req, res) => {
    let { limit, skip, ...filter } = req.query;

    const result = await get(limit, skip, filter);
    if (result.ok) {
        return res.json(result);
    } else {
        return res.status(500).json(result);
    }
});
// define the about route
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // Zeiteintrag mit bestimmter id zurückgeben
        const workentry = await Workentry.findOne(id)
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
            project = null,
            category = null,
            fromDate = "",
            untilDate = "",
            optionalText = "",
            external = null,
            date = "",
            start = "",
            end = "",
        } = req.body;
        const newWorkentry = await Workentry.create({
            project: mongoose.Types.ObjectId(project),
            category: mongoose.Types.ObjectId(category),
            fromDate: fromDate,
            untilDate: untilDate,
            optionalText: optionalText,
            external: external,
            date,
            start,
            end,
        });
        const resp = await Workentry.find(newWorkentry._id)
            .populate("category")
            .populate("project");
        res.json({
            ok: true,
            data: resp,
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
            project = null,
            category = null,
            fromDate = "",
            untilDate = "",
            optionalText = "",
            external = null,
            date = "",
            start = "",
            end = "",
        } = req.body;
        let updated = await Workentry.findOneAndUpdate(
            { _id: id },
            {
                project,
                category,
                fromDate,
                untilDate,
                optionalText,
                external,
                date,
                start,
                end,
            },
            { new: true }
        );
        const resp = await Workentry.find(updated._id)
            .populate("category")
            .populate("project");
        res.json({ ok: true, data: resp });
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
