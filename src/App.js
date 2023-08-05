import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './actions';
import './App.css';

// Redux Actions
const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';

// Redux Reducer
const initialState = {
  posts: [],
  loading: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

// Redux Action Creators
const fetchPostsSuccess = (data) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: data,
});

// Redux Thunk
const fetchPostsThunk = () => (dispatch) => {
  dispatch({ type: 'LOADING' });
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => dispatch(fetchPostsSuccess(data)));
};

// Redux Store
const { createStore, applyMiddleware } = require('redux');
const thunkMiddleware = require('redux-thunk').default;

const store = createStore(appReducer, applyMiddleware(thunkMiddleware));

// Components
const Home = () => {
  const posts = useSelector((state) => state.posts);

  return (
    <div className="home">
      <h1>Home Page</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/item/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Detail = () => {
  const { id } = useParams();
  const posts = useSelector((state) => state.posts);
  const post = posts.find((item) => item.id === Number(id));

  return (
    <div className="detail">
      {post ? (
        <>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <p>User ID: {post.userId}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

// App Component
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostsThunk());
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <h1>Multi-page React App</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/:id" element={<Detail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
