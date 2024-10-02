const { createCanvas, loadImage } = require("canvas");
const axios = require("axios");
const Card = require("../models/card");
const Store = require("../models/store");
const CardNaoEncontrado = require("../models/customExceptions");

async function wantGenerator(req, res) {
  try {
    const cards = req.body.list;
    const rows = req.body.rows;
    const showQuantity = req.body.showQuantity;

    const promises = cards.map(async (card) => {
      const response = await axios.get(card.imgUrl, {
        responseType: "arraybuffer",
      });
      const imgBuffer = Buffer.from(response.data, "binary");
      const img = await loadImage(imgBuffer);
      card.img = img;
    });

    // Aguarda todas as promessas terminarem
    await Promise.all(promises);

    const canvas = createCanvas(
      cards.length >= rows ? rows * 250 : cards.length * 250,
      Math.ceil(cards.length / rows) * 350
    );
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let x = 0;
    let y = 0;
    cards.forEach((card) => {
      ctx.drawImage(card.img, x, y, 250, 350);
      if (card.quantity && showQuantity) {
        ctx.font = "bold 100px 'Fira Mono'";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        ctx.strokeText(
          card.quantity,
          x + 125 - 30 * String(card.quantity).length,
          y + 175 + 15
        );
        ctx.fillText(
          card.quantity,
          x + 125 - 30 * String(card.quantity).length,
          y + 175 + 15
        );
      }
      x += 250;
      if (x >= canvas.width) {
        x = 0;
        y += 350;
      }
    });

    const finalImage = canvas.toDataURL();
    res.json({ image: finalImage });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getCard(req, res, next) {
  try {
    const card = await Card.fromName(req.params.cardName);
    if (!card) throw new CardNaoEncontrado();
    await card.data;
    card.data.then(async function (response) {
      if (!response) throw new CardNaoEncontrado();
      res.json({
        name: card.name,
        id: response.id,
        menor: response.cheapest,
        prices: response.prices,
      });
    });
  } catch (e) {
    if (e instanceof CardNaoEncontrado) {
      res.status(404).send(e.message);
    } else {
      throw e;
    }
  }
  next();
}

async function getPricesFromStores(req, res, next) {
  try {
    const storeNames = req.body.stores;
    const cardList = req.body.list;
    console.log(storeNames);
    for (const storeName of storeNames) {
      const store = new Store(storeName);
      const promises = cardList.map(async (cardData) => {
        if (!cardData.stores) cardData.stores = {};
        const menor = await store.grabPrice(cardData);
        cardData.stores[storeName] = menor;
      });
      // Aguarda todas as promessas terminarem
      await Promise.all(promises);
    }

    res.json(cardList);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
  next();
}

module.exports = {
  wantGenerator,
  getCard,
  getPricesFromStores,
};
