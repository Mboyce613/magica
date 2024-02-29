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

  const handleDemoUser = async (e) => {
    e.preventDefault();
    setErrors({});
    setEmail('demo@aa.io')
    setPassword('password')

    const demoEmail = 'demo@aa.io'
    const demoPassword = 'password'

    const serverResponse = await dispatch(
      thunkLogin({
        'email': demoEmail,
        'password': demoPassword,
      })
    );
    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("home");
    }
  };

  return (
    <div id="login-all">
      <section className="loginSection">
        <h1>Log In</h1>
        {errors.length > 0 &&
          errors.map((message) => <p key={message}>{message}</p>)}
        <form onSubmit={handleSubmit}>
          <div className="text-box-signup">
            <label>
              Email
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          {errors.email && <p>{errors.email}</p>}
          <div className="text-box-signup">
            <label>
              Passwords
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          {errors.password && <p>{errors.password}</p>}
          <div className="submit-button">
            <button type="submit">Log In</button>
          </div>
        </form>
        <button onClick={handleDemoUser}>Demo User</button>
      </section>
    </div>
  );
}

export default LoginFormPage;
