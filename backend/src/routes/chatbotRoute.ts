import { Router } from "express";
import { handleChatbot } from "../controllers/chatbotController";

const router = Router();
router.post("/", handleChatbot);
export default router;