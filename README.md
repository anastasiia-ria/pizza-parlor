# Pizza Parlor

#### By Anastasiia Riabets

#### Pizza Parlor web-page

## Technologies Used

* CSS
* HTML
* JavaScript
* jQuery

## Description

Web-page for pizza company where a user can choose one or more individual toppings (cheese, pepperoni, tomatoes, pineapple, etc) and a size to order a pizza and see the final cost.

## Setup/Installation Requirements

* Click on or copy and paste this [GitHub Page](https://anastasiia-ria.github.io/pizza-parlor/) into your preferred browser:<br>https://anastasiia-ria.github.io/pizza-parlor/

  ***OR***

* Clone this repository to your Desktop:
  1. Your computer will need to have GIT installed. If you do not currently have GIT installed, follow [these](https://docs.github.com/en/get-started/quickstart/set-up-git) directions for installing and setting up GIT.
  2. Once GIT is installed, clone this repository by typing following commands in your command line:
      ```
      $ cd ~/Desktop
      $ git clone https://github.com/anastasiia-ria/pizza-parlor.git
      ```
  3. Open index.html by typing following command: 
      ```
      $ open ~/Desktop/pizza-parlor/index.html
      ```
      ***OR***

      Open "pizza-parlor" folder on your desktop and open "index.html" file in your browser.

## Specifications

Describe: Pizza()

Test: "It should return a Pizza object with two properties for toppings and size"  
Code:  
const myPizza = new Pizza(["chicken","pineapple"], "large", 1, "not spicy", "Custom Pizza");  
myPizza;  
Expected Output: Pizza {toppings: ['chicken', 'pineapple'], size: 'large', quantity: 1, instructions: 'not spicy', name: 'Custom Pizza', cost: undefined}

Describe: Pizza.prototype.calculatePrice

Test: "It should return price based on the size and the qunatity of the toppings"  
Code:  
const myPizza = new Pizza(["chicken","pineapple"], "large", 1, "not spicy", "Custom Pizza");  
myPizza.calculatePrice();  
Expected Output: 17;

Test: "It should return price based on the size and the qunatity of the toppings"  
Code:  
const myPizza = new Pizza(["tomatoes"], "small", 1, "not spicy", "Custom Pizza");  
myPizza.calculatePrice();  
Expected Output: 6;

Test: "It should return price based on the size and the qunatity of the toppings"  
Code:  
const myPizza = new Pizza(["tomatoes","sausages","mushrooms","cheese"], "medium", 1, "not spicy", "Custom Pizza");  
myPizza.calculatePrice();  
Expected Output: 14;

Describe: ListOfPizzas()

Test: "It should return properties of ListOfPizzas objects"  
Code:  
let listOfPizzas = new ListOfPizzas();  
listOfPizzas;  
Expected Output: ListOfPizzas {customer: undefined, pizzas: {…}, currentId: 0}

Describe: ListOfPizzas.prototype.assignId

Test: "It should return a current id of the pizza object in ListOfPizzas"  
Code:  
let listOfPizzas = new ListOfPizzas();  
listOfPizzas.assignId();  
Expected Output: 1

Describe: ListOfPizzas.prototype.addPizza

Test: "It should return a list of pizzas"  
Code:  
const myPizza = new Pizza(["chicken","pineapple"], "large", 1, "not spicy", "Custom Pizza");  
let listOfPizzas = new ListOfPizzas();  
listOfPizzas.addPizza(myPizza);  
listOfPizzas;  
Expected Output: ListOfPizzas {customer: undefined, pizzas: {1: Pizza}, currentId: 1}

Describe: ListOfPizzas.prototype.findPizza

Test: "It should return a piiza object with matching id"  
Code:  
const myPizza = new Pizza(["chicken","pineapple"], "large", 1, "not spicy", "Custom Pizza");  
let listOfPizzas = new ListOfPizzas();  
listOfPizzas.addPizza(myPizza);  
listOfPizzas.findPizza(1);  
Expected Output: Pizza {toppings: ['chicken', 'pineapple'], size: 'large', quantity: 1, instructions: 'not spicy', name: 'Custom Pizza', cost: undefined}

Describe: ListOfPizzas.prototype.calculateTotal

Test: "It will return the total cost of all the pizzas in the list of pizzas"  
Code:  
const Pizza1 = new Pizza(["chicken","pineapple"], "large", 2, "not spicy", "Custom Pizza", 17);   
let listOfPizzas = new ListOfPizzas();  
listOfPizzas.addPizza(Pizza1); 
listOfPizzas.calculateTotal();  
Expected Output: 34

Test: "It will return the total cost of all the pizzas in the list of pizzas"  
Code:  
const Pizza1 = new Pizza(["chicken","pineapple"], "large", 1, "not spicy", "Custom Pizza", 17);  
const Pizza2 = new Pizza(["tomatoes","mushrooms"], "medium", 2, "not spicy", "Custom Pizza", 12);  
let listOfPizzas = new ListOfPizzas();  
listOfPizzas.addPizza(Pizza1); 
listOfPizzas.addPizza(Pizza2);
listOfPizzas.calculateTotal();  
Expected Output: 41

Describe:  ListOfPizzas.prototype.clear

Test: "It will delete all the pizzas from the list "  
Code:  
const myPizza = new Pizza(["chicken","pineapple"], "large", 1, "not spicy", "Custom Pizza", 17);  
let listOfPizzas = new ListOfPizzas();  
listOfPizzas.addPizza(myPizza);  
listOfPizzas.clear();  
Expected Output: ListOfPizzas {customer: undefined, pizzas: {…}, currentId: 0}

Describe:  ListOfPizzas.prototype.deletePizza

Test: "It will delete a pizza with passed id"  
Code:  
const myPizza = new Pizza(["chicken","pineapple"], "large", 1, "not spicy", "Custom Pizza", 17);  
const myPizza2 = new Pizza(["chicken","pineapple"], "large", 1, "not spicy", "Custom Pizza", 17);  
let listOfPizzas = new ListOfPizzas();  
listOfPizzas.addPizza(myPizza);  
listOfPizzas.addPizza(myPizza2);  
listOfPizzas.deletePizza(2);  
Expected Output: true

Describe: ListOfPizzas.prototype.checkIfEmpty

Test: "It will return "true" if there are no pizzas in the pizzas list"  
Code:  
let listOfPizzas = new ListOfPizzas();  
listOfPizzas.checkIfEmpty();  
Expected Output: true

Describe: Customer()

Test: "It should return a Customer object with two properties for name, street, city, and zipcode"  
Code:  
const myCustomer = new Customer("name", "street", "city", "zipcode");  
myCustomer;  
Expected Output: Customer {name: 'name', street: 'street', city: 'city', zipcode: 'zipcode'}

## Known Bugs

* Layout is not adjusted for small screens

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 01/28/2022 Anastasiia Riabets
