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

ListOfPizzas.prototype.checkIfEmpty = function () {
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
};

ListOfPizzas.prototype.addPizza = function (pizza) {
  pizza.id = this.assignId();
  this.pizzas[pizza.id] = pizza;
};

ListOfPizzas.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
};

ListOfPizzas.prototype.findPizza = function (id) {
  if (this.pizzas[id] != undefined) {
    return this.pizzas[id];
  }
  return false;
};

ListOfPizzas.prototype.calculateTotal = function () {
  let total = 0;
  for (let i = 1; i <= this.currentId; i++) {
    if (this.pizzas[i] !== undefined) {
      const pizza = this.findPizza(i);
      total += pizza.cost * pizza.quantity;
    }
  }
  return total;
};

ListOfPizzas.prototype.clear = function () {
  for (let i = 1; i <= this.currentId; i++) {
    delete this.pizzas[i];
  }
  this.currentId = 0;
};

ListOfPizzas.prototype.deletePizza = function (id) {
  if (this.pizzas[id] === undefined) {
    return false;
  }
  delete this.pizzas[id];
  return true;
};

// Business logic for Pizza
function Pizza(toppings, size, quantity, instructions, name, cost) {
  this.toppings = toppings;
  this.size = size;
  this.quantity = quantity;
  this.instructions = instructions;
  this.name = name;
  this.cost = cost;
}

Pizza.prototype.calculatePrice = function (id) {
  const toppingsQuantity = this.toppings.length;
  let cost = toppingsQuantity * 1;

  switch (this.size) {
    case "small":
      cost += 5;
      break;
    case "medium":
      cost += 10;
      break;
    case "large":
      cost += 15;
      break;
    default:
      cost += 1;
  }

  return cost;
};

// User Interface Logic
let listOfPizzas = new ListOfPizzas();
//Colorize checked input on default
function defaultColor() {
  $('input[name="size').each(function () {
    let value = $(this).val();
    if (value === "small") {
      $(this).prop("checked", true);
      $(this)
        .prev("img")
        .attr("src", "../img/size/colored/" + value + ".png");
    } else {
      $(this).prop("checked", false);
      $(this)
        .prev("img")
        .attr("src", "../img/size/" + value + ".png");
    }
  });

  $('input[name="pizza').each(function () {
    let value = $(this).val();
    if (value === "pepperoni") {
      $(this).prop("checked", true);
      $(this)
        .prev("img")
        .attr("src", "../img/pizza/colored/" + value + ".png");
    } else {
      $(this).prop("checked", false);
      $(this)
        .prev("img")
        .attr("src", "../img/pizza/" + value + ".png");
    }
  });

  $('input[name="topping"]').each(function () {
    let value = $(this).val();
    $(this).prop("checked", false);
    $(this)
      .prev("img")
      .attr("src", "../img/topping/" + value + ".png");
  });
}
//Colorize checked input on click
function colorizeOnClick() {
  $('input[name = "topping"]').click(function () {
    let name = $(this).attr("name");
    let value = $(this).val();
    $("input[name=" + name + "]#" + value + ":not(:checked)")
      .prev("img")
      .attr("src", "../img/" + name + "/" + value + ".png");
    $("input[name=" + name + "]#" + value + ":checked")
      .prev("img")
      .attr("src", "../img/" + name + "/colored/" + value + ".png");
  });

  $('input[name="pizza').click(function () {
    let value = $(this).val();
    $('input[name="pizza"]:not(:checked)')
      .prev("img")
      .attr("src", "../img/pizza/" + value + ".png");
    $('input[name="pizza"]:checked')
      .prev("img")
      .attr("src", "../img/pizza/colored/" + value + ".png");
  });

  $('input[name="size').click(function () {
    let value = $(this).val();
    $('input[name="size"]#small:not(:checked)').prev("img").attr("src", "../img/size/small.png");
    $('input[name="size"]#medium:not(:checked)').prev("img").attr("src", "../img/size/medium.png");
    $('input[name="size"]#large:not(:checked)').prev("img").attr("src", "../img/size/large.png");
    $('input[name="size"]:checked')
      .prev("img")
      .attr("src", "../img/size/colored/" + value + ".png");
  });
}
//Display customer details
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
//Display order details
function displayOrderedItems(listOfPizzasToDisplay) {
  let order = $("ul#order-pizzas");
  let html = "";
  let name = "";
  let size = "";
  let toppings = "";
  let instructions = "";

  Object.keys(listOfPizzasToDisplay.pizzas).forEach(function (key) {
    const pizza = listOfPizzasToDisplay.findPizza(key);

    name = "<li>" + pizza.quantity + " x " + pizza.name + "<span class='right'> $ " + pizza.cost + ".00</span></li>";
    size = "<li>Size: " + pizza.size + "</li>";
    if (pizza.toppings.length !== 0) {
      toppings = "<li>Toppings: " + pizza.toppings.join(", ") + "</li>";
    }

    if (pizza.instructions !== "") {
      instructions = "<li>Special Instructions: " + pizza.instructions + "</li>";
    }

    html += name + size + toppings + instructions;
  });

  order.html(html);
  $(".total").html(listOfPizzasToDisplay.calculateTotal() + ".00");
}
//Display order details in cart
function displayPizzas(listOfPizzasToDisplay) {
  let pizzasList = $("ul#pizzas");
  let html = "";
  let remove = "";
  let name = "";
  let size = "";
  let toppings = "";
  let instructions = "";

  Object.keys(listOfPizzasToDisplay.pizzas).forEach(function (key) {
    const pizza = listOfPizzasToDisplay.findPizza(key);
    remove = "<span class='" + pizza.id + "'><span class='remove'>X</span></span>";
    name = "<li class='pizza-name' id='" + pizza.id + "'>" + pizza.quantity + " x " + pizza.name + "<span class='right'> $ " + pizza.cost + ".00</span></li>";
    size = "<li class='hidden " + pizza.id + "'>Size: " + pizza.size + "</li>";
    if (pizza.toppings.length !== 0) {
      toppings = "<li class='hidden " + pizza.id + "'>Toppings: " + pizza.toppings.join(", ") + "</li>";
    }

    if (pizza.instructions !== "") {
      instructions = "<li class='hidden " + pizza.id + "'>Special Instructions: " + pizza.instructions + "</li>";
    }

    html += remove + name + size + toppings + instructions;
  });

  pizzasList.html(html);
  $(".total").html(listOfPizzasToDisplay.calculateTotal() + ".00");
}
//attach listenrs to the cart list items
function attachPizzaListeners() {
  $("ul#pizzas").on("click", "li", function () {
    $(".hidden").hide();
    $("li." + this.id).toggle();
  });
  $("ul#pizzas").on("click", "span", function () {
    let id = $(this).attr("class");
    listOfPizzas.deletePizza(id);
    $("#" + id).remove();
    $("li." + id).remove();
    $(this).remove();
    $(".total").html(listOfPizzas.calculateTotal() + ".00");
  });
}

