const redux = require("redux");
const createStore = redux.createStore;

//Action Creator
function order_pizza() {
  return {
    type: "ORDER_PIZZA",
    payload: 90,
  };
}

//initilastate

const initilastate = {
  pizzaBase: 100,
  // toppings: ["mayo", "capsicum"],
};

//Reducres

const reducer = (state = initilastate, action) => {
  switch (action.type) {
    case "ORDER_PIZZA":
      return {
        ...state,
        pizzaBase: state.pizzaBase - 1,
      };
    default:
      return state;
  }
};

//store

//1) - Store need to hold appication state

const store = createStore(reducer);

//2)it exposes  method called getState which give your application access to the current store in the state

console.log("intial Stae ",store.getState());

//3) Regiter Listners Via Subscribe (listeners)

const unsubscribe = store.subscribe(() => {
  console.log("Updated State", store.getState());
});

//4) Allow state to update  via dispatch

store.dispatch(order_pizza());
store.dispatch(order_pizza());
store.dispatch(order_pizza());
store.dispatch(order_pizza());
store.dispatch(order_pizza());
store.dispatch(order_pizza());
unsubscribe()