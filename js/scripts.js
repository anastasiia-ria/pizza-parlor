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

// User Interface Logic
$(document).ready(function(){
  $("form#menu").submit(function (event){
    event.preventDefault();
    const name = $('input#name').val();
    const size = $('input[name="size"]:checked').val();
    const toppings = [];

    $('input[type="checkbox"]').each(function(){
      if(this.checked) {
        toppings.push($(this).val());
      }
    });
    console.log(name, size, toppings);

    $(".side-col").show();
    $("#size").html(size);

    for (let i = 0; i < toppings.length; i++) {
      $('ul#toppings').append("<li>" + toppings[i] + "</li>")
    }
  });



});