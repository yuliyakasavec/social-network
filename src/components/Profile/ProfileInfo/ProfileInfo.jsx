import Preloader from "../../common/Preloader/Preloader";
import classes from "./ProfileInfo.module.css";
import React from "react";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({profile, status, updateStatus}) => {
  if (!profile) {
    return <Preloader />;
  }

  return (
    <div>
      {/* <div>
        <img
          className={classes.contentImage}
          src="https://shop-cdn1-2.vigbo.tech/shops/2544/products/16486697/images/3-9f0ed407d8ba2537f38b8b2d9765ccdb.jpg"
        />
      </div> */}
      <div className={classes.descriptionBlock}>
        <img src={profile.photos.large} />
        <div>
        <span className={classes.color}>Моя страничка на фейсбуке:</span> 
        <span>{profile.contacts.facebook}</span>
        </div>
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
      </div>
    </div>
  );
};

export default ProfileInfo;
