import Preloader from "../../common/Preloader/Preloader";
import classes from "./ProfileInfo.module.css";
import React, { useRef, useState } from "react";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.png";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import setCanvasPreview from "./setCanvasPreview";
import ProfileDataForm from "./ProfileDataForm";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ProfileInfo = ({
  profile,
  status,
  updateStatus,
  isOwner,
  savePhoto,
  saveProfile,
}) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [errorsArray, setErrorsArray] = useState([]);

  if (!profile) {
    return <Preloader />;
  }

  const uploadPhoto = () => {
    const canvas = previewCanvasRef.current;
    canvas.toBlob((blob) => {
      const file = new File([blob], "image.png", { type: "image/png" });
      savePhoto(file);
    }, "image/png");
    setImgSrc("");
    setCrop();
  };

  const onMainPhotoSelected = (e) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150 * 150 pixels");
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(e.target.files[0]);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const onSubmit = async (formData) => {
    setErrorsArray([]);
    const errorResponse = await saveProfile(formData);
    if(errorResponse) {
      setErrorsArray(errorResponse);
    } else {
      setEditMode(false);
    }
  };

  return (
    <div>
      <div className={classes.descriptionBlock}>
        <img
          src={profile.photos.large || userPhoto}
          alt="UserPhoto"
          className={classes.mainPhoto}
        />
        {error && <p className={classes.error}>{error}</p>}
        {!!imgSrc && (
          <div className={classes.modalShading}>
            <div className={classes.modal}>
              <ReactCrop
                crop={crop}
                onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                circularCrop
                keepSelection
                aspect={ASPECT_RATIO}
                minWidth={MIN_DIMENSION}
              >
                <img
                  ref={imgRef}
                  src={imgSrc}
                  alt="Upload"
                  style={{ maxHeight: "70vh" }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
              <div>
                <button
                  className={classes.forButton}
                  onClick={() => {
                    setCanvasPreview(
                      imgRef.current,
                      previewCanvasRef.current,
                      convertToPixelCrop(
                        crop,
                        imgRef.current.width,
                        imgRef.current.height
                      )
                    );
                    uploadPhoto();
                  }}
                >
                  Crop and upload image
                </button>
              </div>
              {!!crop && (
                <>
                  <canvas
                    ref={previewCanvasRef}
                    style={{
                      display: "none",
                      border: "1px solid black",
                      objectFit: "contain",
                      width: 150,
                      height: 150,
                    }}
                  />
                </>
              )}
            </div>
          </div>
        )}
        <div>
          {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
        </div>
        {editMode ? (
          <ProfileDataForm profile={profile} onSubmit={onSubmit} errorsArray={errorsArray}/>
        ) : (
          <ProfileData
            goToEditMode={() => {
              setEditMode(true);
            }}
            profile={profile}
            isOwner={isOwner}
          />
        )}
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} isOwner={isOwner}/>
      </div>
    </div>
  );
};

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return (
    <div>
      {isOwner && (
        <div>
          <button onClick={goToEditMode}>edit</button>
        </div>
      )}
      <div>
        <b>Full name</b>: {profile.fullName}
      </div>
      <div>
        <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
      </div>
      {profile.lookingForAJob && (
        <div>
          <b>My professional skills</b>: {profile.lookingForAJobDescription}
        </div>
      )}
      <div>
        <b>About me</b>: {profile.aboutMe}
      </div>
      <div>
        <b>Contacts</b>:
        {Object.keys(profile.contacts).map((key) => {
          return (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={profile.contacts[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div className={classes.contact}>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  );
};

export default ProfileInfo;
