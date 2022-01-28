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

ListOfPizzas.prototype.calculateTotal = function() {
  let total = 0;
  for (let i = 1; i <= this.currentId; i++) {
    const pizza = this.findPizza(i);
    console.log(pizza);
    total += pizza.cost * pizza.quantity;
    console.log(pizza.cost);
  }
  return total;
};

ListOfPizzas.prototype.clear = function() {
  for (let i = 1; i <= this.currentId; i++) {
    delete this.pizzas[i];
  }
  this.currentId = 0;
}

ListOfPizzas.prototype.deletePizza = function(id) {
  if (this.pizzas[id] === undefined) {
    return false;
  }
  delete this.pizzas[id];
  return true;
}

// Business logic for Pizza
function Pizza(toppings, size, quantity, instructions, cost) {
  this.toppings = toppings;
  this.size = size;
  this.quantity = quantity;
  this.instructions = instructions;
  this.cost = cost;
  this.name = "Custom Pizza";
}

Pizza.prototype.calculatePrice = function(id) {
  const toppingsQuantity = this.toppings.length;
  let cost = toppingsQuantity * 1;

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
    html += "<li class='pizza-name' id=" + pizza.id + ">" + pizza.quantity + " x " + pizza.name + "<span class='right'> $ " + pizza.cost + "</span></li><li class='hidden " + pizza.id +"'>Size: " + pizza.size + "</li><li class='hidden " + pizza.id +"'>Toppings: " + pizza.toppings.join(", ") + "</li><li class='hidden " + pizza.id +"'>Special Instructions: " + pizza.instructions + "</li>";
    console.log(pizza.instructions);
  });
  pizzasList.html(html);
  $("#total").html(listOfPizzasToDisplay.calculateTotal());
}

function attachPizzaListeners() {
  $("ul#pizzas").on("click", "li", function(){
    $('.hidden').hide();
    $('li.' + this.id + '.hidden').toggle();
  });
}

$(document).ready(function(){
  attachPizzaListeners();

  $('input').click(function () {
    $('input:not(:checked)').parent().removeClass('checked');
    $('input:checked').parent().addClass('checked');
  });
  
  $("form#menu").submit(function (event){
    event.preventDefault();
    const name = $('input#name').val();
    const size = $('input[name="size"]:checked').val();
    const toppings = [];
    const quantity = parseInt($('select[name="quantity"] option:selected').val());
    const instructions = $('textarea#instructions').val();
    $('input[type="checkbox"]').each(function(){
      if(this.checked) {
        toppings.push($(this).val());
      }
    });

    $('input').each(function() {
      if ($(this).val() === 'small') {
        $(this).prop('checked',true);
        $(this).parent().addClass('checked');
      } else {
        $(this).prop('checked',false);
        $(this).parent().removeClass('checked');
      }
    });

    $('input[type="checkbox"]').each(function() {
      $(this).prop('checked',false);
      $(this).parent().removeClass('checked');
    });



    $('#order-name').html(name);
    let newPizza = new Pizza(toppings, size, quantity, instructions);
    newPizza.cost = newPizza.calculatePrice();
    console.log(newPizza.instructions);
    listOfPizzas.addPizza(newPizza);
    console.log(newPizza);
    console.log(listOfPizzas);
    displayPizzas(listOfPizzas);

    $('#cart').show();
    $('#toggle-cart').show();


    $('button#place-order').click(function (){
      $('#main').hide();
      $('#cart').hide();
      $('#thank-you').show();
      $('.name').html(name);
    });

    $('button#new-order').click(function (){
      $('#thank-you').hide();
      $('#main').show();
      $('#toggle-cart').hide();
    });
  });

  $('button#new-order').click(function (){
    $('#thank-you').hide();
    $('#main').show();
    $('#toggle-cart').hide();

  });

  $('#toggle-cart').click(function (){
    $('#cart').toggle();
  });
  
});