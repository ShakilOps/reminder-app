const router = require("express").Router();
const reminder = require("../controllers/reminder");

router.get("/getAllReminder", reminder.getAllReminder);

router.post("/addReminder", reminder.addReminder);

router.post("/deleteReminder", reminder.deleteReminder);

module.exports = router;
