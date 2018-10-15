const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const Crypto = require("crypto");

const url = "mongodb://yusriyunus_:qwerty97@ds223253.mlab.com:23253/agristore";

var app = express();
var port = 1997;

app.use(cors());
app.use(bodyParser.json());

app.post("/login", (req, res) => {
  var { email, password } = req.body;
  var passwordEncripted = Crypto.createHmac("sha256", "qwerty1234")
    .update(password)
    .digest("hex");

  MongoClient.connect(
    url,
    (err, db) => {
      userCol = db.collection("users");
      userCol
        .find({ $and: [{ email }, { password: passwordEncripted }] })
        .toArray((err1, docs) => {
          if (err1) console.log(err1);

          res.send(docs);
        });
    }
  );
});

app.post("/keeplogin", (req, res) => {
  var { email } = req.body;

  MongoClient.connect(
    url,
    (err, db) => {
      userCol = db.collection("users");
      userCol.find({ email }).toArray((err1, docs) => {
        if (err1) console.log(err1);

        res.send(docs);
      });
    }
  );
});

app.post("/register", (req, res) => {
  var { username, email, password } = req.body;

  MongoClient.connect(
    url,
    (err, db) => {
      userCol = db.collection("users");
      userCol.find({ $or: [{ username }, { email }] }).toArray((err1, docs) => {
        if (err1) console.log(err1);

        if (docs.length > 0) {
          db.close();
          res.send({ err: "Username or Email have already exist!" });
        } else {
          var passwordEncripted = Crypto.createHmac("sha256", "qwerty1234")
            .update(password)
            .digest("hex");

          userCol.insertMany(
            [{ username, email, password: passwordEncripted }],
            (err2, result) => {
              db.close();
              res.send({ err: "", user: result.ops[0] });
            }
          );
        }
      });
    }
  );
});

app.get("/cct", (req, res) => {
  MongoClient.connect(
    url,
    (err, db) => {
      productCol = db.collection("cct");
      productCol.find().toArray((err1, docs) => {
        if (err1) console.log(err1);
        res.send(docs);
      });
    }
  );
});

app.post("/addtocart", (req, res) => {
  var { email, cart } = req.body[0];
  var id;
  if (cart.length === 0) {
    var id = 1;
  } else if (cart.length > 0) {
    var id = cart[cart.length - 1].id + 1;
  }
  var cartOnClick = req.body[1];
  var amount = req.body[2];
  MongoClient.connect(
    url,
    (err, db) => {
      userCol = db.collection("users");
      userCol.update(
        { email },
        {
          $push: {
            cart: {
              ...cartOnClick,
              amount,
              id,
              totalPrice: cartOnClick.price * amount
            }
          }
        }
      );
      userCol.find({ email }).toArray((err, docs) => {
        if (err) console.log(err);
        res.send(docs);
      });
    }
  );
});

app.post("/deletecart", (req, res) => {
  var { email } = req.body[0];
  var { id } = req.body[1];
  MongoClient.connect(
    url,
    (err, db) => {
      userCol = db.collection("users");
      userCol.update({ email }, { $pull: { cart: { id } } });
      userCol.find({ email }).toArray((err, docs) => {
        if (err) console.log(err);
        res.send(docs);
      });
    }
  );
});

app.post("/deleteallcart", (req, res) => {
  var { email } = req.body;
  MongoClient.connect(
    url,
    (err, db) => {
      userCol = db.collection("users");
      userCol.update({ email }, { $set: { cart: [] } });
      userCol.find({ email }).toArray((err, docs) => {
        if (err) console.log(err);
        res.send(docs);
      });
    }
  );
});

app.post("/updatecart", (req, res) => {
  var { email } = req.body[1];
  var { id, amount, price } = req.body[2];
  if (req.body[0]) {
    MongoClient.connect(
      url,
      (err, db) => {
        userCol = db.collection("users");
        userCol.update(
          { email: email, "cart.id": id },
          {
            $set: {
              "cart.$.amount": amount + 1,
              "cart.$.totalPrice": (amount + 1) * price
            }
          }
        );
        userCol.find({ email }).toArray((err, docs) => {
          if (err) console.log(err);
          res.send(docs);
        });
      }
    );
  } else {
    MongoClient.connect(
      url,
      (err, db) => {
        userCol = db.collection("users");
        userCol.update(
          { email: email, "cart.id": id },
          {
            $set: {
              "cart.$.amount": amount - 1,
              "cart.$.totalPrice": (amount - 1) * price
            }
          }
        );
        userCol.find({ email }).toArray((err, docs) => {
          if (err) console.log(err);
          res.send(docs);
        });
      }
    );
  }
});

app.post("/checkout", (req, res) => {
  var { email } = req.body[0];
  var cartOnCheckOut = req.body[1];
  MongoClient.connect(
    url,
    (err, db) => {
      userCol = db.collection("users");
      userCol.update(
        { email },
        {
          $set: {
            cartOnCheckOut
          }
        }
      );
      userCol.find({ email }).toArray((err, docs) => {
        if (err) console.log(err);
        res.send(docs);
      });
    }
  );
});

app.post("/payment", (req, res) => {
  console.log(req.body);
  var { email } = req.body[0];
  var cartOnCheckOutId = req.body[1];
  var usertransaction = req.body[2];
  MongoClient.connect(
    url,
    (err, db) => {
      userCol = db.collection("users");
      transactionCol = db.collection("transaction");
      cartOnCheckOutId.map(id => {
        return userCol.update({ email }, { $pull: { cart: { id } } });
      });
      userCol.update({ email }, { $set: { cartOnCheckOut: [] } });
      transactionCol.insertMany(usertransaction);
      userCol.find({ email }).toArray((err, docs) => {
        if (err) console.log(err);
        res.send(docs);
      });
    }
  );
});

app.listen(port, () => console.log(`API active on port ${port}`));
