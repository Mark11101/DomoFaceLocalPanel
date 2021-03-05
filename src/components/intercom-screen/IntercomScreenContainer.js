import { connect } from 'react-redux'

import { requestIntercomHealthCheck } from '../../redux/actions/Auth'

import IntercomScreen from './IntercomScreen'

const mapStateToProps = (state) => {
  
  return {
    role: state.users.currentUser.role,
    isLogged: state.auth.isLogged,
    intercomHealth: state.auth.intercomHealth,
  }
}

const mapDispatchToProps = (dispatch) => {
  
  return {
    requestIntercomHealthCheck: () => dispatch(requestIntercomHealthCheck()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IntercomScreen)
