(function(root, factory) {
	if (typeof define == 'function' && define.amd)
		define([], factory);
	else
		root.ValidatorFactory = factory();
}(this, function() {
	return {
		makeValidator: function(backendConstraints) {
			if (!backendConstraints)
				throw new Error('backendConstraints must be provided to #makeValidator()');
			return {};
		}
	};
}));
