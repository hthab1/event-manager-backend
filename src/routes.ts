import { Router } from "express";
import {
  getAllEvents,
  createEvent,
  deleteEvent,
  updateEvent,
  getEvent,
} from "./controllers";

const router: Router = Router();

router.get("/", getAllEvents);
router.get("/:id", getEvent);
router.post("/", createEvent);
router.delete("/:id", deleteEvent);
router.put("/:id", updateEvent);

export default router;
