

let cart = [];

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function() {
        let card = button.closest(".card");

        let name = card.querySelector(".card-title").textContent.trim();
        let priceText = card.querySelector(".card-text").textContent;
        let price = Number(priceText.replace(/[^0-9]/g, ""));

        let item = cart.find(product => product.name === name);

        if (item) {
            item.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        updateCart();
    });
});

function updateCart() {
    let container = document.getElementById("cart-items");
    let total = 0;
    let count = 0;

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p>Кошик порожній</p>";
    }

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        count += item.quantity;

        let row = document.createElement("div");
        row.className = "cart-row";

        let info = document.createElement("span");
        info.textContent = item.name + " × " + item.quantity +
            " — " + item.price * item.quantity + " грн";

        let removeButton = document.createElement("button");
        removeButton.textContent = "Видалити";

        removeButton.onclick = function() {
            cart.splice(index, 1);
            updateCart();
        };

        row.appendChild(info);
        row.appendChild(removeButton);
        container.appendChild(row);
    });

    document.getElementById("cart-count").textContent = count;
    document.getElementById("cart-total").textContent = total;
}

function clearCart() {
    cart = [];
    updateCart();
}


// ФІЛЬТРАЦІЯ ТОВАРІВ

function filterProducts(category, button) {

    let cards = document.querySelectorAll(".card");

    cards.forEach(function(card) {

        if (category === "all" || card.dataset.category === category) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

    let links = document.querySelectorAll(".header .nav-link");

    links.forEach(function(link) {
        link.classList.remove("active");
    });

    button.classList.add("active");
}


// ВІДКРИТТЯ КОШИКА

function toggleCart() {
    let cartBox = document.getElementById("cart");

    if (cartBox.style.display === "block") {
        cartBox.style.display = "none";
    } else {
        cartBox.style.display = "block";
    }
}

function buyProducts() {
    if (cart.length === 0) {
        alert("Ваш кошик порожній!");
        return;
    }

    alert("Дякуємо за покупку! 🎉 Ваше замовлення успішно оформлено!");

    cart = [];
    updateCart();
}