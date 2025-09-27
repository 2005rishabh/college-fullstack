const express = require("express");
const router = express.Router();
const recordsController = require("../controllers/recordsController");
const rbacMiddleware = require("../middleware/rbacMiddleware");

router.get(
  "/",
  rbacMiddleware.checkPermission("read_record"),
  recordsController.getAllRecords
);
router.post(
  "/",
  rbacMiddleware.checkPermission("create_record"),
  recordsController.createRecord
);
router.put(
  "/:id",
  rbacMiddleware.checkPermission("update_record"),
  recordsController.updateRecord
);
router.delete(
  "/:id",
  rbacMiddleware.checkPermission("delete_record"),
  recordsController.deleteRecord
);

module.exports = router;
