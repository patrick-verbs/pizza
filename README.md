# <a name="Pizza"></a>"Pizza Portal"
#### Patrick Lee | _[See this project on GitHub Pages](https://patrick-verbs.github.io/pizza-portal)_ _(...when it's live)_

## __If you're an Epicodus student__ (or anyone else!) you're free to use this README as a template for your own work :)
<details><summary><strong>Contents</strong></summary>
<ul>
  <li><a href="#About">About</a></li>
  <ul>
    <li><a href="#Description">Description</a></li>
    <li><a href="#Install">Installation & Setup</a></li>
    <li><a href="#Technologies">Technologies Used</a></li>
    <li><a href="#Bugs">Known Bugs</a></li>
    <li><a href="#Specs">Test Specs</a></li>
  </ul>
  <li><a href="#License">License</a></li>
  <li><a href="#Contact">Contact</a></li>
</ul>
</details>

# <a name="About"></a>About
###### _[Pizza Portal](https://github.com/patrick-verbs/pizza-portal) > About_
This project was initially created as an assignment. The goal was to demonstrate test-driven development practices and basic proficiency in object-oriented JavaScript by creating a "pizza parlor" website.

## <a name="Description"></a>Description
###### _[Pizza Portal](https://github.com/patrick-verbs/pizza-portal) > [About](#About) > Description_
forthcoming... :P