$(document).ready(function () {
  attachPizzaListeners();

  colorizeOnClick();
  defaultColor();
  //buttons to open different delivery options forms
  $("#pick-up-button").click(function (event) {
    event.preventDefault();

    $("#pick-up").slideDown();
    $("#delivery").slideUp();
    $("#start").show();
  });

  $("#delivery-button").click(function (event) {
    event.preventDefault();

    $("#delivery").slideDown();
    $("#pick-up").slideUp();
    $("#start").show();
  });
  //submit customer info
  $("#delivery").submit(function (event) {
    event.preventDefault();

    const name = $("input#del-name").val();
    const street = $("input#street").val();
    const city = $("input#city").val();
    const zipcode = $("input#zipcode").val();

    $("input#del-name").val("");
    $("input#street").val("");
    $("input#city").val("");
    $("input#zipcode").val("");

    let newCustomer = new Customer(name, street, city, zipcode);
    listOfPizzas.customer = newCustomer;

    $("#delivery-option").hide();
    $("#delivery").hide();
    $("#menu").show();
    $("#order-delivery").html("Delivery");
  });

  $("#pick-up").submit(function (event) {
    event.preventDefault();

    const name = $("input#pick-name").val();
    $("input#pick-name").val("");

    let newCustomer = new Customer(name);
    listOfPizzas.customer = newCustomer;

    $("#delivery-option").hide();
    $("#pick-up").hide();
    $("#menu").show();
    $("#order-delivery").html("Pick Up");
  });
  //open or close custom pizza toppings
  $("#custom-pizza").click(function () {
    $("#toppings").slideDown();
  });

  $(".classic-pizza").click(function () {
    $("#toppings").slideUp();
  });
  //menu submit button
  $("form#menu").submit(function (event) {
    event.preventDefault();
    //get values
    const size = $('input[name="size"]:checked').val();
    const toppings = [];
    const quantity = parseInt($('select[name="quantity"] option:selected').val());
    const instructions = $("textarea#instructions").val();
    const pizzaStyle = $('input[name="pizza"]:checked').val();
    let pizzaName = "";
    //add toppings and name
    switch (pizzaStyle) {
      case "hawaiian":
        toppings.push("chicken", "pineapple");
        pizzaName = "Hawaiian";
        break;
      case "pepperoni":
        toppings.push("cheese", "pepperoni", "tomatoes");
        pizzaName = "Pepperoni";
        break;
      case "margherita":
        toppings.push("cheese", "basil", "tomatoes");
        pizzaName = "Margherita";
        break;
      case "custom":
        $('input[name="topping"]').each(function () {
          if (this.checked) {
            toppings.push($(this).val());
          }
        });
        pizzaName = "Custom Pizza";
        break;
    }
    //create object
    let newPizza = new Pizza(toppings, size, quantity, instructions, pizzaName);
    newPizza.cost = newPizza.calculatePrice();
    listOfPizzas.addPizza(newPizza);
    displayPizzas(listOfPizzas);
    //reset values
    $("textarea#instructions").val("");
    $("select").prop("selectedIndex", 0);
    $("#toppings").slideUp();
    defaultColor();
    //show cart
    $("#cart").show();
    $("#main").addClass("border");
    $("#toggle-cart").show();
    $(".name").html(listOfPizzas.customer.name);
  });
  //change delivery option
  $("button#back").click(function () {
    $("#menu").hide();
    $("#delivery-option").show();
    $("#cart").hide();
  });
  //toggle cart icon
  $("#toggle-cart").click(function () {
    $("#cart").toggle();
  });
  //clear cart button
  $("button#clear-cart").click(function () {
    $("ul#pizzas").empty();
    listOfPizzas.clear();
  });
  //checkout button
  $("button#checkout").click(function () {
    if (!listOfPizzas.checkIfEmpty()) {
      $("#main").hide();
      $("#menu").hide();
      $("#cart").hide();
      $("#main").removeClass("border");
      $("#thank-you").show();
      $("#order-pizzas.hidden").show();
      $(".remove").parent().remove();
      displayCustomer();
      displayOrderedItems(listOfPizzas);
    } else {
      $("#error").show().delay(2000).fadeOut();
    }
  });
  //start new order
  $("button#new-order").click(function () {
    $("#thank-you").hide();
    $("#toggle-cart").hide();
    $("#main").show();
    $("#delivery-option").show();
    $("input#name").val("");
    listOfPizzas.clear();
  });
});
