import {
  InitialDialogsStateType,
  dialogsAction
} from "../../redux/dialogs_reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux_store";

type MapStatePropsType = {
  dialogsPage: InitialDialogsStateType
}

type MapDispatchPropsType = {
  sendMessage: (newMessageText: string) => void
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    dialogsPage: state.dialogsPage,
  }
}

let mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
  return {
    sendMessage: (newMessageText) => {
      dispatch(dialogsAction.sendMessageActionCreator(newMessageText));
    },
  }
}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)
(Dialogs);
