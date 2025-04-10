const axios = require("axios");
const redux = require("redux");
const createStore = redux.createStore;
const thunk = require("redux-thunk").thunk;

const applyMiddleware = redux.applyMiddleware;

const FetchSuccess = "fetchSuccess";
const FetchLoading = "fetchLoading";
const FetchError = "fetchError";




const initialState = {
    loading: false,
    users: [],
    error: false,
  };
  
// action creator

function fetch_success(user) {
  return {
    type: FetchSuccess,
    payload: user,
  };
}

function fetch_error() {
  return {
    type: FetchError,
  };
}

function fetch_request() {
  return {
    type: FetchLoading,
  };
}



const reducres = (state = initialState, action) => {
  switch (action.type) {
    case FetchLoading:
      return {
        ...state,
        loading: true,
      };
    case FetchSuccess:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case FetchError:
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

const fetchData = () => {
  return function (dispatch) {
    dispatch(fetch_request());

    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        const users = res.data.map((o) => o.title);
        dispatch(fetch_success(users));
      })
      .catch((error) => dispatch(fetch_error()));
  };
};

const store = createStore(reducres, applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));

store.dispatch(fetchData());
