import React, { useState } from "react";

const ProfileStatus = (props) => {
  const [editMode, setModeEdit] = useState(false);

  const editStatus = () => {
    setModeEdit(!editMode);
  };

  return (
    <div>
      {editMode ? (
        <div>
          <input autoFocus onBlur={editStatus} value={props.status} />
        </div>
      ) : (
        <div>
          <span onDoubleClick={editStatus}>{props.status}</span>
        </div>
      )}
    </div>
  );
};

export default ProfileStatus;
