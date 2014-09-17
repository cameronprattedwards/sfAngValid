(function(root, factory) {
	if (typeof define == 'function' && define.amd) {
		define([], factory);
	} else {
		root.sfAngValid = {};
		root.sfAngValid.constraints = root.sfAngValid.constraints || {};
		root.sfAngValid.constraints.Type = factory();
	}
}(this, function() {
	function int(input) {
		return typeof input == 'number' && input % 1 === 0;
	}

	function number(input) {
		return typeof input == 'number';
	}

	var types = {
		'array': function(input) { return input instanceof Array; },
		'bool': function(input) { return typeof input == 'boolean'; },
		'callable': function(input) { return typeof input == 'function'; },
		'float': number,
		'double': number,
		'int': int,
		'integer': int,
		'long': int,
		'null': function(input) { return input === null; },
		'numeric': function(input) { return !isNaN(parseFloat(input)) && isFinite(input); },
		'object': function(input) { return input && typeof input == 'object'; },
		'real': number,
		'scalar': function(input) { return /boolean|number|string/.test(typeof input); },
		'string': function(input) { return typeof input == 'string'; }
	};

	return function(backendConstraints) {
		var callback;

		if (!backendConstraints)
			throw new Error('backend constraints must be provided to Type');

		if (!backendConstraints.message)
			throw new Error('backend constraints for Type must have a message property');

		if (!backendConstraints.type)
			throw new Error('backend constraints for Type must have a type property');

		if (!(backendConstraints.type in types))
			throw new Error(
				'backend constraints type property for Type must be one of the following: ' 
				+ Object.keys(types).join(', ')
			);

		callback = types[backendConstraints.type];

		return function(input) {
			var output = [];

			if (!callback(input))
				output.push(backendConstraints.message);
			
			return output;
		}
	}
}));