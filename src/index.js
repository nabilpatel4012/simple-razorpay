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

app.get("/", (req, res) => {
  return res.json({ msg: "hello world!" });
});

app.use(express.json());

app.post("/razorpay", async (req, res) => {
  const billInfo = await fetchAndViewBillInfo(req.body.acctId);
  const amount = parseInt(billInfo.amtDue * 100);
  console.log(amount);
  const receipt = billInfo.billId;
  console.log(receipt);
  if (!amount && !receipt) {
    return res.json({ error: "Error creating response" });
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
      console.log(order);
      client.rpush(RedisDB.redisQueue, JSON.stringify(order));
      return res.json(order);
    }
  );
});

app.listen("3000", () => {
  console.log("Listening on port 3000");
});
