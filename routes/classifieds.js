const express = require('express');
const router = express.Router();
const Classified = require('../models/Classified');

// POST
router.post('/', async (req, res) => {
  try {
    const classified = new Classified(req.body);
    await classified.save();
    res.status(201).json(classified);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET
router.get('/', async (req, res) => {
  try {
    const classifieds = await Classified.find();
    res.status(200).json(classifieds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deletedClassified = await Classified.findByIdAndDelete(req.params.id);
    if (!deletedClassified) throw new Error('Classified not found');
    res.status(200).json(deletedClassified);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
    try {
      const { category, sortBy, search, page, limit } = req.query;
  
      const filters = {};
      if (category) filters.category = category;
      if (search) filters.name = { $regex: search, $options: 'i' };
  
      const sortOptions = {};
      if (sortBy === 'date') sortOptions.postedAt = -1;
  
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const classifieds = await Classified.find(filters)
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit));
  
      res.status(200).json(classifieds);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
