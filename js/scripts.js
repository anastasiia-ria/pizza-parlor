// Business Logic for ListOfPizzas
function ListOfPizzas() {
  this.pizzas = {};
  this.currentId = 0;
}

ListOfPizzas.prototype.addPizza = function(pizza) {
  pizza.id = this.assignId();
  this.pizzas[pizza.id] = pizza;
};

ListOfPizzas.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

ListOfPizzas.prototype.findPizza = function(id) {
  if (this.pizzas[id] != undefined) {
    return this.pizzas[id];
  }
  return false;
};
// Business logic for Pizza
function Pizza(toppings, size, quantity, cost) {
  this.toppings = toppings;
  this.size = size;
  this.quantity = quantity;
  this.cost = cost;
  this.name = "Custom Pizza";
}

Pizza.prototype.calculatePrice = function(id) {
  const toppingsQuantity = this.toppings.length;
  let cost = toppingsQuantity * 1.5;

  switch (this.size) {
    case ('small'):
      cost += 5;
      break;
    case ('medium'):
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

// User Interface Logic
let listOfPizzas = new ListOfPizzas();

function displayPizzas(listOfPizzasToDisplay) {
  let pizzasList = $("ul#pizzas");
  let html = "";
  Object.keys(listOfPizzasToDisplay.pizzas).forEach(function(key) {
    const pizza = listOfPizzasToDisplay.findPizza(key);
    html += "<li class='pizza-name' id=" + pizza.id + ">" + pizza.quantity + " x " + pizza.name + "<span class='right'> $ " + pizza.cost + "</span></li><li class='hidden " + pizza.id +"'>Size: " + pizza.size + "</li><li class='hidden " + pizza.id +"'>Toppings: " + pizza.toppings.join(", ") + "</li>";
  });
  pizzasList.html(html);
}

function attachPizzaListeners() {
  $("ul#pizzas").on("click", "li", function(){
    $('.hidden').hide();
    $('li.' + this.id + '.hidden').toggle();
  });
}

$(document).ready(function(){
  attachPizzaListeners();
  $("form#menu").submit(function (event){
    event.preventDefault();
    const name = $('input#name').val();
    const size = $('input[name="size"]:checked').val();
    const toppings = [];
    const quantity = parseInt($('input#quantity').val());
    console.log(quantity);
    $('input[type="checkbox"]').each(function(){
      if(this.checked) {
        toppings.push($(this).val());
      }
    });

    let newPizza = new Pizza(toppings, size, quantity);
    newPizza.cost = newPizza.calculatePrice();
    console.log(newPizza.cost);
    listOfPizzas.addPizza(newPizza);
    console.log(newPizza);
    console.log(listOfPizzas);
    displayPizzas(listOfPizzas);
  });
});