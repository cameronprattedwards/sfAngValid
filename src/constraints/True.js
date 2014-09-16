(function(root, factory) {
	if (typeof define == 'function' && define.amd) {
		define([], factory);
	} else {
		root.sfAngValid = {};
		root.sfAngValid.constraints = root.sfAngValid.constraints || {};
		root.sfAngValid.constraints.True = factory();
	}
}(this, function() {
	return function(backendConstraints) {
		if (!backendConstraints)
			throw new Error('backend constraints must be provided to True');
		if (!backendConstraints.message)
			throw new Error('backend constraints for True must have a message property');

		return function(input) {
			var output = [];

			if (input !== true && input !== 1 && input !== '1')
				output.push(backendConstraints.message);
			
			return output;
		}
	}
}));