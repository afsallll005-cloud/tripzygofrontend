import { useState } from "react";
import API from "../../../services/api";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./Signup.css";

function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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

    setErrors({
      ...errors,
      [e.target.name]: ""
    });

  };

  /* ================= VALIDATION ================= */

  const validate = () => {

    let tempErrors = {};

    // Name validation
    if (!form.name) {
      tempErrors.name = "Name is required";
    } else if (form.name.length < 3) {
      tempErrors.name = "Name must be at least 3 characters";
    }

    // Email validation
    if (!form.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = "Invalid email format";
    }

    // Password validation
    if (!form.password) {
      tempErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  /* ================= SUBMIT ================= */

  const submit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    try {

      const res = await API.post(
        "/auth/register",
        form
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      Swal.fire({
        icon: "success",
        title: "Account Created",
        text: "Welcome to TripzyGo 🎉",
        timer: 2000,
        showConfirmButton: false
      });

      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1500);

    } catch (err) {

      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text:
          err.response?.data?.message ||
          "Something went wrong"
      });

    }

  };

  return (

    <div className="signupPage">

      <div className="signupLeft">

        <div className="signupContent">

          <h1>Create Account</h1>

          <p>
            Join us and explore amazing
            travel packages.
          </p>

          <form onSubmit={submit}>

            {/* NAME */}
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
            />
            {errors.name && (
              <span className="error">
                {errors.name}
              </span>
            )}

            {/* EMAIL */}
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
            />
            {errors.email && (
              <span className="error">
                {errors.email}
              </span>
            )}

            {/* PASSWORD */}
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
            {errors.password && (
              <span className="error">
                {errors.password}
              </span>
            )}

            <button type="submit">
              Create Account
            </button>

          </form>

          <p className="loginText">

            Already have an account?

            <Link
              to="/login"
              className="loginBtn"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

      <div className="signupRight"></div>

    </div>

  );

}

export default Signup;