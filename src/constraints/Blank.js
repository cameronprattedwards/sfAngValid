(function(root, factory) {
	if (typeof define == 'function' && define.amd) {
		define([], factory);
	} else {
		root.sfAngValid = root.sfAngValid || {};
		root.sfAngValid.constraints = root.sfAngValid.constraints || {};
		root.sfAngValid.constraints.Blank = factory();
	}
}(this, function() {
	return function(backendConstraints) {
		if (!backendConstraints)
			throw new Error('backend constraints must be provided to Blank');
		if (!backendConstraints.message)
			throw new Error('backend constraints for Blank must have a message property');

		return function(input) {
			var output = [];

			if (input)
				output.push(backendConstraints.message);
			
			return output;
		}
	}
}));