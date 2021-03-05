import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionsUi from '../../../redux/actions/Ui'
import { logOut } from '../../../redux/actions/Auth'

import NavigationBar from './NavigationBar'

const mapStateToProps = (state) => {
  return {
    login: state.users.currentUser.login,
  }
}

const mapDispatchToProps = (dispatch) => {
  const {
    setDisplayedView
  } = bindActionCreators(actionsUi, dispatch)

  return {
    setDisplayedView: (type) => setDisplayedView(type),
    logOut: () => dispatch(logOut()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavigationBar)
