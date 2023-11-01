const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

const Tag = require('../../models/Tag');

router.get('/', async (req, res) => {
   // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll();
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!'});
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  const createdTag = await Tag.create({
    id: req.body.id,
    tag_name: req.body.tag_name
  })
  res.json(createdTag);
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const updatedTag = await Tag.update(
    {
      id: req.body.id,
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id,
      },
    });
  res.json(updatedTag);
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const deletedTag = await Tag.destroy({
    where: {
      id: req.params.id
    }
  });
  res.json(deletedTag);
});

module.exports = router;
