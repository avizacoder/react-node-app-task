import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./user.css";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: SignupErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks")
  }, [isAuthenticated])

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form className="form" onSubmit={onSubmit}>
        {SignupErrors.map((error, i) => (
          <div
            key={i}
            style={{
              background: "#ff0000",
              marginBottom: "5px",
              padding: "10px 0 0 10px",
            }}
          >
            {error}
          </div>
        ))}
        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: true })}
        />
        {errors.username && <span>Username is required</span>}

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>Email is required</span>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>Password is required</span>}

        <button type="submit">Signup</button>
      </form>
      <a href="/signin">signin</a>
    </div>
  );
}
