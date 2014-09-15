(function(test) {
	if (typeof define == 'function' && define.amd)
		define(['sfAngValid/constraints/NotBlank'], test);
	else
		test(sfAngValid.constraints.NotBlank);
}(function(NotBlank) {
	describe('constraints/NotBlank', function() {
		it('is a function', function() {
			NotBlank.should.be.a('function');
		});

		describe('signature', function() {
			it('accepts one object', function() {
				function fails() { NotBlank(); }
				fails.should.throw(Error);
			});

			it('must have a message property', function() {
				function fails() { NotBlank({}); }
				fails.should.throw(/message property/);
			});
		});

		describe('return value', function() {
			var backendConstraints = {
					message: 'Please enter a value.'
				},
				validator = NotBlank(backendConstraints);

			it('is a function', function() {
				validator.should.be.a('function');
			});

			it('returns an array', function() {
				var returnValue = validator('');
				returnValue.should.be.an.instanceof(Array);
			});

			it('returns the message for an empty input', function() {
				var returnValue = validator('');
				returnValue[0].should.equal(backendConstraints.message);
			});

			it('returns an empty array for non-empty input', function() {
				var returnValue = validator('not an empty string');
				returnValue.length.should.equal(0);
			});
		});
	});
}));
