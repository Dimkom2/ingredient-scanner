[19:52, 22.04.2025] Потап: const ingredientsDB = {
  "сахар": {
    level: "warning",
    comment: "Сахар — вреден в больших количествах. Допустимая норма — до 50 г в день."
  },
  "пальмовое масло": {
    level: "bad",
    comment: "Пальмовое масло — вредно при частом употреблении, содержит насыщенные жиры."
  },
  "глутамат натрия": {
    level: "bad",
    comment: "Глутамат натрия может вызывать головные боли и аллергии при чувствительности."
  },
  "аспартам": {
    level: "bad",
    comment: "Аспартам — искусственный подсластитель, запрещён для людей с фенилкетонурией."
  }
};

function analyze() {
  const input = document.getElementById("input").value.toLowerCase();
  const words = input.split(/[ ,.;:\n]+/);
  const output = document.getElementById("output");
  output.innerHTML …
[19:53, 22.04.2025] Потап: const ingredientsDB = {
  "сахар": {
    level: "warning",
    comment: "Сахар — вреден в больших количествах. Допустимая норма — до 50 г в день."
  },
  "пальмовое масло": {
    level: "bad",
    comment: "Пальмовое масло — вредно при частом употреблении, содержит насыщенные жиры."
  },
  "глутамат натрия": {
    level: "bad",
    comment: "Глутамат натрия может вызывать головные боли и аллергии при чувствительности."
  },
  "аспартам": {
    level: "bad",
    comment: "Аспартам — искусственный подсластитель, запрещён для людей с фенилкетонурией."
  }
};

function analyze() {
  const input = document.getElementById("input").value.toLowerCase();
  const words = input.split(/[ ,.;:\n]+/);
  const output = document.getElementById("output");
  output.innerHTML = "";

  let known = 0;

  words.forEach(word => {
    const data = ingredientsDB[word];
    if (data) {
      known++;
      const div = document.createElement("div");
      div.className = data.level;
      div.innerHTML = <b>${word}</b>: ${data.comment};  // исправлено!
      output.appendChild(div);
    } else {
      const unknown = document.createElement("div");
      unknown.innerHTML = <i>${word}</i>: <span style="color: gray">ингредиент не найден / не опознан</span>;  // исправлено!
      output.appendChild(unknown);
    }
  });

  if (known === 0 && words.length === 1 && words[0] === "") {
    output.innerHTML = "<i>Пожалуйста, введите состав продукта.</i>";
  }
}
