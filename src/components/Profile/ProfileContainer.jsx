import Profile from "./Profile";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { setUserProfile } from "../../redux/profile_reducer";
import { connect } from "react-redux";
import { profileAPI } from "../../api/api";

function ProfileContainer(props) {
  let { userId } = useParams();
  // if (!userId) {
  //   userId = 2;
  // }

  useEffect(() => {
    profileAPI
      .profileGetUsers(userId)
      .then((data) => {
        props.setUserProfile(data);
      });
  }, [userId]);

  return (
    <div>
      <Profile profile={props.profile} />
    </div>
  );
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
});

export default connect(mapStateToProps, { setUserProfile })(ProfileContainer);
