const router = require("express").Router();
const appointmentsController = require("../../controllers/appointmentsController");

// Matches with "/api/books"
router.route("/")
  .get(appointmentsController.findAll)
  .post(appointmentsController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(appointmentsController.findById)
  .put(appointmentsController.update)
  .delete(appointmentsController.remove);

module.exports = router;
