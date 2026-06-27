const menu = [
  { code: "F1", name: "Chickenjoy", price: 99, category: "Food" },
  { code: "F2", name: "Burger Steak", price: 79, category: "Food" },
  { code: "B1", name: "Coke", price: 25, category: "Beverage" },
  { code: "D1", name: "Peach Mango Pie", price: 39, category: "Dessert" }
];
let orderCart = [];

const displayMenu = () => {
  console.log("\n===== SOMS MENU =====");
  menu.forEach(i => console.log(`${i.code} | ${i.name} | ₱${i.price}`));
};

const addToCart = () => {
  const code = prompt("Enter product code: ").toUpperCase();
  const item = menu.find(i => i.code === code);
  if (!item) return alert("Error: Invalid code");
  const qty = parseInt(prompt("Enter quantity: "));
  if (isNaN(qty) || qty <= 0) return alert("Error: Quantity must be > 0");
  orderCart.push({code: item.code, name: item.name, quantity: qty, subtotal: item.price * qty});
  alert(`Added: ${item.name} x${qty} = ₱${item.price * qty}`);
};

const computeTotal = () => { // V1 = for loop
  let total = 0;
  for (const item of orderCart) {
    total += item.subtotal;
  }
  return total;
};

const main = () => {
  displayMenu();
  addToCart();
  const total = computeTotal();
  console.log("\n===== RECEIPT V1 =====");
  orderCart.forEach(i => console.log(`${i.name} x${i.quantity} = ₱${i.subtotal}`));
  console.log(`TOTAL: ₱${total.toFixed(2)}`);
};
main();