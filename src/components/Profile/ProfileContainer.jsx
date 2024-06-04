import Profile from "./Profile";
import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getUsersProfile } from "../../redux/profile_reducer";
import { connect } from "react-redux";

function ProfileContainer(props) {
  let { userId } = useParams();
  // if (!userId) {
  //   userId = 2;
  // }

  useEffect(() => {
    props.getUsersProfile(userId);
    // profileAPI
    //   .profileGetUsers(userId)
    //   .then((data) => {
    //     props.setUserProfile(data);
    //   });
  }, [userId]);

    if (!props.isAuth) {
      return <Navigate to={'/login'} />
    }


  return (
    <div>
      <Profile profile={props.profile} />
    </div>
  );
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { getUsersProfile })(ProfileContainer);
