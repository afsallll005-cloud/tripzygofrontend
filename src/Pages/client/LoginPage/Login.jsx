import { useState } from "react";
import API from "../../../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import Swal from "sweetalert2";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    // clear error while typing
    setErrors({
      ...errors,
      [e.target.name]: ""
    });

  };

  /* ================= VALIDATION ================= */

  const validate = () => {

    let tempErrors = {};

    // Email check
    if (!form.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = "Invalid email format";
    }

    // Password check
    if (!form.password) {
      tempErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  /* ================= LOGIN SUBMIT ================= */

  const submit = async (e) => {

    e.preventDefault();

    // stop if invalid
    if (!validate()) return;

    try {

      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      localStorage.setItem(
        "role",
        res.data.user.role
      );

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back to TripzyGo",
        timer: 2000,
        showConfirmButton: false
      });

      setTimeout(() => {

        const role =
          res.data.user.role?.toLowerCase();

        if (role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }

      }, 1500);

    } catch (err) {

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          err.response?.data?.message ||
          "Invalid email or password"
      });

    }

  };

  return (

    <div className="loginPage">

      <div className="loginRight"></div>

      <div className="loginCard">

        <div>

          {/* <h2 className="logo">TripzyGo</h2> */}

          <p className="launchTag">
            LOGIN TO YOUR ACCOUNT
          </p>

          <h1 className="loginTitle">
            Welcome back to TripzyGo
          </h1>

          <p className="loginDesc">
            Login to explore travel packages
            and manage bookings.
          </p>

          <form onSubmit={submit} className="loginForm">

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="name@domain.com"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="error">
                {errors.email}
              </span>
            )}

            {/* PASSWORD */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="error">
                {errors.password}
              </span>
            )}

            <button type="submit">
              Login
            </button>

          </form>

          <p className="signupText">

            Don't have an account?

            <Link to="/signup">
              {" "}Sign Up
            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Login;