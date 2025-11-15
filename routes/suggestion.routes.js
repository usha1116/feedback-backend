import express from 'express';
import {
  getAllSuggestions,
  createSuggestion,
  upvoteSuggestion,
  downvoteSuggestion
} from '../controllers/suggestion.controller.js';

const router = express.Router();

router.get('/', getAllSuggestions);
router.post('/', createSuggestion);
router.post('/:id/upvote', upvoteSuggestion);
router.post('/:id/downvote', downvoteSuggestion);

export default router;

