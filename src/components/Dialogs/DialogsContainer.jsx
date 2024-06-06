import {
  sendMessageActionCreator,
  updateNewMessageTextActionCreator,
} from "../../redux/dialogs_reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";


let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    updateNewMessageText: (text) => {
      let action = updateNewMessageTextActionCreator(text);
      dispatch(action);
    },
    sendMessage: () => {
      dispatch(sendMessageActionCreator());
    },
  }
}

let AuthRedirectComponent = withAuthRedirect(Dialogs);

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (AuthRedirectComponent);


export default DialogsContainer;
