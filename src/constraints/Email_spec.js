(function(test) {
	if (typeof define == 'function' && define.amd)
		define(['sfAngValid/constraints/Email'], test);
	else
		test(sfAngValid.constraints.Email);
}(function(Email) {
	describe('constraints/Email', function() {
		it('is a function', function() {
			Email.should.be.a('function');
		});

		describe('signature', function() {
			it('accepts one object', function() {
				function fails() { Email(); }
				fails.should.throw(Error);
			});

			it('must have a message property', function() {
				function fails() { Email({}); }
				fails.should.throw(/message property/);
			});
		});

		describe('return value', function() {
			var backendConstraints = {
					'message': 'This is not an email'
	            },
	            validator = Email(backendConstraints);
	            // the charset parameter will be ignored

			it('is a function', function() {
				validator.should.be.a('function');
			});

			it('returns an array', function() {
				var returnValue = validator('');
				returnValue.should.be.an.instanceof(Array);
			});

			it('accepts emails', function() {
				var returnValue = validator('cameron@gmail.com');
				returnValue.length.should.equal(0);
			});

			it('rejects non-emails', function() {
				var returnValue = validator('asdfasdf');
				returnValue.length.should.equal(1);

				returnValue = validator('asdfasdf@');
				returnValue.length.should.equal(1);

				returnValue = validator('asdfasdf@gmail.');
				returnValue.length.should.equal(1);
			});
		});
	});
}));
