// import express from "express";
// import cors from "cors";

// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("работает \n");
// });

// app.post("/calculate", (req, res) => {
//   const { num1, num2, operator } = req.body;

//   if (
//     typeof num1 !== "number" ||
//     typeof num2 !== "number" ||
//     isNaN(num1) ||
//     isNaN(num2)
//   ) {
//     return res.status(400).json({ error: "num1 и num2 не числа" });
//   }

//   let result;

//   switch (operator) {
//     case "+":
//       result = num1 + num2;
//       break;
//     case "-":
//       result = num1 - num2;
//       break;
//     case "*":
//       result = num1 * num2;
//       break;
//     case "/":
//       if (num2 === 0) {
//         res.status(400).json({ error: "нельзя делить на ноль" });
//       }
//       result = num1 / num2;
//       break;
//     default:
//       return res
//         .status(400)
//         .json({ error: "неправильные данные или оператор" });
//   }

//   res.status(200).json({ result });
// });

// app.listen(PORT, () => {
//   console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
// });
export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Метод не разрешен" });
  }

  let body = req.body;

  // Если тело пришло строкой — парсим вручную
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (err) {
      return res.status(400).json({ error: "Некорректный JSON" });
    }
  }

  console.log("📌 BODY:", body);

  const { num1, num2, operator } = body;

  if (
    typeof num1 !== "number" ||
    typeof num2 !== "number" ||
    isNaN(num1) ||
    isNaN(num2)
  ) {
    return res.status(400).json({ error: "num1 и num2 не числа" });
  }

  let result;
  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      if (num2 === 0) return res.status(400).json({ error: "деление на ноль" });
      result = num1 / num2;
      break;
    default:
      return res.status(400).json({ error: "неправильный оператор" });
  }

  console.log("📌 RESULT:", result);
  return res.status(200).json({ result });
}
