const router = require('express').Router(),
  mongoose = require('mongoose'),
  Entry = require('../../db/models/entry');

// ***********************************************//
// Create a entry
// ***********************************************//
router.post('/api/entries', async (req, res) => {
  const { content, title, comments, isPublic } = req.body;
  try {
    const entry = new Entry({
      content,
      title,
      comments,
      isPublic,
      authorName: req.user.name,
      owner: req.user._id
    });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

// ***********************************************//
// Fetch a entry by id
// ***********************************************//
router.get('/api/entries/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(400).json({ error: 'not a valid entry id' });
    const entry = await Entry.findOne({ _id, owner: req.user._id });
    if (!entry) return res.sendStatus(404);
    res.json(entry);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

// ***********************************************//
// Get all entries
// /entries?isPublic=true
// /entries?limit=10&skip=10
// /entries?sortBy=createdAt:asc
// /entries?sortBy=dueDate:desc
// ***********************************************//
router.get('/api/entries', async (req, res) => {
  try {
    const match = {},
      sort = {};

    if (req.query.isPublic) {
      match.isPublic = req.query.isPublic === 'true';
    }
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(':');
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }
    await req.user
      .populate({
        path: 'entries',
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort
        }
      })
      .execPopulate();
    res.json(req.user.entries);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

// ***********************************************//
// Delete a entry
// ***********************************************//
router.delete('/api/entries/:id', async (req, res) => {
  try {
    const entry = await Entry.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!entry) throw new Error('entry not found');
    res.json(entry);
  } catch (error) {
    res.status(404).json({ error: error.toString() });
  }
});

// ***********************************************//
// Update an entry by id
// ***********************************************//
router.patch('/api/entries/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['title', 'content', 'isPublic', 'comments'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(400).send({ error: 'Invalid updates!' });
  try {
    const entry = await Entry.findOne({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!entry) return res.status(404).json({ error: 'entry not found' });
    updates.forEach((update) => (entry[update] = req.body[update]));
    await entry.save();
    res.json(entry);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
});

module.exports = router;
