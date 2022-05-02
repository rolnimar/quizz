import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuizzPage from './components/QuizzPage';
import { ApolloProvider } from "@apollo/react-hooks";
import client from './utils/apolloClient';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <ApolloProvider client={client}>
      <Routes>
          <Route exact path="/" element={<App />} />
          <Route path="/quizz" element={<QuizzPage />} />
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
