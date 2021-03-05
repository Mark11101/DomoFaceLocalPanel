import { connect } from 'react-redux'

import { logOut } from '../../redux/actions/Auth'

import AutoLogOutHandler from './AutoLogOutHandler'

const mapStateToProps = () => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AutoLogOutHandler)