## <a name="Install"></a>Installation & Setup
###### _[Pizza Portal](https://github.com/patrick-verbs/pizza-portal) > [About](#About) > Installation & Setup_
The goal of this project is to demonstrate Test-Driven Development. To see this in action:
- Navigate to this project's [GitHub Pages site](https://github.com/patrick-verbs/pizza-portal) or open _index.html_ in your own cloned or forked repository
- Open your browser's JavaScript console on the page
- In a separate browser tab/window, head to the [Test Specs](#Specs) section below
- Find a table (headed with the word "__Describe__" followed by a function name)
- Read about what the function _should_ do on the "__Test__" row
- Input the code from the "__Code__" row into your open JavaScript console
- Compare your returned result to that which is described on the "__Expected Output__" row

This project's repository and contained source is available under the MIT License. If you want to have a look under the hood or use any and all components, have at it! If you have a GitHub account, you can Clone or Fork this repository.

## <a name="Technologies"></a>Technologies Used
###### _[Pizza Portal](https://github.com/patrick-verbs/pizza-portal) > [About](#About) > Technologies Used_
- __HTML5__
- __JavaScript__ with __[jQuery v. 3.6.0](https://jquery.com/)__
- __CSS3__ with __[Bootstrap 4.6](https://getbootstrap.com/docs/4.6/getting-started/introduction/)__

## <a name="Bugs"></a>Known Bugs
###### _[Pizza Portal](https://github.com/patrick-verbs/pizza-portal) > [About](#About) > Known Bugs_
- definitely fortcoming*...

###### *fort<em><strong>h</strong></em>coming

## <a name="Specs"></a>Test Specs
###### _[Pizza Portal](https://github.com/patrick-verbs/pizza-portal) > [About](#About) > Specs_
### Whiteboarding
UI logic
- Home screen ```[stretch]```
- Order screen ```[MVP]```
  - Enter name and/or address ```[stretch]```
  - Select pizza size ```[MVP]```
  - Select pizza toppings ```[MVP]```
  - Display real-time price ```[MVP]```
  - "Pay"/submit button with simple "thank you"/confirmation ```[MVP]```
- Results/confirmation screen ```[stretch]```

Business logic
- "Order" object constructor ```[stretch]```
  - contains "Pizza" objects
  - could contain other objects, like drinks or sides
- "Pizza" object constructor ```[MVP]```
  - "size" property ```[MVP]```
    - size name
    - size cost
    - only one can be chosen
  - "toppings" property ```[MVP]```
    - topping name
    - topping cost
    - multiple can be chosen (store in an array?)
- "Cost" prototype method ```[MVP]```
  - simple addition of individual costs ```[MVP]```
  - rules for pricepoints (e.g. first 3 toppings at same price, 4 or more toppings add the cost of each topping) ```[stretch]```

### Passing
| _Describe:_              | _Pizza()_ |
|--------------------------|--------------|
| __Test:__                | It constructs "Pizza" objects that contain a "size" property. |
| __Code 1:__              | ```const myPizza = new Pizza("medium");```<br>```myPizza;``` |
| __Expected Output 1:__   | ```Pizza {size: "medium"}``` |
|                          ||
|                          ||
|                          ||
| __Test:__                | It constructs Pizza objects that contain a "toppings" array in a property. |
| __Code 1:__              | ```const myPizza = new Pizza("medium");```<br>```myPizza;``` |
| __Expected Output 1:__   | ```Pizza {size: "medium", toppings: Array(0)}``` |
| __Code 2:__              | ```const myToppings = ["spinach", "sun-dried tomatoes", "roasted garlic"];```<br>```myPizza.toppings = myToppings;```<br>```myPizza;``` |
| __Expected Output 2:__   | ```Pizza {size: "medium", toppings:  Array(3)}``` |
|                          ||
|                          ||
|                          ||

<br>

| _Describe:_              | _Pizza.prototype.addTopping()_ |
|--------------------------|--------------|
| __Test:__                | It pushes a string onto the "toppings" property's array of Pizza objects. |
| __Code 1:__              | ```const myPizza = new Pizza("medium");```<br>```myPizza.addTopping("flowers");```<br>```myPizza.toppings;``` |
| __Expected Output 1:__   | ```["flowers"]``` |
|                          ||
|                          ||
|                          ||
| __Test:__                | It won't push items into the "toppings" property's array if there are already 12 items (or somehow more). |
| __Code 1:__              | ```const myPizza = new Pizza("medium");```<br>```const myToppings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, "daisies", "dandelions"];```<br>```myToppings.forEach(function(element) {```<br>```  myPizza.addTopping(element)```<br>```})```<br>```myPizza.toppings;``` |
| __Expected Output 1:__   | ```[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]``` |
| __Code 2:__              | ```myPizza.addTopping["daisies"];```<br>```myPizza.toppings;``` |
| __Expected Output 2:__   | ```[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]``` |
|                          ||
|                          ||
|                          ||
| __Test:__                | It adds toppings from the ```const all_toppings = [...]``` pseudo-database. |
| __Code 1:__              | ```const myPizza = new Pizza("medium");```<br>```myPizza.addTopping(all_toppings, "black olives");```<br>```myPizza.toppings[0].name;``` |
| __Expected Output 1:__   | ```"black olives"``` |
| __Code 2:__              | ```myPizza.toppings[0].ingredients;``` |
| __Expected Output 2:__   | ```["black olives (sliced)", "water", "salt", "ferrous gluconate (to stabilize color)"]``` |
|                          ||
|                          ||
|                          ||

| _Describe:_              | _LivingWage()_ |
|--------------------------|--------------|
| __Test:__                | It stores arbitrary "measurement" data (units & value) in a numerator and denominator. |
| __Code 1:__              | `livingWage = new LivingWage();`<br>`livingWage.numerator.number;` |
| __Expected Output 1:__   | `30.14` |
| __Code 2:__              | `livingWage.numerator.units;` |
| __Expected Output 2:__   | `["USD"]` |
| __Code 3:__              | `livingWage.denominator.number;` |
| __Expected Output 3:__   | `1` |
| __Code 4:__              | `livingWage.denominator.units;` |
| __Expected Output 4:__   | `["hour"]` |
|                          ||
|                          ||
|                          ||


---
### Failing/Untested
| _Describe:_              | __ |
|--------------------------|--------------|
| __Test:__                |  |
| __Code 1:__              |  |
| __Expected Output 1:__   |  |
| __Code 2:__              |  |
| __Expected Output 2:__   |  |
|                          ||
|                          ||
|                          ||
| __Test:__                |  |
| __Code 1:__              |  |
| __Expected Output 1:__   |  |
| __Code 2:__              |  |
| __Expected Output 2:__   |  |
|                          ||
|                          ||
|                          ||


---
### Template
| _Describe:_              | _testTemplate()_ |
|--------------------------|--------------|
| __Test:__                | It should do the thing! |
| __Code 1:__              | ```testTemplate("Do the thing!");``` |
| __Expected Output 1:__   | ```"So here's the thing..."``` |
|                          ||
|                          ||
|                          ||
| __Test:__                | It should also do this other thing... |
| __Code 1:__              | ```testTemplate("Another!");``` |
| __Expected Output 1:__   | ```"And another thing!"``` |

# <a name="License"></a>License
###### _[Pizza Portal](https://github.com/patrick-verbs/pizza-portal) > License_
<details>
<summary><a href="https://opensource.org/licenses/MIT"><strong>MIT</strong></a></summary>
<pre>
MIT License

Copyright (c) 2021 Patrick Lee

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</pre>
</details>

Copyright © 2021 Patrick Lee

# <a name="Contact"></a>Contact
###### _[Pizza Portal](https://github.com/patrick-verbs/pizza-portal) > Contact_
#### Patrick Lee | patricklee1138[at]live[dot]com