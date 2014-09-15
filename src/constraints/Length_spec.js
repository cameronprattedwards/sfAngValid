(function(test) {
	if (typeof define == 'function' && define.amd)
		define(['sfAngValid/constraints/Length'], test);
	else
		test(sfAngValid.constraints.Length);
}(function(Length) {
	describe('constraints/Length', function() {
		it('is a function', function() {
			Length.should.be.a('function');
		});

		describe('signature', function() {
			it('accepts one object', function() {
				function fails() { Length(); }
				fails.should.throw(Error);
			});
		});

		describe('return value', function() {
			var backendConstraints = {
		            'maxMessage': 'Too many characters!',
		            'minMessage': 'Too few characters!',
		            'exactMessage': 'This value should have exactly 10 characters',
		            'max': 100,
		            'min': 5
	            },
	            validator = Length(backendConstraints);
	            // the charset parameter will be ignored

			it('is a function', function() {
				validator.should.be.a('function');
			});

			it('returns an array', function() {
				var returnValue = validator('');
				returnValue.should.be.an.instanceof(Array);
			});

			it('returns the maxMessage when the input is too long', function() {
				var returnValue = validator('this string is way, way, way, way, way, way, way, way, way, way, way, way, way, way, way, way too long.');
				returnValue[0].should.equal(backendConstraints.maxMessage);
			});

			it('returns the minMessage when the input is too short', function() {
				var returnValue = validator('!');
				returnValue[0].should.equal(backendConstraints.minMessage);
			});

			it('returns the exactMessage when min = max and the input = neither', function() {
				var backendConstraints = {
						'max': 10,
						'min': 10,
						'exactMessage': 'This value should have exactly 10 characters'
					},
					validator = Length(backendConstraints),
					returnValue = validator('This is not ten characters');

				returnValue[0].should.equal(backendConstraints.exactMessage);
			});

			it('returns an empty array when the input is valid', function() {
				var returnValue = validator('This is between 5 and 100 characters');
				returnValue.length.should.equal(0);
			});
		});
	});
}));




