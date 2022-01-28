# Pizza Parlor

#### By Anastasiia Riabets

#### Pizza Parlor web-page

## Technologies Used

* CSS
* HTML
* JavaScript

## Description

Web-page for pizza company where a user can choose one or more individual toppings (cheese, pepperoni, artichoke, anchovy, etc) and a size to order a pizza and see the final cost.

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
const myPizza = new Pizza(["chicken","pineapple"], "large");
myPizza
Expected Output: Pizza {toppings: ['chicken', 'pineapple'], size: 'large'}

Describe: Pizza.prototype.calculatePrice

Test: "It should return price based on the size and the qunatity of the toppings"
Code:
const myPizza = new Pizza(["chicken","pineapple"], "large");
myPizza.calculatePrice();
Expected Output: 18;

Describe: ListOfPizzas()

Test: "It should return properties of ListOfPizzas objects"
Code: 
let listOfPizzas = new ListOfPizzas();
listOfPizzas
Expected Output: ListOfPizzas {pizzas: {…}, currentId: 0}

## Known Bugs

* 

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 01/28/2022 Anastasiia Riabets
