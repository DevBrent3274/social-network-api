const router = require('express').Router();
const usersRoutes = require('./usersRoute');
const thoughtsRoutes = require('./thoughtsRoute');
const reactionRoutes = require('./reactionRoutes');


router.use('/api/users', usersRoutes);
router.use('/api/thoughts', thoughtsRoutes);
router.use('/api/reactions', reactionRoutes);

router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;