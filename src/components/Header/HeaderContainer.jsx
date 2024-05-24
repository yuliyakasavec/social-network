import React from "react";
import Header from "./Header";
import axios from "axios";
import { connect } from "react-redux";
import { setAuthUserData } from "../../redux/auth_reducer";
import Preloader from "../common/Preloader/Preloader";
import { toggleIsFetching } from "../../redux/users_reducer";

class HeaderContainer extends React.Component {
  componentDidMount() {
    this.props.toggleIsFetching(true);
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        withCredentials: true,
      })
      .then((response) => {
        this.props.toggleIsFetching(false);
        if (response.data.resultCode === 0) {
          let { id, email, login } = response.data.data;
          this.props.setAuthUserData(id, email, login);
        }
      });
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

export default connect(mapStateToProps, { setAuthUserData, toggleIsFetching })(HeaderContainer);
