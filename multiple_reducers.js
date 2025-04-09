const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

const reduxLogger = require("redux-logger");

const logger = reduxLogger.createLogger();

const applyMiddleware = redux.applyMiddleware;

const ORDER_PIZZA = "ORDER_PIZZA";
const ORDER_BURGER = "ORDER_BURGER";
function order_pizza() {
  return {
    type: ORDER_PIZZA,
    payload: 90,
  };
}
function order_burger() {
  return {
    type: ORDER_BURGER,
    payload: 90,
  };
}

const initilastatePizza = {
  pizzaBase: 100,
};
const initilastateBurger = {
  burgerBuns: 200,
};

//Reducres

const reducerPizza = (state = initilastatePizza, action) => {
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
const reducerBurger = (state = initilastateBurger, action) => {
  switch (action.type) {
    case "ORDER_BURGER":
      return {
        ...state,
        burgerBuns: state.burgerBuns - 1,
      };
    default:
      return state;
  }
};

const rootReducers = combineReducers({
  pizza: reducerPizza,
  burger: reducerBurger,
});
const store = createStore(rootReducers, applyMiddleware(logger));

console.log("intial Stae ", store.getState());
const unsubscribe = store.subscribe(() => {
  console.log("Updated State", store.getState());
});
store.dispatch(order_burger());
unsubscribe();
