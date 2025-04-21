// Массив с заранее определёнными ингредиентами и их уровнем опасности
const ingredientsData = {
  "сахар": "moderate",
  "соль": "safe",
  "глутамат натрия": "danger",
  "консерванты": "danger",
  "пальмовое масло": "moderate",
  "витамины": "safe"
};

// Функция для обработки ввода и проверки ингредиентов
function scanIngredients() {
  const inputText = document.getElementById("ingredients-input").value.toLowerCase();
  const ingredientsList = inputText.split(","); // Разделяем состав по запятой

  // Очищаем старые результаты
  const resultContainer = document.getElementById("ingredients-list");
  resultContainer.innerHTML = "";

  ingredientsList.forEach(ingredient => {
    ingredient = ingredient.trim(); // Убираем пробелы

    // Создаём новый элемент списка для каждого ингредиента
    const listItem = document.createElement("li");
    listItem.textContent = ingredient;

    // Проверяем уровень опасности ингредиента
    if (ingredientsData[ingredient]) {
      listItem.classList.add(ingredientsData[ingredient]);
    } else {
      listItem.classList.add("safe"); // Если ингредиент неизвестен, помечаем как безопасный
    }

    resultContainer.appendChild(listItem);
  });
}

// Подключаем обработчик события к кнопке
document.getElementById("scan-button").addEventListener("click", scanIngredients);
