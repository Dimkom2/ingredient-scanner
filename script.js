const ingredientsDB = {
  "сахар": { level: "warning", comment: "Сахар — вреден в больших количествах. Допустимая норма — до 50 г в день." },
  "пальмовое масло": { level: "bad", comment: "Пальмовое масло — вредно при частом употреблении, содержит насыщенные жиры." },
  "глутамат натрия": { level: "bad", comment: "Глутамат натрия может вызывать головные боли и аллергии при чувствительности." },
  "аспартам": { level: "bad", comment: "Аспартам — искусственный подсластитель, запрещён для людей с фенилкетонурией." }
};

// Функция для поиска похожего слова (автокоррекция)
function findClosestWord(word) {
  let minDistance = Infinity;
  let closestWord = null;

  for (const key in ingredientsDB) {
    const distance = levenshteinDistance(word, key);
    if (distance < minDistance) {
      minDistance = distance;
      closestWord = key;
    }
  }

  return minDistance <= 1 ? closestWord : null; // допускаем только 1 ошибку
}

// Функция расчёта расстояния Левенштейна
function levenshteinDistance(a, b) {
  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // замена
          matrix[i][j - 1] + 1,     // вставка
          matrix[i - 1][j] + 1      // удаление
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

// Основная функция анализа
function analyze() {
  const input = document.getElementById("input").value.toLowerCase().trim();
  const words = input.split(/[ ,.;:\n]+/);
  const output = document.getElementById("output");
  output.innerHTML = "";

  if (input === "") {
    output.innerHTML = "<i>Пожалуйста, введите состав продукта.</i>";
    return;
  }

  words.forEach(word => {
    let data = ingredientsDB[word];

    if (!data) {
      const corrected = findClosestWord(word);
      if (corrected) {
        data = ingredientsDB[corrected];
        word = corrected; // показываем исправленное слово
      }
    }

    if (data) {
      const div = document.createElement("div");
      div.className = data.level;
      div.innerHTML = `<b>${word}</b>: ${data.comment}`;
      output.appendChild(div);
    } else {
      const unknown = document.createElement("div");
      unknown.innerHTML = `<i>${word}</i>: <span style="color: gray">ингредиент не найден / не опознан</span>`;
      output.appendChild(unknown);
    }
  });
}

// Функция автоувеличения текстового поля
function autoResizeTextarea() {
  const textarea = document.getElementById("input");
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";

  const maxHeight = 200;
  if (textarea.scrollHeight > maxHeight) {
    textarea.style.height = maxHeight + "px";
    textarea.style.overflowY = "auto";
  } else {
    textarea.style.overflowY = "hidden";
  }
}

// Привязка автоувеличения к полю ввода
document.addEventListener("DOMContentLoaded", function() {
  const textarea = document.getElementById("input");
  textarea.addEventListener("input", autoResizeTextarea);
});
