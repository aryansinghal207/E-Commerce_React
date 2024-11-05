import React, { useState, useRef } from 'react';
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from 'react-icons/fa';
import './login.css'

function App() {
  const [isRightPanelActive, setRightPanelActive] = useState(false);
  const [error, setError] = useState(''); // State for error messages
  const emailRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const unameRef = useRef();
  const pwdRef = useRef();

  const handleSignUpClick = () => setRightPanelActive(true);
  const handleSignInClick = () => setRightPanelActive(false);

  const signup = (event) => {
      event.preventDefault();
      const email = emailRef.current.value;
      const userName = userNameRef.current.value;
      const password = passwordRef.current.value;

      if (!email || !userName || !password) {
          alert("All fields are required!");
          return;
      }

      const user = { email, userName, password };
      localStorage.setItem(userName, JSON.stringify(user));
      alert('Signup successful!');
      
      // Clear fields after successful signup
      emailRef.current.value = '';
      userNameRef.current.value = '';
      passwordRef.current.value = '';
  };

  const validate = (event) => {
      event.preventDefault();
      const u = unameRef.current.value;
      const p = pwdRef.current.value;
      const storedUser = localStorage.getItem(u);

      if (storedUser) {
          const user = JSON.parse(storedUser);
          if (u === user.userName && p === user.password) {
              alert("Login Successful");
              setError('');  // Clear error message on successful login
              setTimeout(() => window.location.href = "index.html", 500);
          } else {
              setError("Invalid Username or Password");
          }
      } else {
          setError("User does not exist");
          alert("User not found, please sign up.");
      }
  };

    return (
        <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
            <div className="form-container sign-up-container">
                <form onSubmit={signup}>
                    <h1>Create Account</h1>
                    <div className="social-container">
                        <a href="https://www.facebook.com/login.php/" className="social"><FaFacebookF /></a>
                        <a href="https://accounts.google.com/signin" className="social"><FaGooglePlusG /></a>
                        <a href="https://www.linkedin.com/login" className="social"><FaLinkedinIn /></a>
                    </div>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" ref={userNameRef} />
                    <input type="email" placeholder="Email" ref={emailRef} />
                    <input type="password" placeholder="Password" ref={passwordRef} />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form onSubmit={validate}>
                    <h1>Sign in</h1>
                    <div className="social-container">
                        <a href="https://www.facebook.com/login.php/" className="social"><FaFacebookF /></a>
                        <a href="https://accounts.google.com/signin" className="social"><FaGooglePlusG /></a>
                        <a href="https://www.linkedin.com/login" className="social"><FaLinkedinIn /></a>
                    </div>
                    <span>or use your username</span>
                    <input type="text" placeholder="Name" ref={unameRef} />
                    <input type="password" placeholder="Password" ref={pwdRef} />
                    <p id="error"></p>
                    <a href="#">Forgot your password?</a>
                    <button type="submit">Login</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="me" onClick={handleSignInClick}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello!</h1>
                        <p>Enter your personal details and start your tech journey with us</p>
                        <button className="me" onClick={handleSignUpClick}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
