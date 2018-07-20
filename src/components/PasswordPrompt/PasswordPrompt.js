import React, { Component } from 'react';
import PropTypes from 'prop-types';


const propTypes = {
	unlock: PropTypes.func.isRequired
};

export default class PasswordPrompt extends Component {
	render() {
		const { unlock } = this.props;

		return (
			<button type="submit" onClick={unlock}>
				Unlock
			</button>
		);
	}
}

PasswordPrompt.propTypes = propTypes;
