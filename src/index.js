require("dotenv/config");
const express = require("express");
const cors = require("cors");
const { join, dirname } = require("path");
// const { sequelize } = require("./models"); // uncomment to use sequelize default utility
const { env } = require("./config");
const {
  userRouter,
  titikRouter,
  publikRouter,
  permohonanRouter,
  beritaRouter,
  informasiRouter,
  galeriRouter,
} = require("./routers");

const PORT = process.env.PORT || 7000;
const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const whitelist = process.env.WHITELISTED_DOMAIN
        ? process.env.WHITELISTED_DOMAIN.split(",").map((d) => d.trim())
        : [];

      // Allow if origin is in whitelist or no origin (e.g., Postman)
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", express.static(`${__dirname}/public`));
// app.use("/obat", express.static(`${__dirname}/public/obat`));

//#region API ROUTES

// ===========================
// NOTE : Add your routes here
// sequelize.sync({ alter: true });

app.use("/api/user", userRouter);
app.use("/api/titik", titikRouter);
app.use("/api/publik", publikRouter);
app.use("/api/permohonan", permohonanRouter);
app.use("/api/berita", beritaRouter);
app.use("/api/informasi", informasiRouter);
app.use("/api/galeri", galeriRouter);
app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, guys !",
  });
});

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
// const clientPath = "../../client/build";
// app.use(express.static(join(__dirname, clientPath)));

// // Serve the HTML page
// app.get("*", (req, res) => {
//   res.sendFile(join(__dirname, clientPath, "index.html"), (err) => {
//     if (err) {
//       console.error("Error sending index.html:", err);
//       res.status(err.status).end();
//     }
//   });
// });

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
