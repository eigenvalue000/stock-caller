const router = require("express").Router();
const globalRoutes = require("./globalRoutes");

router.use("/", globalRoutes);

module.exports = router;