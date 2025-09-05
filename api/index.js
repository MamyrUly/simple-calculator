import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/calculate", (req, res) => {
  const { num1, num2, operator } = req.body;

  if (
    typeof num1 !== "number" ||
    typeof num2 !== "number" ||
    isNaN(num1) ||
    isNaN(num2)
  ) {
    return res.status(400).json({ error: "num1 и num2 не числа" });
  }

  let result;
  let expression;

  switch (operator) {
    case "+":
      result = num1 + num2;
      expression = `${num1} + ${num2} = ${result}`;
      break;
    case "-":
      result = num1 - num2;
      expression = `${num1} - ${num2} = ${result}`;
      break;
    case "*":
      result = num1 * num2;
      expression = `${num1} * ${num2} = ${result}`;
      break;
    case "/":
      if (num2 === 0) {
        return res.status(400).json({ error: "Деление на ноль запрещено" });
      }
      result = num1 / num2;
      expression = `${num1} / ${num2} = ${result}`;
      break;
    default:
      return res.status(400).json({ error: "Неверный оператор" });
  }

  res.json({ result, expression });
});

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
});
