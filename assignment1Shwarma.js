const Order = require("./assignment1Order");

const OrderState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  LOGIN: Symbol("login"),
  ORDER1: Symbol("order1"),
  ORDER2: Symbol("order2"),
  SIZE1: Symbol("size1"),
  SIZE2: Symbol("size2"),
  TOPPINGS1: Symbol("toppings1"),
  TOPPINGS2: Symbol("toppings2"),
  DRINKS: Symbol("drinks"),
});

module.exports = class ShwarmaOrder extends (
  Order
) {
  constructor() {
    super();
    this.stateCur = OrderState.WELCOMING;
    this.sLogin = "";
    this.sOrder1 = "";
    this.sOrder2 = "";
    this.sSize1 = "";
    this.sSize2 = "";
    this.sTopping1 = "";
    this.sTopping2 = "";
    this.sDrinks = "";
    this.sItem1 = "shawarma";
    this.sItem2 = "fries";
  }

  handleInput(sInput) {
    let aReturn = [];
    const convertSize1 = Number(this.sSize1);
    const convertSize2 = Number(this.sSize2);
    const sumSize = convertSize1 + convertSize2;
    const totalCostForOrder1 = convertSize1 * 2;
    const totalCostForOrder2 = convertSize2 * 2;
    const totalCost = totalCostForOrder1 + totalCostForOrder2;
    console.log(sumSize);
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        this.stateCur = OrderState.LOGIN;
        aReturn.push("Welcome to Franklin's Kitchen");
        aReturn.push("Sign in with your Username");
        break;
      case OrderState.LOGIN:
      case OrderState.LOGIN:
        this.stateCur = OrderState.ORDER1;
        this.sLogin = sInput;
        aReturn.push(
          `Authenticating User with username ${this.sLogin}.............`
        );
        aReturn.push(`${this.sLogin} signed in successfully `);
        aReturn.push(
          `We have:<br/>${this.sItem1} and ${this.sItem2} on our menu`
        );
        aReturn.push("Please Make your order");
        break;
      case OrderState.ORDER1:
        this.stateCur = OrderState.SIZE1;
        this.sOrder1 = sInput;
        if (this.sOrder1 == "shawarma" || this.sOrder1 == "fries") {
          aReturn.push(
            `What size of ${this.sOrder1} would you like? Add number(s) only`
          );
        } else {
          aReturn.push(
            `We dont serve ${this.sOrder1}. We serve only ${this.sItem1} or ${this.sItem2}`
          );
          aReturn.push(
            `What size of ${this.sItem1} or ${this.sItem2} would you like? Add number(s) only`
          );
        }
        break;
      case OrderState.SIZE1:
        this.stateCur = OrderState.TOPPINGS1;
        this.sSize1 = sInput;
        aReturn.push(`What toppings would you like? Example: spicy pepper`);
        break;
      case OrderState.TOPPINGS1:
        this.stateCur = OrderState.ORDER2;
        this.sToppings1 = sInput;
        aReturn.push("Make your second order from the menu");
        break;
      case OrderState.ORDER2:
        this.stateCur = OrderState.SIZE2;
        this.sOrder2 = sInput;
        if (this.sOrder2 == "shawarma" || this.sOrder2 == "fries") {
          aReturn.push(
            `What size of ${this.sOrder2} would you like? Add number(s) only`
          );
        } else {
          aReturn.push(
            `We dont have ${this.sOrder2} in our Menu. We serve only ${this.sItem1} or ${this.sItem2}`
          );
          aReturn.push(
            `What size of ${this.sItem1} or ${this.sItem2} would you like? Add number(s) only`
          );
        }
        break;
      case OrderState.SIZE2:
        this.stateCur = OrderState.TOPPINGS2;
        this.sSize2 = sInput;
        aReturn.push(`What toppings would you like ?`);
        break;
      case OrderState.TOPPINGS2:
        this.stateCur = OrderState.DRINKS;
        this.sToppings2 = sInput;
        aReturn.push(
          "Would you like drink(s) with that? if yes, What type? if no indicat with " +
            "'no'"
        );
        break;
      case OrderState.DRINKS:
        this.isDone(true);
        if (sInput.toLowerCase() != "no") {
          this.sDrinks = sInput;
        }
        aReturn.push("Thank-you for your order");
        aReturn.push(`Your order is as folllows:
          Your first order is ${this.sOrder1} of size ${this.sSize1} with ${this.sToppings1} <br/>
          Your second order is ${this.sOrder2} of size ${this.sSize2} with ${this.sToppings2}<br/>
          Total size = ${this.sSize1} + ${this.sSize2} = ${sumSize}<br/>
          Total cost for first order at $2 per item = ${totalCostForOrder1}<br/>
          Total cost for second order at $2 per item = ${totalCostForOrder2}<br/>
          Sum total = $${totalCost}`);

        if (this.sDrinks) {
          aReturn.push(`Any Drink? : ${this.sDrinks}`);
          aReturn.push("Drinks are free");
        }
        let d = new Date();
        d.setMinutes(d.getMinutes() + 20);
        aReturn.push(`Please pick it up at ${d.toTimeString()}`);
        break;
      default:
        aReturn.push("Sorry we are Closed");
        break;
    }
    return aReturn;
  }
};
