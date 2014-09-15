(function(root, factory) {
	if (typeof define == 'function' && define.amd) {
		define([], factory);
	} else {
		root.sfAngValid = root.sfAngValid || {};
		root.sfAngValid.constraints = root.sfAngValid.constraints || {};
		root.sfAngValid.constraints.Length = factory();
	}
}(this, function() {
	return function(backendConstraints) {
		if (!backendConstraints)
			throw new Error('backend constraints must be provided to Length');

		var exact = backendConstraints.max == backendConstraints.min;

		return function(input) {
			var output = [];

			if (exact) {
				if (input.length !== backendConstraints.min)
					output.push(backendConstraints.exactMessage);
				return output;
			}

			if (input.length > backendConstraints.max)
				output.push(backendConstraints.maxMessage);

			if (input.length < backendConstraints.min)
				output.push(backendConstraints.minMessage);

			return output;
		}
	}
}));