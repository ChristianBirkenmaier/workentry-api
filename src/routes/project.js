const express = require("express");
const router = express.Router();
const { Project } = require("../models");

// define the home page route
router.get("/", async (req, res) => {
    try {
        // res.send("Category get all");
        const projects = await Project.find();
        res.json({ ok: true, data: projects });
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
        const project = await Project.find(id);
        res.json({ ok: true, data: project });
    } catch (err) {
        console.error(err);
        res.json({ ok: false, error: err });
    }
    // Zeiteintrag mit bestimmter id zurückgeben
});

router.post("/", async (req, res) => {
    // Neuen Zeiteintrag erstellen
    try {
        const { projectName } = req.body;
        const newProject = await Project.create({
            projectName,
        });
        res.json({
            ok: true,
            data: newProject,
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
