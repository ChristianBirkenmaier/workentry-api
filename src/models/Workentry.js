const mongoose = require("mongoose");
const { Schema } = mongoose;

const workentrySchema = new Schema({
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    project: { type: Schema.Types.ObjectId, ref: "Project" },
    fromDate: String,
    untilDate: String,
    optionalText: String,
    external: Boolean,
});

module.exports = mongoose.model("Workentry", workentrySchema);
