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

const viewCart = () => {
  if (orderCart.length === 0) return alert("Cart is empty");
  console.log("\n===== YOUR CART =====");
  orderCart.forEach(i => console.log(`${i.name} x${i.quantity} = ₱${i.subtotal}`));
  console.log(`Subtotal: ₱${computeTotal().toFixed(2)}`);
};

const addToCart = () => {
  const code = prompt("Enter product code: ").toUpperCase();
  const item = menu.find(i => i.code === code);
  if (!item) return alert("Error: Invalid code");
  const qty = Number (prompt("Enter quantity: "));
  if (isNaN(qty) || qty <= 0) return alert("Error: Quantity must be > 0");

   const existing = orderCart.find(i => i.code === code);
  if (existing) {
    existing.quantity += qty;
    existing.subtotal = existing.price * existing.quantity;
  } else {

  orderCart.push({
    code: item.code, 
    name: item.name, 
    price: item.price,
    quantity: qty, 
    subtotal: item.price * qty,
    timestamp: new Date().toISOString()
  });
  }
  alert(`Added: ${item.name} x${qty}`);
};

const removeFromCart = () => {
  const code = prompt("Enter product code to remove: ").toUpperCase();
  const index = orderCart.findIndex(i => i.code === code);
  if (index === -1) return alert("Item not in cart");
  orderCart.splice(index, 1);
  alert("Item removed");
};


const computeTotal = () => orderCart.reduce((acc, item) => acc + item.subtotal, 0);


const applyDiscount = (total) => { 
  //Default is Regular. Ask only if they want discount
  const hasDiscount = prompt("Do you have a PWD, Senior, or Student ID? [Y/N]: ").toUpperCase(); 
  
  if (hasDiscount !== "Y") {
    return { final: total, discount: 0, type: "Regular" };
  }

  const type = prompt("Enter ID type [PWD/Senior/Student]: ").toLowerCase(); 
  let rate = type === "pwd" || type === "senior" ? 0.20 : type === "student" ? 0.10 : 0; 
  
  if (rate === 0) {
    alert("Invalid ID type. No discount applied.");
    return { final: total, discount: 0, type: "Regular" };
  }

  const idNumber = prompt("Enter ID Number: "); 
  if (idNumber.trim() === "") { 
    alert("Empty ID. Discount Rejected. Regular price will be used."); 
    return { final: total, discount: 0, type: "Regular" }; 
  } 
  const discount = total * rate;
  alert(`${type.toUpperCase()} discount ${rate * 100}% applied.`);
  return { final: total - discount, discount: discount, type: type.toUpperCase() };
};

const checkout = () => {
  if (orderCart.length === 0) return alert("Cart is empty. Cannot checkout."); 
  
  console.log("\n===== CHECKOUT ====="); 
  orderCart.forEach(i => console.log(`${i.name} x${i.quantity} = ₱${i.subtotal} | ${i.timestamp}`)); 
  const subtotal = computeTotal();
  console.log(`Subtotal: ₱${subtotal.toFixed(2)}`);

  const discountInfo = applyDiscount(subtotal);

  if (discountInfo.discount > 0) {
    console.log(`Discount -₱${discountInfo.discount.toFixed(2)} [${discountInfo.type}]`); 
  } else {
    console.log(`Customer Type: Regular`);
  }
  console.log(`FINAL TOTAL: ₱${discountInfo.final.toFixed(2)}`); 
  alert("Thank you for ordering!");
  orderCart = [];
 }; 

  const main = () => {
    let running = true;
    while (running) { 
      const choice = prompt ("[A]dd to Cart\n[V]iew Cart\n[R]emove Item\n[C]heckout\n[E]xit\nEnter choice: ").toUpperCase();

      switch(choice) {
      case "A": displayMenu(); addToCart(); break;
      case "V": viewCart(); break;
      case "R": removeFromCart(); break;
      case "C": checkout(); break;
      case "E": running = false; alert("Goodbye!"); break;
      default: alert("Invalid choice");

      }
  }
};

main();