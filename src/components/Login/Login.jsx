import React from "react";
import { connect } from "react-redux";
import { login } from "../../redux/auth_reducer";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = (props) => {

  const { register, handleSubmit, formState: {
    errors
  }, 
  setError, clearErrors } = useForm({
    mode: 'onChange',
  });

  const onServerError = (errorMessage) => {
    setError("server", {
      type: "custom",
      message: errorMessage || "Error!",
    })
  }
  
  const onSubmit = (formData) => {
    clearErrors()
    props.login(
      formData.email,
      formData.password,
      formData.rememberMe,
      onServerError
    );
  };

  if (props.isAuth) {
    return <Navigate to={"/profile"} />;
  }

  return (
    <div>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="text" placeholder="Email"
          {...register('email', {
              required: "Email is required!",
              pattern: {
                value: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
                message: 'Please enter valid email!'
              }
            })}
        />
        {errors.email && (<div style={{ color: 'red'}}>{errors.email.message}</div>)}
      </div>
      <div>
        <input
          type="password" placeholder="Password"
          {...register('password', {
            required: "Password is required!",
          })}
        />
        {errors.password && (<div style={{ color: 'red'}}>{errors.password.message}</div>)}
      </div>
      <div>
        <input 
         type="checkbox"
         {...register('rememberMe')}
          />
        Remember me
      </div>
      {errors.rememberMe && (<div style={{ color: 'red'}}>{errors.rememberMe.message}</div>)}
      <div>
        <input type="submit" value="Log in" />
      </div>
      <div>
      {errors.server && (<div style={{ color: 'red'}}>{errors.server.message}</div>)}
      </div>
    </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
