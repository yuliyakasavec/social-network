import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { getAuthUserData, logout } from "../../redux/auth_reducer";
import Preloader from "../common/Preloader/Preloader";

class HeaderContainer extends React.Component {
  componentDidMount() {
    this.props.getAuthUserData();
    // this.props.toggleIsFetching(true);
    // headerAPI
    //   .headerGetAuth()
    //   .then((data) => {
    //     this.props.toggleIsFetching(false);
    //     if (data.resultCode === 0) {
    //       let { id, email, login } = data.data;
    //       this.props.setAuthUserData(id, email, login);
    //     }
    //   });
  }

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Header {...this.props} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  isFetching: state.auth.isFetching,
});

export default connect(mapStateToProps, {getAuthUserData, logout})(HeaderContainer);
