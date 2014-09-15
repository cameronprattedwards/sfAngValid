(function(test) {
	if (typeof define == 'function' && define.amd)
		define(['sfAngValid/constraints/Blank'], test);
	else
		test(sfAngValid.constraints.Blank);
}(function(Blank) {
	describe('constraints/Blank', function() {
		it('is a function', function() {
			Blank.should.be.a('function');
		});

		describe('signature', function() {
			it('accepts one object', function() {
				function fails() { Blank(); }
				fails.should.throw(Error);
			});

			it('must have a message property', function() {
				function fails() { Blank({}); }
				fails.should.throw(/message property/);
			});
		});

		describe('return value', function() {
			var backendConstraints = {
					message: 'This field will not accept a value.'
				},
				validator = Blank(backendConstraints);

			it('is a function', function() {
				validator.should.be.a('function');
			});

			it('returns an array', function() {
				var returnValue = validator('');
				returnValue.should.be.an.instanceof(Array);
			});

			it('returns the message for a non-empty input', function() {
				var returnValue = validator('not empty');
				returnValue[0].should.equal(backendConstraints.message);
			});

			it('returns an empty array for an empty input', function() {
				var returnValue = validator('');
				returnValue.length.should.equal(0);
			});
		});
	});
}));