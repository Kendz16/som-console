const menu = [
  { code: "F1", name: "Chickenjoy", price: 99, category: "Food" },
  { code: "F2", name: "Burger Steak", price: 79, category: "Food" },
  { code: "B1", name: "Coke", price: 25, category: "Beverage" },
  { code: "D1", name: "Peach Mango Pie", price: 39, category: "Dessert" }
];
let orderCart = [];
let firstOrderDone = false;

const displayMenu = () => {
    let menuText = "===== WELCOME TO SOMS =====\n";
 menu.forEach(i => menuText += `${i.code} | ${i.name} | ₱${i.price} | ${i.category}\n`);
  menuText += "---------------------------\nType a product code to start ordering. Ex: F1";
  alert(menuText);
};

const viewCart = () => {
  if (orderCart.length === 0) return alert("Cart is empty");
  let cartText = "===== YOUR CART =====\n";
  orderCart.forEach(i => cartText += `${i.name} x${i.quantity} = ₱${i.subtotal}\n`);
  cartText += `----------------------\nSubtotal: ₱${computeTotal().toFixed(2)}`;
  alert(cartText);
};

const addToCart = (codeInput = null) => {
  const code = codeInput? codeInput : prompt("Enter product code: ").toUpperCase();
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
  firstOrderDone = true;
};

const removeFromCart = () => {
  const code = prompt("Enter product code to remove: ").toUpperCase();
  const index = orderCart.findIndex(i => i.code === code);
  if (index === -1) return alert("Item not in cart");
  orderCart.splice(index, 1);
   if(orderCart.length === 0) firstOrderDone = false;
  alert("Item removed");
};

const modifyCart = () => {
  const code = prompt("Enter product code to modify: ").toUpperCase();
  const index = orderCart.findIndex(i => i.code === code);
  if (index === -1) return alert("Item not in cart");

  const currentQty = orderCart[index].quantity;
  const newQty = Number(prompt(`Enter new quantity. Current: ${currentQty}: `));

  if (isNaN(newQty) || newQty <= 0) return alert("Error: Quantity must be > 0");

  if (newQty === currentQty) {
    return alert("No changes made. Quantity is the same.");
  }

  orderCart.splice(index, 1, {...orderCart[index], quantity: newQty, subtotal: orderCart[index].price * newQty});
  alert("Quantity updated");
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
   let receipt = "===== RECEIPT =====\n";
  orderCart.forEach(i => {
    const time = new Date(i.timestamp).toLocaleString();
    receipt += `${i.name} x${i.quantity} = ₱${i.subtotal} | ${time}\n`; 
  }); 
  const subtotal = computeTotal();
  receipt += `----------------------\nSubtotal: ₱${subtotal.toFixed(2)}\n`;
  const discountInfo = applyDiscount(subtotal);
  if (discountInfo.discount > 0) { receipt += `Discount -₱${discountInfo.discount.toFixed(2)} [${discountInfo.type}]\n`; }
  else { receipt += `Customer Type: Regular\n`; }
  receipt += `FINAL TOTAL: ₱${discountInfo.final.toFixed(2)}`;
  alert(receipt);

  const confirmOrder = prompt("Confirm Order? [Y/N]: ").toUpperCase();
  if (confirmOrder === "Y") {
    alert("Order Confirmed. Thank you!\n");
    orderCart = [];
    firstOrderDone = false;
 } else {
  alert("Order Cancelled. Cart has been reset.");
  orderCart = []; 
  firstOrderDone = false;
}
}; 

  const main = () => {
    displayMenu();
    let running = true;
    while (running) {
    if (!firstOrderDone) {
      const firstCode = prompt("Enter product code to order or [E] to exit: ").toUpperCase();
      if (firstCode === "E") { running = false; alert("Goodbye!"); }
      else { addToCart(firstCode); } // <- Direct add agad
    } else {
    
      const choice = prompt("[A]dd More\n[V]iew Cart\n[R]emove Item\n[M]odify Qty\n[C]heckout\n[E]xit\nEnter choice: ").toUpperCase();

      switch(choice) {
      case "A": displayMenu(); addToCart(); 
      break;
      case "V": viewCart();
      break;
      case "R": removeFromCart(); 
      break;
      case "M": modifyCart(); 
      break;
      case "C": checkout(); 
      break;
      case "E": running = false; alert("Goodbye!"); 
      break;
      default: alert("Invalid choice");

      }
    }
  }
};

main();