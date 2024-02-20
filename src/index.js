const express = require("express");
const Razorpay = require("razorpay");
const { AccessCreds, RedisDB } = require("./config/config");
const { client } = require("./queue/redis");
const { fetchAndViewBillInfo } = require("./api/c2m-billing");

const app = express();
const razorpay = new Razorpay({
  key_id: AccessCreds.keyId,
  key_secret: AccessCreds.keySecret,
});

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
      amount: amount,
      currency: "USD",
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

app.listen("3000", () => {
  console.log("Listening on port 3000");
});
