import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logout } from "../../redux/auth_reducer";
import Preloader from "../common/Preloader/Preloader";
import { AppStateType } from "../../redux/redux_store";

type MapStatePropsType = {
  isFetching: boolean
  isAuth: boolean
  login: string | null;
}

type MapDispatchPropsType = {
  logout: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

class HeaderContainer extends React.Component <PropsType> {

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Header {...this.props} />
      </>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  isFetching: state.auth.isFetching,
});

export default connect(mapStateToProps, {logout})(HeaderContainer);
