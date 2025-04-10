const redux = require("redux");
const createStore = redux.createStore;
const logger = require("redux-logger");
const applyMiddleware = redux.applyMiddleware;
const thunk = require("redux-thunk").thunk;

const axios = require("axios");

const FETCH_REQUEST = "FETCH_REQUEST";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";

//state

const initialState = {
  loading: false,
  product: [],
  error: false,
};

// action creator

function fetch_request() {
  return {
    type: FETCH_REQUEST,
  };
}

function fetch_success(product) {
  return {
    type: FETCH_SUCCESS,
    payload: product,
  };
}

function fetch_error() {
  return {
    type: FETCH_ERROR,
  };
}

// reducres

const reducres = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

      break;

    default:
      break;
  }
};

// thunk action creator

const fetchProducts = () => {
  return function (dispatch) {
    dispatch(fetch_request());
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        const products = res.data.map((o) => o.title);
        // console.log(products);

        dispatch(fetch_success(products));
      })
      .catch((error) => {
        dispatch(fetch_error());
      });
  };
};

const store = createStore(reducres, applyMiddleware(thunk));
store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchProducts());
