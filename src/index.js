const express = require("express");
const Razorpay = require("razorpay");
const { AccessCreds, RedisDB } = require("./config/config");
const { client } = require("./queue/redis");
const { fetchAndViewBillInfo } = require("./api/c2m-billing");
const cors = require("cors");
const { verifyPayment } = require("./workers/payment/verification");

const app = express();
const razorpay = new Razorpay({
  key_id: AccessCreds.keyId,
  key_secret: AccessCreds.keySecret,
});

app.use(cors({ origin: "*" }));
app.use(express.json());

app.post("/razorpay", async (req, res) => {
  const billInfo = await fetchAndViewBillInfo(req.body.acctId);
  const amount = parseInt(billInfo.amtDue * 100);
  const receipt = billInfo.billId;
  if (!amount && !receipt) {
    return res.status(500).json("Error Creating Order");
  }
  razorpay.orders.create(
    {
      payment_capture: true,
      amount: amount,
      currency: "INR",
      receipt: receipt,
    },
    (err, order) => {
      if (err) {
        console.log("Error: ", err);
      }
      console.log("Order Created at: ", Date(Date.now()).toLocaleString());
      client.rpush(RedisDB.redisQueue, JSON.stringify(order));
      return res.json(order).status(200);
    }
  );
});

app.post("/verify", async (req, res) => {
  const razorpay_payment_id = req.body.razorpay_payment_id;
  const razorpay_order_id = req.body.razorpay_order_id;
  const razorpay_signature = req.body.razorpay_signature;

  try {
    const generatedSignature = verifyPayment(
      razorpay_order_id,
      razorpay_payment_id
    );
    if (generatedSignature === razorpay_signature) {
      // Payment verified
      res
        .status(200)
        .json({ status: "success", message: "Payment verified successfully" });
      console.log(`Payment verified successfully @ ${Date.now()}`);
    } else {
      // Signature mismatch, payment not verified
      res
        .status(400)
        .json({ status: "error", message: "Payment verification failed" });
      console.log(`Payment verification failed @ ${Date.now()}`);
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

app.listen("3000", () => {
  console.log("Listening on port 3000");
});
