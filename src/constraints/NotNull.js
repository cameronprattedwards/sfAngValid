(function(root, factory) {
	if (typeof define == 'function' && define.amd) {
		define([], factory);
	} else {
		root.sfAngValid = root.sfAngValid || {};
		root.sfAngValid.constraints.NotNull = factory();
	}
}(this, function() {
	return function(backendConstraints) {
		if (!backendConstraints)
			throw new Error('backend constraints must be provided to NotNull');
		if (!backendConstraints.message)
			throw new Error('backend constraints for NotNull must have a message property');

		return function(input) {
			var output = [];

			if (input == null)
				output.push(backendConstraints.message);
			
			return output;
		}
	}
}));