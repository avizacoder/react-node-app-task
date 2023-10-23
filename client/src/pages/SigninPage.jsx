import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"
import "./user.css";
import { useEffect } from "react";


export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks")
  }, [isAuthenticated])

  return (
    <div className="form-container">
      <h2>Signin</h2>
      <form className="form" onSubmit={onSubmit}>
        {signinErrors.map((error, i) => (
          <div
            key={i}
            style={{
              background: "#ff0000",
              marginBottom: "5px",
              padding: "10px 0 0 10px"
            }}
          >
            {error}
          </div>
        ))}

        <input
          type="username"
          {...register("username", { required: true })}
          placeholder="Username"
        />
        {errors.username && <span>username is required</span>}

        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
        />
        {errors.password && <span>password is required</span>}

        <button type="submit">Signin</button>
      </form>
      <a href="/signup">Signup</a>
    </div>
  );
}
