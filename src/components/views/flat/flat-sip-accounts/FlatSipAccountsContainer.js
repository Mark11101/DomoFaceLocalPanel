import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../../redux/actions/flat/flat-sip-accounts/FlatSipAccounts'
import FlatSipAccounts from './FlatSipAccounts'

const mapStateToProps = (state) => {
  return {    
    flatSipAccounts: state.flat.flatSipAccounts,
  }
}

const mapDispatchToProps = (dispatch) => {
  const {
    requestFlatSipAccounts,
    requestAddFlatSipAccount,
    requestDeleteAllFlatSipAccounts,
    requestDeleteFlatSipAccount,
  } = bindActionCreators(actions, dispatch);

  return {
    requestFlatSipAccounts: (number) => requestFlatSipAccounts(number),
    requestAddFlatSipAccount: (number, server, login) => requestAddFlatSipAccount(number, server, login),
    requestDeleteAllFlatSipAccounts: (number) => requestDeleteAllFlatSipAccounts(number),
    requestDeleteFlatSipAccount: (id, number) => requestDeleteFlatSipAccount(id, number),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlatSipAccounts)
