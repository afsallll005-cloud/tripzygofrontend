import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  adminOnly = false
}) {

  /* ================= GET TOKEN ================= */

  const token =
    localStorage.getItem("token");

  /* ================= GET ROLE ================= */

  const role =
    localStorage.getItem("role");

  /* ================= NOT LOGGED IN ================= */

  if (!token) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }

  /* ================= ADMIN CHECK ================= */

  if (
    adminOnly &&
    role?.toLowerCase() !== "admin"
  ) {

    return (
      <Navigate
        to="/"
        replace
      />
    );

  }

  /* ================= ALLOW ACCESS ================= */

  return children;

}

export default ProtectedRoute;