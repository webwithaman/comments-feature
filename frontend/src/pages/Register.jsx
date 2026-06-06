import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
      );

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      console.log("User registered:", res.data);
      alert("User Registered Successfully");
      navigate("/login");
    } catch (err) {
      console.error("error", err.response.data);
      alert(err.response.data.message);
    }
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="nameInput" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={changeHandler}
            value={formData.name}
            id="nameInput"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">
            Email address
          </label>
          <input
            type="email"
            onChange={changeHandler}
            name="email"
            value={formData.email}
            className="form-control"
            id="inputEmail"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={changeHandler}
            value={formData.password}
            className="form-control"
            id="inputPassword"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>

      <button className="btn btn-secondary mt-5 me-3">
        <Link className="text-light text-decoration-none" to="/login">
          Login
        </Link>
      </button>

      <button className="btn btn-warning mt-5">
        <Link className="text-light text-decoration-none" to="/dashboard">
          Dashboard
        </Link>
      </button>
    </div>
  );
};

export default Register;
