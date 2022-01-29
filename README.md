# Pizza Parlor

#### By Anastasiia Riabets

#### Pizza Parlor web-page

## Technologies Used

* CSS
* HTML
* JavaScript

## Description

Web-page for pizza company where a user can choose one or more individual toppings (cheese, pepperoni, tomatos, pineapple, etc) and a size to order a pizza and see the final cost.

## Setup/Installation Requirements

* [GitHub Page](https://anastasiia-ria.github.io/pizza-parlor/)
* [GitHub Repository](https://github.com/anastasiia-ria/pizza-parlor)
* Command line to clone:
  ```
  $ git clone https://github.com/anastasiia-ria/pizza-parlor.git
  ```

## Specifications

Describe: Pizza()

Test: "It should return a Pizza object with two properties for toppings and size"  
Code:  
const myPizza = new Pizza(["chicken","pineapple"], "large", 1, "not spicy");  
myPizza;  
Expected Output: Pizza {toppings: ['chicken', 'pineapple'], size: 'large', quantity: 1, instructions: 'not spicy', cost: undefined, name: 'Custom Pizza'}

Describe: Pizza.prototype.calculatePrice

Test: "It should return price based on the size and the qunatity of the toppings"  
Code:  
const myPizza = new Pizza(["chicken","pineapple"], "large", 1, "not spicy");  
myPizza.calculatePrice();  
Expected Output: 17;  

Describe: ListOfPizzas()

Test: "It should return properties of ListOfPizzas objects"  
Code:  
let listOfPizzas = new ListOfPizzas();  
listOfPizzas;  
Expected Output: ListOfPizzas {pizzas: {…}, currentId: 0}

Describe: ListOfPizzas.prototype.assignId

Test: "It should return a current id of the pizza object in ListOfPizzas"  
Code:   
let listOfPizzas = new ListOfPizzas();  
listOfPizzas.assignId();  
Expected Output: 1

Describe: ListOfPizzas.prototype.addPizza

Test: "It should return a list of pizzas"  
Code:  
const myPizza = new Pizza(["chicken","pineapple"], "large", 1, "not spicy");  
let listOfPizzas = new ListOfPizzas();  
listOfPizzas.addPizza(myPizza);  
listOfPizzas;  
Expected Output: ListOfPizzas {pizzas: {1: Pizza}, currentId: 1}

Describe: ListOfPizzas.prototype.findPizza

Test: "It should return a piiza object with matching id"  
Code:  
const myPizza = new Pizza(["chicken","pineapple"], "large", 1, "not spicy");  
let listOfPizzas = new ListOfPizzas();  
listOfPizzas.addPizza(myPizza);  
listOfPizzas.findPizza(1);  
Expected Output: Pizza {toppings: ['chicken', 'pineapple'], size: 'large', quantity: 1, instructions: 'not spicy', cost: undefined, name: 'Custom Pizza'}

Describe: ListOfPizzas.prototype.calculateTotal

Test: "It will return the total cost of all the pizzas in the list of pizzas"  
Code:  
const myPizza = new Pizza(["chicken","pineapple"], "large", 2, "not spicy", 15);  
let listOfPizzas = new ListOfPizzas();  
listOfPizzas.addPizza(myPizza);  
listOfPizzas.calculateTotal();  
Expected Output: 30

Describe:  ListOfPizzas.prototype.clear

Test: "It will delete all the pizzas from the list "  
Code:  
const myPizza = new Pizza(["chicken","pineapple"], "large", 2, "not spicy", 15);  
let listOfPizzas = new ListOfPizzas();  
listOfPizzas.addPizza(myPizza);  
listOfPizzas.clear();  
Expected Output: ListOfPizzas {pizzas: {…}, currentId: 0}

Describe:  ListOfPizzas.prototype.deletePizza

Test: "It will delete a pizza with passed id"  
Code:  
const myPizza = new Pizza(["chicken","pineapple"], "large", 2, "not spicy", 15);  
const myPizza2 = new Pizza(["chicken","pineapple"], "large", 2, "not spicy", 15);  
let listOfPizzas = new ListOfPizzas();  
listOfPizzas.addPizza(myPizza);  
listOfPizzas.addPizza(myPizza2);  
listOfPizzas.deletePizza(2);  
Expected Output: true
## Known Bugs

* 

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 01/28/2022 Anastasiia Riabets
