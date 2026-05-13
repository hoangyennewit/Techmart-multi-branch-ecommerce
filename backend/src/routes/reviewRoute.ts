import { Router } from "express";
import { ReviewController } from "../controllers/reviewController";

const router = Router();
const reviewController = new ReviewController();

// Create review (auth required inside or handled by controller if we want)
router.post("/:id/reviews", reviewController.addReview);

// Get reviews for a product
router.get("/:id/reviews", reviewController.getReviewsByProduct);

export default router;
