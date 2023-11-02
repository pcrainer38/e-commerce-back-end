const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
 try{
  const categoryData = await Category.findAll({
    include:[{model: Product}]
  })
    res.json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!categoryData) {
      res.status(400).json({ message: 'No category found with that id!'});
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  const updatedCategory = await Category.update(
    {
      id: req.body.id,
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    });
  res.json(updatedCategory);
});

router.delete('/:id', async (req, res) => {
  const deletedCategory = await Category.destroy({
    where: {
      id: req.params.id
    }
  });
  res.json(deletedCategory);
});

module.exports = router;
