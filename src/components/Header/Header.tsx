import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";

type PropsType = {
  isAuth: boolean
  login: string | null;
  logout: () => void
}

const Header: React.FC<PropsType> = (props) => {
  return (
    <header className={classes.header}>
      <img src="https://i.pinimg.com/474x/81/28/0f/81280f07de98e22f48e1baef3e41a18e.jpg" />

      <div className={classes.loginBlock}>
        {props.isAuth 
        ? <div> {props.login} - <button onClick={props.logout}>Log out</button> </div>
        : <NavLink to={"/login"}>Login</NavLink>}
      </div>
    </header>
  );
};

export default Header;
