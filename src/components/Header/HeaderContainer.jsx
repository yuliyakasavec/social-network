import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logout } from "../../redux/auth_reducer";
import Preloader from "../common/Preloader/Preloader";

class HeaderContainer extends React.Component {

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

export default connect(mapStateToProps, {logout})(HeaderContainer);
