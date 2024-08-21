import { ProfileType } from "../../types/types";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import React from "react";

type PropsType = {
  savePhoto: (v: any) => void
  saveProfile: (profile: ProfileType) => void
  isOwner: boolean
  profile: ProfileType | null
  status: string
  updateStatus: (status: string) => void
}

const Profile: React.FC<PropsType> = (props) => {

  return (
    <div>
      <ProfileInfo savePhoto={props.savePhoto} saveProfile={props.saveProfile} isOwner={props.isOwner} profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
