//Business Logic for Customer
function Customer(name, street, city, zipcode) {
  this.name = name;
  this.street = street;
  this.city = city;
  this.zipcode = zipcode;
}
// Business Logic for ListOfPizzas
function ListOfPizzas(customer) {
  this.customer = customer;
  this.pizzas = {};
  this.currentId = 0;
}

ListOfPizzas.prototype.checkIfEmpty = function() {
  let empty = true;
  for (let i = 1; i <= this.currentId; i++) {
    if (this.pizzas[i] !== undefined) {
      empty = false;
      break;
    }
  }
  if (empty) {
    this.currentId = 0;
  }
  return empty;
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

function displayCustomer() {
  let orderDetails = $("ul#order-details");
  let html = "";
  let name = "<li>Name: " + listOfPizzas.customer.name + "</li>";
  let street = "";
  let city = "";
  let zipcode = "";

  if (listOfPizzas.customer.street !== undefined) {
    street = "<li>Street: " + listOfPizzas.customer.street + "</li>";
    city = "<li>City: " + listOfPizzas.customer.city + "</li>";
    zipcode = "<li>Zipcode: " + listOfPizzas.customer.zipcode + "</li>";
  }

  html = name + street + city + zipcode;
  orderDetails.html(html);
}

function displayOrderedItems(listOfPizzasToDisplay) {
  let order = $('ul#order-pizzas');
  let html = "";
  let name = "";
  let size = "";
  let toppings = "";
  let instructions = "";

  Object.keys(listOfPizzasToDisplay.pizzas).forEach(function(key) {
    const pizza = listOfPizzasToDisplay.findPizza(key);
    
    name = "<li>" + pizza.quantity + " x " + pizza.name + "<span class='right'> $ " + pizza.cost + ".00</span></li>";
    size = "<li>Size: " + pizza.size + "</li>"
    if (pizza.toppings.length !== 0) {
      toppings = "<li>Toppings: " + pizza.toppings.join(", ") + "</li>"
    }

    if(pizza.instructions !== "") {
      instructions = "<li>Special Instructions: " + pizza.instructions + "</li>";
    }
    html += name + size + toppings + instructions;
  });
  order.html(html);
  $(".total").html(listOfPizzasToDisplay.calculateTotal() + ".00");
}

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
    if (pizza.toppings.length !== 0) {
      toppings = "<li class='hidden " + pizza.id +"'>Toppings: " + pizza.toppings.join(", ") + "</li>"
    }

    if(pizza.instructions !== "") {
      instructions = "<li class='hidden " + pizza.id +"'>Special Instructions: " + pizza.instructions + "</li>";
    }
    html += remove + name + size + toppings + instructions;
  });
  pizzasList.html(html);
  $(".total").html(listOfPizzasToDisplay.calculateTotal() + ".00");
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
    $(".total").html(listOfPizzas.calculateTotal() + ".00");
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

  $('#delivery-button').click(function(event) {
    event.preventDefault();

    $("#delivery").slideDown();
    $("#pick-up").slideUp();
    $('#start').show();
  });

  $('#delivery').submit(function(event){
    event.preventDefault();

    const name = $('input#del-name').val();
    const street = $('input#street').val();
    const city = $('input#city').val();
    const zipcode = $('input#zipcode').val();

    $('input#del-name').val("");
    $('input#street').val("");
    $('input#city').val("");
    $('input#zipcode').val("");

    let newCustomer = new Customer(name, street, city, zipcode);
    listOfPizzas.customer = newCustomer;

    $('#delivery-option').hide();
    $('#menu').show();
  });

  $('#pick-up').submit(function(event){
    event.preventDefault();

    const name = $('input#pick-name').val();
    $('input#pick-name').val("");

    let newCustomer = new Customer(name);
    listOfPizzas.customer = newCustomer;

    $('#delivery-option').hide();
    $('#menu').show();
  });

  $('#custom-pizza').click(function(){
    $(".toppings").addClass('flex');
  });

  $(".classic-pizza").click(function(){
    $(".toppings").removeClass('flex');
  });

  $("form#menu").submit(function (event){
    event.preventDefault();
    const size = $('input[name="size"]:checked').val();
    const toppings = [];
    const quantity = parseInt($('select[name="quantity"] option:selected').val());
    const instructions = $('textarea#instructions').val();
    const pizzaStyle = $('input[name="pizza"]:checked').val();
    $('textarea#instructions').val("");
    $("select").prop('selectedIndex', 0);

    let pizzaName = "";
    //add toppings
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
        $('input[name="topping"]').each(function(){
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

    
    let newPizza = new Pizza(toppings, size, quantity, instructions, pizzaName);
    newPizza.cost = newPizza.calculatePrice();
    listOfPizzas.addPizza(newPizza);
    displayPizzas(listOfPizzas);

    $('#cart').show();
    $('#main').addClass('border');
    $('#toggle-cart').show();
    $('.name').html(listOfPizzas.customer.name);

    $('button#checkout').click(function (){
      if (!listOfPizzas.checkIfEmpty()) {
        $('#main').hide();
        $('#menu').hide();
        $('#cart').hide();
        $('#main').removeClass('border');
        $('#thank-you').show();
        $("#order-pizzas.hidden").show();
        $(".remove").parent().remove();
        displayCustomer();
        displayOrderedItems(listOfPizzas);
      }
    });
  });

  $('button#back').click(function(){
    $('#menu').hide();
    $('#delivery-option').show();
    $('#cart').hide();
  });

  $('button#new-order').click(function (){
    $('#thank-you').hide();
    $('#toggle-cart').hide();
    $('#main').show();
    $('#delivery-option').show();
    $('input#name').val("");
    listOfPizzas.clear();
  });

  $('button#clear-cart').click(function (){
    $("ul#pizzas").empty();
    listOfPizzas.clear();
  });

  $('#toggle-cart').click(function (){
    $('#cart').toggle();
  });
  
});