import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionsAuth from '../../../redux/actions/Auth'
import * as actions from '../../../redux/actions/Users'

import Users from './Users'

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    currentUser: state.users.currentUser,
    firstFlatNumber: state.intercom.mainSettings.flatsSettings.firstNumber,
    lastFlatNumber: state.intercom.mainSettings.flatsSettings.lastNumber,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { logOut } = bindActionCreators(actionsAuth, dispatch);
  const {
    requestUsers,
    requestCurrentUser,
    requestUpdateUser,
    requestCreateUser,
    requestDeleteUser,
    requestDeleteAllUsers,
  } = bindActionCreators(actions, dispatch)

  return {
    logOut,
    requestUsers,
    requestCurrentUser,
    requestUpdateUser: (id, values) => requestUpdateUser(id, values),
    requestCreateUser: (values) => requestCreateUser(values),
    requestDeleteUser: (id) => requestDeleteUser(id),
    requestDeleteAllUsers,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users)
