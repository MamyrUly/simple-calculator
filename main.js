async function calculate() {
  const num1 = document.getElementById("num1").value;
  const num2 = document.getElementById("num2").value;
  const operator = document.getElementById("operator").value;
  const output = document.getElementById("output");

  output.innerHTML = "";

  try {
    const response = await fetch("/api/index", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        num1: Number(num1),
        num2: Number(num2),
        operator,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(data.result, typeof data.result);
      output.innerHTML = `<div class="result">ответ ${data.result}</div>`;
    } else {
      output.innerHTML = `<div class="error">ошибка  ${data.error}</div>`;
    }
  } catch (err) {
    output.innerHTML = `<div class="error">Ошибка соединения с сервером</div>`;
  }
}
