let window; // Prevent window from being garbage collected

exports.getWindow = () => window;

exports.setWindow = (w) => {
	window = w;
};
