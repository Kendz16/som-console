const menu = [
  { code: "F1", name: "Chickenjoy", price: 99, category: "Food" },
  { code: "F2", name: "Burger Steak", price: 79, category: "Food" },
  { code: "B1", name: "Coke", price: 25, category: "Beverage" },
  { code: "D1", name: "Peach Mango Pie", price: 39, category: "Dessert" }
];
let orderCart = [];

const displayMenu = () => {
  console.log("\n===== SOMS V2 MENU =====");
  menu.forEach(i => console.log(`${i.code} | ${i.name} | ₱${i.price}`));
};

const addToCart = () => {
  const code = prompt("Enter product code: ").toUpperCase();
  const item = menu.find(i => i.code === code);
  if (!item) return alert("Error: Invalid code");
  const qty = Number (prompt("Enter quantity: "));
  if (isNaN(qty) || qty <= 0) return alert("Error: Quantity must be > 0");
  orderCart.push({
    code: item.code, name: item.name, price: item.price,
    quantity: qty, subtotal: item.price * qty,
    timestamp: new Date().toISOString() // V2 Feature
  });
  alert(`Added: ${item.name} x${qty}`);
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

const main = () => {
  displayMenu();
  addToCart();
  const subtotal = computeTotal(); 
  
  console.log("\n===== CHECKOUT V2.1 ====="); 
  orderCart.forEach(i => console.log(`${i.name} x${i.quantity} = ₱${i.subtotal} | ${i.timestamp}`)); 
  console.log(`Subtotal: ₱${subtotal.toFixed(2)}`); // Default view

  const discountInfo = applyDiscount(subtotal); // Discount is now optional/opt-in

  if (discountInfo.discount > 0) {
    console.log(`Discount -₱${discountInfo.discount.toFixed(2)} [${discountInfo.type}]`); 
  } else {
    console.log(`Customer Type: Regular`);
  }
  console.log(`FINAL TOTAL: ₱${discountInfo.final.toFixed(2)}`); 
}; 

main();