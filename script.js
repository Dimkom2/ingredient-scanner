const ingredientsDB = {
  "сахар": { level: "warning", comment: "Сахар — вреден в больших количествах. Допустимая норма — до 50 г в день." },
  "пальмовое масло": { level: "bad", comment: "Пальмовое масло — вредно при частом употреблении, содержит насыщенные жиры." },
  "глутамат натрия": { level: "bad", comment: "Глутамат натрия может вызывать головные боли и аллергии при чувствительности." },
  "аспартам": { level: "bad", comment: "Аспартам — искусственный подсластитель, запрещён для людей с фенилкетонурией." },
  "соль": { level: "warning", comment: "Соль — необходима организму, но избыток увеличивает риск гипертонии." },
  "лимонная кислота": { level: "good", comment: "Лимонная кислота безопасна в малых количествах, используется как консервант." },
  "натрий бензоат": { level: "bad", comment: "Натрий бензоат — консервант, который в больших дозах может быть вреден." },
  "сорбат калия": { level: "warning", comment: "Сорбат калия — допустимый консервант, безопасен при умеренном употреблении." },
  "краситель E102 (тартразин)": { level: "bad", comment: "Тартразин может вызывать аллергические реакции и гиперактивность." },
  "крахмал модифицированный": { level: "good", comment: "Модифицированный крахмал безопасен для употребления." },
  "глюкозный сироп": { level: "warning", comment: "Глюкозный сироп — источник сахара, избыток ведёт к ожирению." },
  "соевый лецитин": { level: "good", comment: "Соевый лецитин — натуральный эмульгатор, безопасен для здоровья." },
  "ароматизатор идентичный натуральному": { level: "warning", comment: "Ароматизаторы безопасны, но могут скрывать низкое качество продуктов." },
  "нитрит натрия (E250)": { level: "bad", comment: "Нитрит натрия используется для консервирования, но в избытке токсичен." }
};



// Авторесайз textarea
document.getElementById("input").addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 350) + 'px';
});


// Функция для поиска похожего слова (автокоррекция)
function findClosestWord(word) {
  let minDistance = Infinity;
  let closestWord = null;

  for (const key in ingredientsDB) {
    const distance = levenshteinDistance(word, key);
    if (distance < minDistance && distance <= 2) { // Жёстко фиксируем 2 ошибки
      minDistance = distance;
      closestWord = key;
    }
  }

  return closestWord; // Вернёт null, если нет совпадений с ≤2 ошибками
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
  const inputText = document.getElementById("input").value.trim();
  const output = document.getElementById("output");
  output.innerHTML = "";

  if (!inputText) {
    output.innerHTML = "<i>Введите состав или загрузите фото.</i>";
    return;
  }

  const cleanedInput = inputText
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

  // Ищем ближайший ингредиент (макс 2 ошибки)
  const closestIngredient = findClosestWord(cleanedInput);
  
  if (closestIngredient) {
    const div = document.createElement("div");
    div.className = ingredientsDB[closestIngredient].level;
    div.innerHTML = `<b>${closestIngredient}</b>: ${ingredientsDB[closestIngredient].comment}`;
    output.appendChild(div);
  } else {
    output.innerHTML = "<i>Не найдено опасных ингредиентов. Проверьте написание.</i>";
  }
}


// Функция для обработки OCR (распознавание текста с изображения)
function handleImageUpload(event) {
  const image = event.target.files[0];
  if (!image || !image.type.startsWith('image/')) {
    alert('Пожалуйста, загрузите изображение.');
    return;
  }

  Tesseract.recognize(
    image,  // исправил: передавать напрямую файл, не через Image
    'rus',  // Язык русский
    {
      logger: (m) => console.log(m), // Логирование прогресса
    }
  ).then(({ data: { text } }) => {
    document.getElementById("input").value = text.trim();
    analyze(); // исправил: автоматически запускать анализ после OCR
  }).catch(err => {
    console.error('Ошибка OCR:', err);
    alert('Не удалось распознать текст на изображении.');
  });
}

// Привязка функции распознавания текста на картинке
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("imageInput").addEventListener("change", handleImageUpload);
});
