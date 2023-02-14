const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRoute = require("./routes/admin/auth.js");
const adminProductRoute = require("./routes/admin/products.js");
const productRoute = require("./routes/products.js");
const cartRoute = require("./routes/carts.js");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["hefowgfhdb"],
  })
);
app.use(authRoute);
app.use(adminProductRoute);
app.use(productRoute);
app.use(cartRoute);
// const bodyParser = (req, res, next) => {
//   if (req.method === "POST") {
//     req.on("data", (data) => {
//       const parsed = data.toString("utf8").split("&");
//       let formData = {};
//       for (let pair of parsed) {
//         const [key, value] = pair.split("=");
//         formData[key] = value;
//       }
//       req.body = formData;
//       next();
//     });
//   } else {
//     next();
//   }
// };

app.listen(3000, () => {
  console.log("listening...");
});
