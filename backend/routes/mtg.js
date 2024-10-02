const router = require("express").Router();
const mtgController = require("../controllers/mtgController");

router.post("/wantGenerator", mtgController.wantGenerator);
router.get("/getCard/:cardName", mtgController.getCard);
router.post("/store", mtgController.getPricesFromStores);

module.exports = router;
