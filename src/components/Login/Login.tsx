import React, { useEffect } from "react";
import { connect } from "react-redux";
import { login } from "../../redux/auth_reducer";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AppStateType } from "../../redux/redux_store";

type LoginsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: null,
  server:string;
}

type PropsType = {
  login: (email: string, 
    password: string,
    rememberMe: boolean,
    captcha: null,
    onServerError: (v: string) => void
  ) => void
  isAuth: boolean
  captchaUrl: string | null
}

const Login = (props: PropsType) => {

  const { register, handleSubmit, formState: {
    errors
  }, 
  setError, clearErrors, watch } = useForm<LoginsType>({
    mode: 'onChange',
  });

  const onServerError = (errorMessage: string) => {
    setError("server", {
      type: "custom",
      message: errorMessage || "Error!",
    })
  }
  
  const onSubmit = handleSubmit((formData) => {
    clearErrors()
    props.login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha,
      onServerError
    );
  });

  useEffect(() => {
    if (errors.server) {
      clearErrors();
    }
  }, [watch('email'), watch('password')])

  if (props.isAuth) {
    return <Navigate to={"/profile"} />;
  }


  return (
    <div>
      <h1>LOGIN</h1>
      <form onSubmit={onSubmit}>
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
      {props.captchaUrl && <img src={props.captchaUrl} />}
      {props.captchaUrl && <div><input 
         {...register('captcha', {
          required: "Required!",
        })}
          /></div>}
      <div>
        <button type="submit">Log in</button>
      </div>
      <div>
      {errors.server && (<div style={{ color: 'red'}}>{errors.server.message}</div>)}
      </div>
    </form>
    </div>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, { login })(Login);