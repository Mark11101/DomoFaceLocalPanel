import React from 'react'

import { showInformationMessage } from '../../utils/notifications/messages'

export default class AutoLogOutHandler extends React.Component {
	constructor(props) {
		super(props)

		this.events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress"
    ];

    this.logout = this.logout.bind(this);
    this.resetTimeout = this.resetTimeout.bind(this);

    for (var i in this.events) {

      window.addEventListener(this.events[i], this.resetTimeout);
    }

    this.setTimeout();
	}

	clearTimeout() {
		
		this.logoutTimeout 
		&& 
			clearTimeout(this.logoutTimeout);
  }

  setTimeout() {

    this.logoutTimeout = setTimeout(this.logout, 60 * 15 * 1000);
	}
	
  resetTimeout() {

    this.clearTimeout();
    this.setTimeout();
  }

  logout() {
		showInformationMessage('Время сессии истекло, пожалуйста авторизуйтесь снова.')

		this.props.logOut()
    this.destroy();
  }

  destroy() {
    this.clearTimeout();

    for (var i in this.events) {
      window.removeEventListener(this.events[i], this.resetTimeout);
    }
	}
	
	render() {
		return (
		<>{this.logoutTimeout}</>
		)
	}
}
