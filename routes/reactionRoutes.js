const router = require('express').Router();
const {
  getReactions,
  getSingleReaction,
  createReaction,
  updateReaction,
  deleteReaction
} = require('../controllers/reactionController');

// /api/Reactions
// Get all Reactions
router.route('/').get(getReactions);

// /api/Reactions/:ReactionId
// Get single Reaction
router.route('/:reactionId').get(getSingleReaction);

// /api/Reactions/
// Create Reaction
router.route('/').post(createReaction);

// /api/Reactions/:ReactionId
// Update Reaction
router.route('/:reactionId').put(updateReaction);

// /api/Reactions/:ReactionId
// Delete Reaction
router.route('/:reactionId').delete(deleteReaction);


module.exports = router;