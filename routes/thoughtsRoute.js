const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../controllers/thoughtController');

// /api/Thoughts
// Get all Thoughts
router.route('/').get(getThoughts);

// /api/Thoughts/:ThoughtId
// Get single Thought
router.route('/:thoughtId').get(getSingleThought);

// /api/Thoughts/
// Create Thought
router.route('/').post(createThought);

// /api/Thoughts/:ThoughtId
// Update Thought
router.route('/:thoughtId').put(updateThought);

// /api/Thoughts/:ThoughtId
// Delete Thought
router.route('/:thoughtId').delete(deleteThought);

//  /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').put(createReaction);

//  /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').delete(deleteReaction);


module.exports = router;