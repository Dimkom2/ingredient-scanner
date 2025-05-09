const ingredientsDB = {
  "сахар": { level: "warning", comment: "Сахар — вреден в больших количествах. Допустимая норма — до 50 г в день." },
  "камедь рожкового дерева": { 
    level: "good", 
    comment: "Натуральный загуститель. Безопасен для здоровья." 
  },
  "каррагинан": { 
    level: "warning", 
    comment: "Может вызывать воспаление кишечника при избыточном потреблении." 
  },
  "ацесульфам калия": { 
    level: "bad", 
    comment: "Искусственный подсластитель. Негативно влияет на микрофлору кишечника." 
  },
  "гуаровая камедь": { 
    level: "good", 
    comment: "Растительный загуститель. Улучшает пищеварение в малых дозах." 
  },
  "диоксид серы": { 
    level: "bad", 
    comment: "Консервант. Разрушает витамин B1, опасен для астматиков." 
  },
  "бензоат кальция": { 
    level: "warning", 
    comment: "Консервант. В больших количествах может вызывать аллергию." 
  },
  "мальтодекстрин": { 
    level: "warning", 
    comment: "Высокий гликемический индекс. Не рекомендуется диабетикам." 
  },
  "пектин яблочный": { 
    level: "good", 
    comment: "Натуральный желирующий агент. Полезен для кишечника." 
  },
  "цитрат натрия": { 
    level: "good", 
    comment: "Регулятор кислотности. Безопасен в умеренных количествах." 
  },
  "стевия": { 
    level: "good", 
    comment: "Натуральный подсластитель. Не влияет на уровень сахара в крови." 
  },
  "какао-порошок": { 
    level: "good", 
    comment: "Натуральный продукт. Содержит антиоксиданты." 
  },
  "агар-агар": { 
    level: "good", 
    comment: "Растительный аналог желатина. Богат минералами." 
  },
  "ксантановая камедь": { 
    level: "good", 
    comment: "Стабилизатор. Безопасна даже для детей." 
  },
  "сульфиты": { 
    level: "bad", 
    comment: "Консерванты. Вызывают головные боли у чувствительных людей." 
  },
  "молочная кислота": { 
    level: "good", 
    comment: "Натуральный консервант. Образуется при брожении." 
  },
  "нитрит калия": { 
    level: "bad", 
    comment: "Консервант для мяса. В высоких дозах токсичен." 
  },
  "декстроза": { 
    level: "warning", 
    comment: "Простой сахар. Быстро повышает уровень глюкозы в крови." 
  },
  "казеинат натрия": { 
    level: "good", 
    comment: "Молочный белок. Безопасен при отсутствии аллергии." 
  },
  "ароматизатор дыни": { 
    level: "warning", 
    comment: "Искусственный ароматизатор. Может содержать следы аллергенов." 
  },
  "бета-каротин": { 
    level: "good", 
    comment: "Натуральный краситель. Преобразуется в витамин А." 
  }
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

// ▼▼▼ НОВЫЙ КОД ▼▼▼
function resizeTextarea() {
  const textarea = document.getElementById("input");
  textarea.style.height = 'auto';
  textarea.style.height = Math.min(textarea.scrollHeight, 350) + 'px';
}

document.getElementById("input").addEventListener('input', resizeTextarea);
// ▲▲▲ КОНЕЦ НОВОГО КОДА ▲▲▲

function findClosestWord(word) {
  let minDistance = Infinity;
  let closestWord = null;

  for (const key in ingredientsDB) {
    const distance = levenshteinDistance(word, key);
    if (distance < minDistance && distance <= 2) {
      minDistance = distance;
      closestWord = key;
    }
  }
  return closestWord;
}

function levenshteinDistance(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i-1) === a.charAt(j-1)) {
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i-1][j-1] + 1,
          matrix[i][j-1] + 1,
          matrix[i-1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

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

function handleImageUpload(event) {
  const image = event.target.files[0];
  if (!image || !image.type.startsWith('image/')) {
    alert('Пожалуйста, загрузите изображение.');
    return;
  }

  Tesseract.recognize(
    image,
    'rus',
    { logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
    const input = document.getElementById("input");
    input.value = text.trim();
    resizeTextarea(); // ▲▲▲ ВЫЗОВ ФУНКЦИИ АВТОРЕСАЙЗА ▲▲▲
    analyze();
  }).catch(err => {
    console.error('Ошибка OCR:', err);
    alert('Не удалось распознать текст на изображении.');
  });
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("imageInput").addEventListener("change", handleImageUpload);
});
