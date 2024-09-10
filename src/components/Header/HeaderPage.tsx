import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUserLogin, selectIsAuth } from "../../redux/auth_selector";
import { logout } from "../../redux/auth_reducer";
import { Avatar, Button } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { AppDispatch } from "../../redux/redux_store";
import Preloader from "../common/Preloader/Preloader";
import { getIsFetching } from "../../redux/users_selector";


export const HeaderPage: React.FC = (props) => {

  const isAuth = useSelector(selectIsAuth);
  const login = useSelector(selectCurrentUserLogin);

  const isFetching = useSelector(getIsFetching);

  const dispatch:AppDispatch = useDispatch();
  const logoutCallback = () => {
    dispatch(logout())
  }

  return (
    <>
    {isFetching ? <Preloader /> : null}
    <header className={classes.header}>
      <div className={classes.loginBlock}>
        {isAuth 
        ? <div>
          <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
          <span className={classes.login}>{login}</span> - <Button onClick={logoutCallback}>Log out</Button>
          </div>
        :
        <Button>
        <NavLink to={"/login"}>Login</NavLink>
        </Button>}
      </div>
    </header>
    </>
  );
};
