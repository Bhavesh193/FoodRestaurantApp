const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

router.post("/orders", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    if (!req.body.amount || req.body.amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const options = {
      amount: req.body.amount * 100, // Rs 100 => 100 paisa * 100   => Rs. 100.00
      currency: "INR",
      // reciept: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, orders) => {
      // console.log("orders", orders);

      if (error) {
        console.error("Razorpay Order Creation Error:", error);
        return res.status(500).json({ message: "Something went wrong" });
      }
      res.status(200).json({ data: orders });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server Error!" });
    console.log(error);
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    // console.log(
    //   "razorpay_order_id, razorpay_payment_id, razorpay_signature",
    //   razorpay_order_id,
    //   razorpay_payment_id,
    //   razorpay_signature
    // );

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    // console.log("razorpay_signature", razorpay_signature);
    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: "Payment Verified " });
    } else {
      return res.status(400).json({ message: "Payment Failed " });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server Error!" });
    console.log(error);
  }
});

module.exports = router;
