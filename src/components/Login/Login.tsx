import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth_reducer";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AppDispatch, AppStateType } from "../../redux/redux_store";


type LoginsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: null,
  server: string;
}

export const Login: React.FC = () => {

  const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

  const dispatch: AppDispatch = useDispatch();

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
    dispatch(login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha,
      onServerError
    ));
  });


  useEffect(() => {
    if (errors.server) {
      clearErrors();
    }
  }, [watch('email'), watch('password')])

  if (isAuth) {
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
      {captchaUrl && <img src={captchaUrl} />}
      {captchaUrl && <div><input 
         {...register('captcha')}
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