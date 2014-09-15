(function(test) {
	if (typeof define == 'function' && define.amd)
		define(['sfAngValid/constraints/NotNull'], test);
	else
		test(sfAngValid.constraints.NotNull);
}(function(NotNull) {
	describe('constraints/NotNull', function() {
		it('is a function', function() {
			NotNull.should.be.a('function');
		});

		describe('signature', function() {
			it('accepts one object', function() {
				function fails() { NotNull(); }
				fails.should.throw(Error);
			});

			it('must have a message property', function() {
				function fails() { NotNull({}); }
				fails.should.throw(/message property/);
			});
		});

		describe('return value', function() {
			var backendConstraints = {
					message: 'Please enter a value.'
				},
				validator = NotNull(backendConstraints);

			it('is a function', function() {
				validator.should.be.a('function');
			});

			it('returns an array', function() {
				var returnValue = validator('');
				returnValue.should.be.an.instanceof(Array);
			});

			it('returns the message for a null input', function() {
				var returnValue = validator(null);
				returnValue[0].should.equal(backendConstraints.message);
			});

			it('returns an empty array for non-null input', function() {
				var returnValue = validator('not null');
				returnValue.length.should.equal(0);
			});
		});
	});
}));