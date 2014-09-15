(function(root, factory) {
	if (typeof define == 'function' && define.amd) {
		define([], factory);
	} else {
		root.sfAngValid = root.sfAngValid || {};
		root.sfAngValid.constraints.NotBlank = factory();
	}
}(this, function() {
	return function(backendConstraints) {
		if (!backendConstraints)
			throw new Error('backend constraints must be provided to NotBlank');
		if (!backendConstraints.message)
			throw new Error('backend constraints for NotBlank must have a message property');

		return function(input) {
			var output = [];

			if (!input)
				output.push(backendConstraints.message);
			
			return output;
		}
	}
}));