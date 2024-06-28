import React from "react";
import { Test } from "./Test";

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: !this.props.status,
  };

  activateEditMode = () => {
    console.log("here");
    this.setState({
      editMode: true,
    });
  };

  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status);
  };

  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };

  render() {
    return (
      <div>
        <div>
          {!this.state.editMode && (
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || "-----"}
            </span>
          )}
          {this.state.editMode && (
            <input
              onChange={this.onStatusChange}
              autoFocus={true}
              onBlur={this.deactivateEditMode}
              value={this.state.status}
            />
          )}
        </div>
        {/* <Test /> */}
      </div>
    );
  }
}

export default ProfileStatus;
