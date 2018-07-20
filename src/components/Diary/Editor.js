import React, { Component } from 'react';
import PropTypes from 'prop-types';


const propTypes = {
	entry: PropTypes.string.isRequired,
	setEntry: PropTypes.func.isRequired
};

export default class Editor extends Component {
	render() {
		const { entry } = this.props;

		return (
			<p>Entry: {entry}</p>
		);
	}
}

Editor.propTypes = propTypes;
