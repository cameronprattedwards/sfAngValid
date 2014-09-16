(function(root, factory) {
	if (typeof define == 'function' && define.amd) {
		define([], factory);
	} else {
		root.sfAngValid = {};
		root.sfAngValid.constraints = root.sfAngValid.constraints || {};
		root.sfAngValid.constraints.False = factory();
	}
}(this, function() {
	return function(backendConstraints) {
		if (!backendConstraints)
			throw new Error('backend constraints must be provided to False');
		if (!backendConstraints.message)
			throw new Error('backend constraints for False must have a message property');

		return function(input) {
			var output = [];

			if (input !== false && input !== 0 && input !== '0')
				output.push(backendConstraints.message);
			
			return output;
		}
	}
}));