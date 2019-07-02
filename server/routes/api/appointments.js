const router = require("express").Router();
const appointmentsController = require("../../controllers/appointmentsController");

// Matches with "/api/books"
router.route("/")
  .get(appointmentsController.findAll)
  .post(appointmentsController.create);
  
router.route("/client")
  .post(appointmentsController.clientCreate);

router.route("/client/date")
  .post(appointmentsController.findByDate);
router
  .route("/:id")
  .get(appointmentsController.findById)
  .put(appointmentsController.update)
  .delete(appointmentsController.remove);

module.exports = router;
