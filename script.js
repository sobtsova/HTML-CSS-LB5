// 1 Поміняти місцями блоки "3" та "6"
document.addEventListener("DOMContentLoaded", () => {
    const block3 = document.querySelector(".block3");
    const block6 = document.querySelector(".block6");

    const block3Content = block3.innerHTML;
    const block6Content = block6.innerHTML;

    block3.innerHTML = block6Content;
    block6.innerHTML = block3Content;
});



// 2 Функція для обчислення площі трапеції
document.addEventListener("DOMContentLoaded", () => {
    const a = 9; 
    const b = 15; 
    const h = 7;  

    const calculateArea = () => 0.5 * (a + b) * h;

    const block5 = document.querySelector(".block5");

    if (block5) {
        const result = document.createElement("p");
        result.textContent = `Площа трапеції: ${calculateArea()} кв. од.`;

        block5.appendChild(result); 
    }
});

// 3 Визначення дільників числа та робота з cookies
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("divisorForm");
    const numberInput = document.getElementById("numberInput");

    const cookies = document.cookie.split("; ").find(row => row.startsWith("divisors="));

    if (cookies) {
        const divisorsData = decodeURIComponent(cookies.split("=")[1]);
        if (confirm(`Збережені дані з cookies: ${divisorsData}. Бажаєте залишити ці дані?`)) {
            alert("Cookies залишені. Перезавантажте сторінку для збереження стану.");
        } else {
            document.cookie = "divisors=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            location.reload();
        }
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const number = parseInt(numberInput.value);

        if (isNaN(number) || number < 1) {
            alert("Введіть коректне натуральне число.");
            return;
        }

        const divisors = [];
        for (let i = 1; i <= number; i++) {
            if (number % i === 0) {
                divisors.push(i);
            }
        }

        alert(`Дільники числа ${number}: ${divisors.join(", ")}`);
        document.cookie = `divisors=${encodeURIComponent(divisors.join(", "))}; path=/;`;
        alert("Результат збережено в cookies.");
    });
});

// 4 Подія change для встановлення верхнього регістру
const originalTexts = {};

function saveOriginalTexts() {
    const block4 = document.querySelector(".block4");
    if (block4) {
        const paragraphs = block4.querySelectorAll("p");
        paragraphs.forEach((p, index) => {
            originalTexts[index] = p.textContent; 
        });
    }
}

function updateTextFromLocalStorage() {
    const block4 = document.querySelector(".block4");
    const capitalize = localStorage.getItem("capitalizeText") === "true";

    if (block4) {
        const paragraphs = block4.querySelectorAll("p");
        paragraphs.forEach((p, index) => {
            p.textContent = capitalize ? capitalizeFirstLetters(originalTexts[index]) : originalTexts[index];
        });
    }
}

function onTextCaseChange() {
    const capitalizeRadio = document.getElementById("capitalizeRadio");

    localStorage.setItem("capitalizeText", capitalizeRadio.checked ? "true" : "false");

    updateTextFromLocalStorage();
}

document.addEventListener("DOMContentLoaded", () => {
    saveOriginalTexts(); 
    updateTextFromLocalStorage(); 
});

document.getElementById("capitalizeRadio").addEventListener("change", onTextCaseChange);
document.getElementById("normalRadio").addEventListener("change", onTextCaseChange);

function capitalizeFirstLetters(text) {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
}


// 5 Додавання зображень
document.addEventListener("DOMContentLoaded", () => {
    const block5 = document.querySelector(".block5");
    const block4 = document.querySelector(".block4");
    const addImageButton = document.getElementById("addImageButton");

    function addImage(url) {
        const wrapper = document.createElement("div");
        wrapper.classList.add("image-wrapper");

        wrapper.innerHTML = `
            <img src="${url}" alt="Додане зображення" />
            <button class="delete-image">Видалити</button>
        `;
        
        block4.appendChild(wrapper);

        wrapper.querySelector(".delete-image").addEventListener("click", () => {
            removeFromLocalStorage(url);
            wrapper.remove();  
        });
    }

    function saveToLocalStorage(url) {
        let images = JSON.parse(localStorage.getItem("images") || "[]");
        images.push(url);
        localStorage.setItem("images", JSON.stringify(images));
    }

    function removeFromLocalStorage(url) {
        let images = JSON.parse(localStorage.getItem("images") || "[]");
        images = images.filter(image => image !== url);
        localStorage.setItem("images", JSON.stringify(images));
    }

    function loadImages() {
        const images = JSON.parse(localStorage.getItem("images") || "[]");
        images.forEach(url => addImage(url)); 
    }

    addImageButton.addEventListener("click", () => {
        const form = document.createElement("div");
        form.innerHTML = `
            <input type="url" placeholder="Введіть URL зображення" id="imageUrl" />
            <button type="button" class="add-image">Додати</button>
        `;
        block5.appendChild(form);

        // Обробник події для кнопки "Додати"
        form.querySelector(".add-image").addEventListener("click", () => {
            const url = form.querySelector("#imageUrl").value;
            if (url) {
                addImage(url);
                saveToLocalStorage(url);
                form.remove(); 
            }
        });
    });

    loadImages();
});
