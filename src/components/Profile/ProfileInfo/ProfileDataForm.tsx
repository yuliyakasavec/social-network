import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import classes from "./ProfileInfo.module.css";
import { ProfileType } from "../../../types/types";

type ProfileDataFormPropsType = {
  profile: ProfileType
  onSubmit: (formData: ProfileType) => Promise<void>
  errorsArray: string[]
}

const ProfileDataForm: React.FC<ProfileDataFormPropsType> = ({ profile, onSubmit, errorsArray }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: profile.fullName,
      lookingForAJob: profile.lookingForAJob,
      lookingForAJobDescription: profile.lookingForAJobDescription,
      aboutMe: profile.aboutMe,
      contacts: profile.contacts,
    },
  });
  

  useEffect(() => {
    if (!errorsArray.length) {
      clearErrors();
    } else {
      errorsArray.forEach((err) => {
        const errorKey = err
          .slice(err.indexOf(">") + 1, err.indexOf(")"))
          .toLocaleLowerCase();
        //@ts-ignore
        setError("contacts." + errorKey, {
          type: "custom",
          message: err,
        });
      });
    }
  }, [errorsArray]);


  return (
    //@ts-ignore
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <b>Full name</b>:
        <div>
          <input
            placeholder="Full name"
            {...register("fullName", {
              required: "This field is required.",
            })}
          />
        </div>
      </div>
      <div>
        <b>Looking for a job</b>:{" "}
        <div>
          <input type="checkbox" {...register("lookingForAJob")} />
        </div>
      </div>
      <div>
        <b>My professional skills</b>:{" "}
        <div>
          <textarea
            placeholder="My professional skills"
            {...register("lookingForAJobDescription")}
          />
        </div>
      </div>
      <div>
        <b>About me</b>:{" "}
        <div>
          <textarea placeholder="About me" {...register("aboutMe")} />
        </div>
      </div>
      <div>
        <b>Contacts</b>:{" "}
        <div>
          {Object.keys(profile.contacts).map((key) => {
            const fieldName = "contacts." + key;
            return (
              <div key={key} className={classes.contact}>
                <b>
                  {key}: <div>
                    <input
                    //@ts-ignore
                      style={errors.contacts?.[key] ? { borderColor: "red" } : {}}
                      placeholder={key}
                      //@ts-ignore
                      {...register(fieldName)}
                    />
                    {//@ts-ignore
                    errors.contacts?.[key] && (
                      <div style={{ color: "red" }}>
                        { //@ts-ignore
                        errors.contacts[key].message}
                      </div>
                    )}
                  </div>
                </b>
              </div>
            );
          })}
        </div>
        <div>
          <button className={classes.saveButton} type="submit">
            save
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileDataForm;
