import { connect } from 'react-redux'
import App from './App'
import { logOut } from '../redux/actions/Auth'

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
)(App)
