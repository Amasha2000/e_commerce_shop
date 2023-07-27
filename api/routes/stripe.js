const router = require('express').Router();
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51NTgKRAaWvD0FBmzl9dsg599BL84p9JP1kfTV5N587khJsEoiXkSOKSvVOOxL2BpDiQkRTcFj8Vny5la8KjcbDZ300ziceAfYb');

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;