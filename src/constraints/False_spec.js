(function(test) {
	if (typeof define == 'function' && define.amd)
		define(['sfAngValid/constraints/False'], test);
	else
		test(sfAngValid.constraints.False);
}(function(False) {
	describe('constraints/False', function() {
		it('is a function', function() {
			False.should.be.a('function');
		});

		describe('signature', function() {
			it('accepts one object', function() {
				function fails() { False(); }
				fails.should.throw(Error);
			});

			it('must have a message property', function() {
				function fails() { False({}); }
				fails.should.throw(/message property/);
			});
		});

		describe('return value', function() {
			var backendConstraints = {
					message: 'This field\'s value must be false'
				},
				validator = False(backendConstraints);

			it('is a function', function() {
				validator.should.be.a('function');
			});

			it('returns an array', function() {
				var returnValue = validator('');
				returnValue.should.be.an.instanceof(Array);
			});

			it('returns the message for an input that is not false, 0, or "0"', function() {
				var returnValue = validator('not true');
				returnValue[0].should.equal(backendConstraints.message);
			});

			it('returns an empty array for false', function() {
				var returnValue = validator(false);
				returnValue.length.should.equal(0);
			});

			it('returns an empty array for 0', function() {
				var returnValue = validator(0);
				returnValue.length.should.equal(0);
			});

			it('returns an empty array for "0"', function() {
				var returnValue = validator('0');
				returnValue.length.should.equal(0);
			});

		});
	});
}));