const express = require("express");
const { createOrdersTable } = require("./db_connection");
const Razorpay = require("razorpay");
const { AccessCreds } = require("./config");

const app = express();
const razorpay = new Razorpay({
  key_id: AccessCreds.keyId,
  key_secret: AccessCreds.keySecret,
});

createOrdersTable();

app.get("/", (req, res) => {
  return res.json({ msg: "hello world!" });
});

app.use(express.json());

app.post("/razorpay", (req, res) => {
  if (req.body.order === "new") {
    razorpay.orders.create(
      {
        amount: req.body.amount,
        currency: req.body.currency,
        receipt: req.body.receipt,
      },
      function (err, order) {
        console.log(order);
        return res.json(order);
      }
    );
  } else {
    return res.json({ error: "unexpected error occured" });
  }
});

app.listen("3000", () => {
  console.log("Listening on port 3000");
});
