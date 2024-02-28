import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css"

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [exp, setExp] = useState(0)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
        firstname,
        lastname,
        exp
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("makeAvatar");
    }
  };

  return (
    <div id="signup-all">
      <section className="signupSection">
      <h1>Sign Up</h1>
      {errors.server && <p className="errors">{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <div className="text-box-signup">
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </label>
        </div>
        {errors.email && <p className="errors">{errors.email}</p>}
        <div className="text-box-signup">
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
        </label>
        </div>
        {errors.username && <p className="errors">{errors.username}</p>}
        <div className="text-box-signup">
        <label>
          First Name
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
            />
        </label>
        </div>
        {errors.firstname && <p className="errors">{errors.firstname}</p>}
        <div className="text-box-signup">
        <label>
          Last Name
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
            />
        </label>
        </div>
        {errors.lastname && <p className="errors">{errors.lastname}</p>}
        <div className="text-box-signup">
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </label>
        </div>
        {errors.password && <p className="errors">{errors.password}</p>}
        <div className="text-box-signup">
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />
        </label>
        </div>
        {errors.confirmPassword && <p className="errors">{errors.confirmPassword}</p>}
        <div className="submit-button">
        <button type="submit">Sign Up</button>
        </div>
      </form>
      </section>
    </div>
  );
}

export default SignupFormPage;
