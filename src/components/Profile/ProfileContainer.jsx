import Profile from "./Profile";
import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { setUserProfile } from "../../redux/profile_reducer";
import { connect } from "react-redux";

function ProfileContainer(props) {
  let { userId } = useParams();
  // if (!userId) {
  //   userId = 2;
  // }

  useEffect(() => {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/profile/` + (userId || 2))
      .then((response) => {
        props.setUserProfile(response.data);
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
