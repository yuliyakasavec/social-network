import React, { ChangeEvent, useEffect, useState } from "react";

type PropsType = {
  editMode: boolean
  status: string
  isOwner: boolean
  updateStatus: (status: string) => void
};

const ProfileStatusWithHooks = (props: PropsType) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);
  

  useEffect( () => {
    setStatus(props.status)
  }, [props.status] );

  const activateEditMode = () => {
    props.isOwner && setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status)
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  }

  return (
    <div>
      
        {!editMode && (
          <div>
          <b>Status:</b> <span onDoubleClick={activateEditMode}>
            {props.status || "-----"}
          </span>
          </div>
        )}
        {editMode && <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />}
      </div>
  );
};

export default ProfileStatusWithHooks;
