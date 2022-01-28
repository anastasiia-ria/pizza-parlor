function Pizza(toppings, size) {
  this.toppings = toppings;
  this.size = size;
}

Pizza.prototype.calculatePrice = function() {
  const toppingsQuantity = this.toppings.length;
  let cost = toppingsQuantity * 1.5;

  switch (this.size) {
    case ("small"):
      cost += 5;
      break;
    case ("medium"):
      cost += 10;
      break;
    case ('large'):
      cost += 15;
      break;
    default:
      cost += 1;
  }
  
  return cost;
};