(function(test) {
	if (typeof define == 'function' && define.amd)
		define(['sfAngValid/constraints/True'], test);
	else
		test(sfAngValid.constraints.True);
}(function(True) {
	describe('constraints/True', function() {
		it('is a function', function() {
			True.should.be.a('function');
		});

		describe('signature', function() {
			it('accepts one object', function() {
				function fails() { True(); }
				fails.should.throw(Error);
			});

			it('must have a message property', function() {
				function fails() { True({}); }
				fails.should.throw(/message property/);
			});
		});

		describe('return value', function() {
			var backendConstraints = {
					message: 'This value must be true.'
				},
				validator = True(backendConstraints);

			it('is a function', function() {
				validator.should.be.a('function');
			});

			it('returns an array', function() {
				var returnValue = validator('');
				returnValue.should.be.an.instanceof(Array);
			});

			it('returns the message for an input that is not true, 1, or "1"', function() {
				var returnValue = validator('not true');
				returnValue[0].should.equal(backendConstraints.message);
			});

			it('returns an empty array for true', function() {
				var returnValue = validator(true);
				returnValue.length.should.equal(0);
			});

			it('returns an empty array for 1', function() {
				var returnValue = validator(1);
				returnValue.length.should.equal(0);
			});

			it('returns an empty array for "1"', function() {
				var returnValue = validator('1');
				returnValue.length.should.equal(0);
			});

		});
	});
}));