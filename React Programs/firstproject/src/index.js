import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ShoppingComponent from './ShoppingComponent';
import Price from './Price';
import Music  from './lifecycle';
import App from './contextDemo';
import Product from './hooks';

function LoginComponent(){
    return(
      <div>
        <Header />
        <h2>Login Page</h2>
        <p>This is login page and we are creating a form for the user.</p>
        <form>
          <label>User Name : </label>
          <input type='text' name='username' />
          <br/>
          <br/>
          <label>Password : </label>
          <input type='password' name='password' />
          <br />
          <br />
          <input type='submit' value='Login' />
        </form>
        {/* <ShoppingComponent /> */}
        <Footer />
      </div>
    )
}

function Header(){
    return (
      <h1>Welcome! to keysight login Form </h1>
    )
}

function Footer(){
    return(
      <h1>Thank you for visiting to keysight login form </h1>
    )
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Product />);