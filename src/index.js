const express = require("express");
const app = express();
require("dotenv").config();
const { WorkentryRoutes, CategoryRoutes, ProjectRoutes } = require("./routes");
const { db, message } = require("./db")();

app.use(express.json());

app.use("/api/v1/workentry", WorkentryRoutes);
app.use("/api/v1/category", CategoryRoutes);
app.use("/api/v1/project", ProjectRoutes);

app.listen(process.env.PORT, () => {
    console.log("Workentry-API listening on PORT ", process.env.PORT);
});
