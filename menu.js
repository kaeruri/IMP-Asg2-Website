function loadCart() {
  try {
    return JSON.parse(localStorage.getItem("cart")) || {};
  } catch {
    return {};
  }
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addItem(id, name, price) {
  const cart = loadCart();

  if (!cart[id]) {
    cart[id] = { id, name, price, qty: 1 };
  } else {
    cart[id].qty += 1;
  }

  saveCart(cart);
}


// Korean food
document.getElementById("orderK1").addEventListener("click", () => {
  addItem("K1", "Korean Dish 1", 10);
  alert("Added to order!");
});

document.getElementById("orderK2").addEventListener("click", () => {
  addItem("K2", "Korean Dish 2", 12);
  alert("Added to order!");
});

document.getElementById("orderK3").addEventListener("click", () => {
  addItem("K3", "Korean Dish 3", 8);
  alert("Added to order!");
});

// Yong Tau Foo
document.getElementById("orderY1").addEventListener("click", () => {
  addItem("Y1", "Yong Tau Foo Dish 1", 10);
  alert("Added to order!");
});

document.getElementById("orderY2").addEventListener("click", () => {
  addItem("Y2", "Yong Tau Foo Dish 2", 12);
  alert("Added to order!");
});

document.getElementById("orderY3").addEventListener("click", () => {
  addItem("Y3", "Yong Tau Foo Dish 3", 8);
  alert("Added to order!");
});
