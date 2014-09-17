(function(root, factory) {
	if (typeof define == 'function' && define.amd) {
		define([], factory);
	} else {
		root.sfAngValid = {};
		root.sfAngValid.constraints = root.sfAngValid.constraints || {};
		root.sfAngValid.constraints.Email = factory();
	}
}(this, function() {
	return function(backendConstraints) {
		var regex;

		if (!backendConstraints)
			throw new Error('backend constraints must be provided to Email');

		if (!backendConstraints.message)
			throw new Error('backend constraints for Email must have a message property');

		regex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i;

		return function(input) {
			var output = [];

			if (!regex.test(input))
				output.push(backendConstraints.message);

			return output;
		};
	}
}));