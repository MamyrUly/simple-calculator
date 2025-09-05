import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const myurl = "/home/husein/teach/backend/calculator/index.html";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// app.use(express.static(dirname));
app.get("/", (req, res) => {
  res.send("главная");
  //   res.redirect("/profile");
});

app.get("/first/about", (req, res) => {
  //   res.send("главная");
  res.redirect("/profile");
});

function middle(req, res, next) {
  console.log(req.url);
  res.json({ method: req.method, url: req.url, headers: req.headers });
}

// app.use("/profile", middle);

app.get("/profile", (req, res) => {
  console.log(dirname, " ", filename);
  res.sendFile(myurl);
});

// app.get(
//   "/profile",
//   (req, res, next) => {
//     console.log(req.method, req.url, "Первый middleware");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Второй middleware");
//     res.send("Профиль пользователя");
//   }
// );

app.post("/hello", (req, res) => {
  const { name } = req.body;
  res.json({ message: `Привет, ${name}!` });
});

app.listen(3001, () => {
  console.log("Сервер запущен на http://localhost:3001");
});

// const http = require("http");
// const server = http.createServer();
// console.log(server);
