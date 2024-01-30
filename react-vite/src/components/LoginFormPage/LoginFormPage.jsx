import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="home" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("home");
    }
  };

  const handleDemoUser = async (e)=>{
    e.preventDefault();
    setErrors({});
    setEmail('demo@aa.io')
    setPassword('password')

    const demoEmail = 'demo@aa.io'
    const demoPassword = 'password'

    const serverResponse = await dispatch(
      thunkLogin({
        'email':demoEmail,
        'password':demoPassword,
      })
    );
    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("home");
    }
  };

  return (
    <>
    <section className="signupForm">
      <section className="loginSection">
      <h1>Log In</h1>
      {errors.length > 0 &&
        errors.map((message) => <p key={message}>{message}</p>)}
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Passwords
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit">Log In</button>
      </form>
        <button onClick={handleDemoUser}>Demo User</button>
        </section>
        </section>
    </>
  );
}

export default LoginFormPage;
