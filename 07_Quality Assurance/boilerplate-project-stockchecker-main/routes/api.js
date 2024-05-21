'use strict';

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const mongoose = require('mongoose');
const crypto = require('crypto');
const CONNECTION_STRING = process.env.MONGODB_URI;

mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('connected to db')
});

const stockSchema = new mongoose.Schema({
  stock: { type: String, required: true },
  likes: { type: [String], default: [] }
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = function (app) {
  app.route('/api/stock-prices')
    .get(async (req, res) => {
      const { stock, like } = req.query;
      const stocks = Array.isArray(stock) ? stock : [stock];

      try {
        const stockData = await Promise.all(stocks.map(async (symbol) => {
          const response = await fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${symbol}/quote`);
          const data = await response.json();
          const stockInfo = {
            stock: symbol.toUpperCase(),
            price: data.latestPrice
          };

          if (like === 'true') {
            const ip = req.ip;
            const hash = crypto.createHash('sha1').update(ip).digest('hex');
            await Stock.updateOne(
              { stock: symbol.toUpperCase() },
              { $addToSet: { likes: hash } },
              { upsert: true }
            );
          }

          const record = await Stock.findOne({ stock: symbol.toUpperCase() });
          stockInfo.likes = record ? record.likes.length : 0;

          return stockInfo;
        }));

        if (stocks.length === 1) {
          res.json({ stockData: stockData[0] });
        } else {
          const [stock1, stock2] = stockData;
          res.json({
            stockData: [
              { ...stock1, rel_likes: stock1.likes - stock2.likes },
              { ...stock2, rel_likes: stock2.likes - stock1.likes }
            ]
          });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
};
