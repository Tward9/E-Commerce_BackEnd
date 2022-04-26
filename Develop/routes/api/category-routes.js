const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoyData = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(categoyData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoyData = await Category.findAll({
      include: [{ model: Product}],
    });

    if (!categoyData) {
      res.status(404).json({ message: "No category found with that id" });
      return;
    }
    res.status(200).json(categoyData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoyData = await Category.create(req.body);
    res.status(200).json(categoyData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoyData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoyData) {
      res.status(404).json({ message: 'No category found with that id!' });
    }
    res.status(200).json(categoyData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoyData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoyData) {
      res.status(404).json({ message: 'No category found with that id!' });
    };
    res.status(200).json({message: `Category with id of ${req.params.id} has been deleted.`})
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
