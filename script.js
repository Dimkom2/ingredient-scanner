const ingredientsDB = {
  "сахар": { level: "warning", comment: "Сахар — вреден в больших количествах. Допустимая норма — до 50 г в день." },
  "пальмовое масло": { level: "bad", comment: "Пальмовое масло — вредно при частом употреблении, содержит насыщенные жиры." },
  "глутамат натрия": { level: "bad", comment: "Глутамат натрия может вызывать головные боли и аллергии при чувствительности." },
  "аспартам": { level: "bad", comment: "Аспартам — искусственный подсластитель, запрещён для людей с фенилкетонурией." }
};

function analyze() {
  const input = document.getElementById("input").value.toLowerCase().trim();  // Добавлена обработка пробелов в начале и конце
  const words = input.split(/[ ,.;:\n]+/);
  const output = document.getElementById("output");
  output.innerHTML = "";

  if (input === "") {  // проверка на пустой ввод сразу
    output.innerHTML = "<i>Пожалуйста, введите состав продукта.</i>";
    return;
  }

  let known = 0;
  words.forEach(word => {
    const data = ingredientsDB[word];
    if (data) {
      known++;
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

// Функция для автоувеличения текстового поля
function autoResizeTextarea() {
  const textarea = document.getElementById("input");
  textarea.style.height = "auto"; // сбросить старую высоту
  textarea.style.height = textarea.scrollHeight + "px"; // установить новую высоту по контенту
  
  const maxHeight = 200; // максимальная высота в пикселях
  if (textarea.scrollHeight > maxHeight) {
    textarea.style.height = maxHeight + "px";
    textarea.style.overflowY = "auto"; // добавить полосу прокрутки
  } else {
    textarea.style.overflowY = "hidden"; // убрать полосу прокрутки
  }
}

// Привязываем автоувеличение к событию ввода текста
document.addEventListener("DOMContentLoaded", function() {
  const textarea = document.getElementById("input");
  textarea.addEventListener("input", autoResizeTextarea);
});
