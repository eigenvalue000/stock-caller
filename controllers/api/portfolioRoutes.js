const router = require('express').Router();
const { Portfolio } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newPortfolio = await Portfolio.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPortfolio);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const portfolioData = await Portfolio.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!portfolioData) {
      res.status(404).json({ message: 'No portfolio found with this id!' });
      return;
    }

    res.status(200).json(portfolioData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
