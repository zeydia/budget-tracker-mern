const Transaction = require('../models/Transaction');

//GET /api /stats /categories - Statistiques par categorie
const getCategoryStats = async (req, res) => {
  try {
    const stats = await Transaction.aggregate([
      //1. Filtrer les transactions de l 'utilisateur connecte
      { $match: { user: req.user._id, type: 'expense' } },
      //2. Grouper par categorie et calculer totaux
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
          avgAmount: { $avg: '$amount' }
        }
      },
      //3. Joindre avec les details des categories
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'category'
        }
      },
      //4. Restructurer le resultat
      {
        $project: {
          categoryName: { $arrayElemAt: ['$category.name', 0] },
          categoryColor: { $arrayElemAt: ['$category.color', 0] },
          total: 1,
          count: 1,
          avgAmount: { $round: ['$avgAmount', 2] }
        }
      },
      //5. Trier par montant decroissant
      { $sort: { total: -1 } }
    ]);
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getCategoryStats };