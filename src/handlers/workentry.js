const { Workentry } = require("../models");

async function getAll() {
    console.log("handlers/get");
    try {
        const workentries = await Workentry.find()
            .populate("category")
            .populate("project");
        return { ok: true, data: workentries };
    } catch (err) {
        console.error("Error: ", err);
        return { ok: false, error: err };
    }
}

async function get(limit = 0, skip = 0, filter = {}) {
    // return await Workentry.aggregate([
    //     { $match: {} },
    //     { $skip: skip },
    //     { $limit: limit },
    // ]);
    try {
        const workentries = await Workentry.find(filter)
            .skip(skip)
            .limit(limit)
            .populate("category")
            .populate("project");
        return { ok: true, data: workentries };
    } catch (err) {
        console.error("error", err);
        return { ok: false, error: err };
    }
}

module.exports = {
    get,
    getAll,
};
