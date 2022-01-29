//Business Logic for Customer
function Customer(name, street, city, zipcode) {
  this.name = name;
  this.street = street;
  this.city = city;
  this.zipcode = zipcode;
}
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
    if (this.pizzas[i] !== undefined) {
      const pizza = this.findPizza(i);
      total += pizza.cost * pizza.quantity;
    }
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
function Pizza(toppings, size, quantity, instructions, name, cost) {
  this.toppings = toppings;
  this.size = size;
  this.quantity = quantity;
  this.instructions = instructions;
  this.name = name;
  this.cost = cost;
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
  let remove = "";
  let name = "";
  let size = "";
  let toppings = "";
  let instructions = "";

  Object.keys(listOfPizzasToDisplay.pizzas).forEach(function(key) {
    const pizza = listOfPizzasToDisplay.findPizza(key);
    remove = "<span class='" + pizza.id + "'><span class='remove'>X</span></span>";
    name = "<li class='pizza-name' id='" + pizza.id + "'>" + pizza.quantity + " x " + pizza.name + "<span class='right'> $ " + pizza.cost + ".00</span></li>";
    size = "<li class='hidden " + pizza.id +"'>Size: " + pizza.size + "</li>"
    console.log(pizza.toppings);
    console.log(pizza.instructions);
    if (pizza.toppings.length !== 0) {
      toppings = "<li class='hidden " + pizza.id +"'>Toppings: " + pizza.toppings.join(", ") + "</li>"
    }

    if(pizza.instructions !== "") {
      instructions = "<li class='hidden " + pizza.id +"'>Special Instructions: " + pizza.instructions + "</li>";
    }
    html += remove + name + size + toppings + instructions;
  });
  pizzasList.html(html);
  $("#total").html(listOfPizzasToDisplay.calculateTotal() + ".00");
}

function attachPizzaListeners() {
  $("ul#pizzas").on("click", "li", function(){
    $('.hidden').hide();
    $('li.' + this.id).toggle();
  });


  $("ul#pizzas").on("click", "span", function(){
    let id = ($(this).attr('class'));
    listOfPizzas.deletePizza(id);
    $('#' + id).remove();
    $('li.' + id).remove();
    $(this).remove();
    $("#total").html(listOfPizzas.calculateTotal() + ".00");
  });
}

$(document).ready(function(){
  attachPizzaListeners();

  $('input').click(function(){
    $('input:not(:checked)').parent().removeClass('checked');
    $('input:checked').parent().addClass('checked');
  });
  
  $('#pick-up-button').click(function(event) {
    event.preventDefault();
    $("#pick-up").slideDown();
    $("#delivery").slideUp();
    $('#start').show();
  });

  $('#delivery-button').click(function() {
    $("#delivery").slideDown();
    $("#pick-up").slideUp();
    $('#start').show();
  });

  $('#delivery-option').submit(function(event){
    event.preventDefault();
    $('#delivery-option').hide();
    $('#menu').show();
  })


  $('#custom-pizza').click(function(){
    $(".toppings").slideDown();
  });

  $(".classic-pizza").click(function(){
    $(".toppings").slideUp();
  });

  $("form#menu").submit(function (event){
    event.preventDefault();
    const name = $('input#name').val();
    const size = $('input[name="size"]:checked').val();
    const toppings = [];
    const quantity = parseInt($('select[name="quantity"] option:selected').val());
    const instructions = $('textarea#instructions').val();
    const pizzaStyle = $('input[name="pizza"]:checked').val();
    let pizzaName = "";
    //add toppings
    $('input[type="checkbox"]').each(function(){
      if(this.checked) {
        toppings.push($(this).val());
      }
    });

    switch (pizzaStyle) {
      case ('hawaiian'):
        toppings.push("chicken", "pineapple");
        pizzaName = "Hawaiian";
        break;
      case ('pepperoni'):
        toppings.push("cheese", "pepperoni", "tomatoes");
        pizzaName = "Pepperoni";
        break;
      case ('margarita'):
        toppings.push("cheese", "basil", "tomatoes");
        pizzaName = "Margarita";
        break;
      case ('custom'):
        $('input[type="checkbox"]').each(function(){
          if(this.checked) {
            toppings.push($(this).val());
          }
        });
        pizzaName = "Custom Pizza";
        break;
    }
    
    $('input').each(function() {
      if ($(this).val() === 'small' || $(this).val() === 'custom') {
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
    let newPizza = new Pizza(toppings, size, quantity, instructions, pizzaName);
    newPizza.cost = newPizza.calculatePrice();
    listOfPizzas.addPizza(newPizza);
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
    $('input#name').val("");
    listOfPizzas.clear();
  });

  $('button#clear-cart').click(function (){
    $('#toggle-cart').hide();
    $("ul#pizzas").empty();
    listOfPizzas.clear();
  });


  $('#toggle-cart').click(function (){
    $('#cart').toggle();
  });
  
});