function money(n) {
  return Number(n).toFixed(2);
}

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

function clearCart() {
  saveCart({});
}

function items(cart) {
  return Object.values(cart);
}

function subtotal(cart) {
  return items(cart).reduce((s, it) => s + it.price * it.qty, 0);
}

function renderCart() {
  const cart = loadCart();
  const cartEl = document.getElementById("cart");
  const subtotalEl = document.getElementById("subtotal");

  const list = items(cart);

  if (list.length === 0) {
    cartEl.innerHTML = "<p>Your cart is empty.</p>";
    subtotalEl.textContent = "0.00";
    return;
  }

  cartEl.innerHTML = list.map(it => `
    <div class="cart-row">
      ${it.name} — $${money(it.price)} x 
      <input type="number" min="0" value="${it.qty}" data-id="${it.id}" class="qty">
      = $${money(it.price * it.qty)}
      <button class="remove" data-id="${it.id}">Remove</button>
    </div>
  `).join("");

  subtotalEl.textContent = money(subtotal(cart));
}

// Change quantity
document.addEventListener("input", (e) => {
  if (!e.target.classList.contains("qty")) return;

  const id = e.target.dataset.id;
  const qty = Number(e.target.value);

  const cart = loadCart();
  if (qty <= 0) delete cart[id];
  else cart[id].qty = qty;

  saveCart(cart);
  renderCart();
});

// Buttons
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    const cart = loadCart();
    delete cart[e.target.dataset.id];
    saveCart(cart);
    renderCart();
  }

  if (e.target.id === "clearBtn") {
    clearCart();
    document.getElementById("receipt").textContent = "(No receipt yet)";
    renderCart();
  }

  if (e.target.id === "submitBtn") {
    const cart = loadCart();
    const list = items(cart);

    if (list.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const now = new Date();
    const total = subtotal(cart);

    const receipt = [
      "=== RECEIPT ===",
      `Date: ${now.toLocaleString()}`,
      "",
      ...list.map(it => `${it.name} x${it.qty} = $${money(it.price * it.qty)}`),
      "",
      `Subtotal: $${money(total)}`,
      "===============",
      "Order submitted!",
    ].join("\n");

    document.getElementById("receipt").textContent = receipt;

    clearCart();
    renderCart();
  }
});

renderCart();
