const router = require("express").Router();
const appointmentRoutes = require("./appointments");

// Book routes
router.use("/appointments", appointmentRoutes);

module.exports = router;
