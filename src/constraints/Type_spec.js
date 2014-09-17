(function(test) {
	if (typeof define == 'function' && define.amd)
		define(['sfAngValid/constraints/Type'], test);
	else
		test(sfAngValid.constraints.Type);
}(function(Type) {
	describe('constraints/Type', function() {
		it('is a function', function() {
			Type.should.be.a('function');
		});

		describe('signature', function() {
			it('accepts one object', function() {
				function fails() { Type(); }
				fails.should.throw(Error);
			});

			it('must have a message property', function() {
				function fails() { Type({ type: 'array' }); }
				fails.should.throw(/message property/);
			});

			it('must have a type property', function() {
				function fails() { Type({ message: 'Some message' }); }
				fails.should.throw(/type property/);
			});

			var types = [
				'array',
				'bool',
				'callable',
				'float',
				'double',
				'int',
				'integer',
				'long',
				'null',
				'numeric',
				'object',
				'real',
				'scalar',
				'string'
			];

			it('must have a type property one of ' + types.join(', '), function() {
				function fails() { Type({ message: 'Some message', type: 'foo' }); }
				fails.should.throw(/one of the following/);
			});
		});

		describe('return value', function() {
			var backendConstraints = {
					message: 'Please enter a value.',
					type: 'array'
				},
				validator = Type(backendConstraints);

			it('is a function', function() {
				validator.should.be.a('function');
			});

			it('returns an array', function() {
				var returnValue = validator('');
				returnValue.should.be.an.instanceof(Array);
			});

			it('validates arrays', function() {
				var constraints = {
						type: 'array',
						message: 'array message'
					},
					validator = Type(constraints),
					result = validator('not an array');

				result.length.should.equal(1);
				result[0].should.equal(constraints.message);
				validator([]).length.should.equal(0);
			});

			it('validates bools', function() {
				var constraints = {
						type: 'bool',
						message: 'bool message'
					},
					validator = Type(constraints),
					result = validator(16);

				result.length.should.equal(1);
				result[0].should.equal(constraints.message);
				validator(true).length.should.equal(0);
			});

			it('validates callables', function() {
				var constraints = {
						type: 'callable',
						message: 'callable message'
					},
					validator = Type(constraints),
					result = validator(true);

				result.length.should.equal(1);
				result[0].should.equal(constraints.message);
				validator(function() {}).length.should.equal(0);
			});

			//Any number will validate as a float, since only one number type exists in JS.
			it('validates floats, doubles, and reals', function() {
				function validate(type) {
					var constraints = {
							type: type,
							message: 'float message'
						},
						validator = Type(constraints),
						result = validator(false);

					result.length.should.equal(1);
					result[0].should.equal(constraints.message);
					validator(1.1).length.should.equal(0);
				}

				validate('float');
				validate('double');
				validate('real');
			});

			//does not accept numbers with decimal remainders
			it('validates ints, integers, and longs', function() {
				function validate(type) {
					var constraints = {
							type: type,
							message: 'int message'
						},
						validator = Type(constraints),
						result = validator(false),
						result2 = validator(1.1),
						result3 = validator(3);

					result.length.should.equal(1);
					result2.length.should.equal(1);
					result3.length.should.equal(0);
				}

				validate('int');
				validate('integer');
				validate('long');
			});

			it('validates nulls', function() {
				var constraints = {
						type: 'null',
						message: 'null message'
					},
					validator = Type(constraints),
					result = validator(1),
					result2 = validator(null);

				result.length.should.equal(1);
				result2.length.should.equal(0);
			});

			it('validates numerics', function() {
				var constraints = {
						type: 'numeric',
						message: 'numeric message'
					},
					validator = Type(constraints),
					result = validator(true),
					result2 = validator("1.234"),
					result3 = validator(1.234);

				result.length.should.equal(1);
				result2.length.should.equal(0);
				result3.length.should.equal(0);				
			});

			// checks that the typeof the input is 'object' and the input is not null.
			// yeah, everything in JavaScript is an object.
			// But we want this play nice with a server-side language.
			it('validates objects', function() {
				var constraints = {
						type: 'object',
						message: 'object message'
					},
					validator = Type(constraints),
					result = validator(1),
					result2 = validator(null),
					result3 = validator({});

				result.length.should.equal(1);
				result2.length.should.equal(1);
				result3.length.should.equal(0);
			});

			// does not support the resource type

			it('validates scalars', function() {
				var constraints = {
						type: 'scalar',
						message: 'scalar message'
					},
					validator = Type(constraints),
					result = validator(1),
					result2 = validator(true),
					result3 = validator("string"),
					result4 = validator(function() {}),
					result5 = validator({});

				result.length.should.equal(0);
				result2.length.should.equal(0);
				result3.length.should.equal(0);
				result4.length.should.equal(1);
				result5.length.should.equal(1);
			});

			it('validates strings', function() {
				var constraints = {
						type: 'string',
						message: 'string message'
					},
					validator = Type(constraints),
					result = validator(1)
					result2 = validator('string');

				result.length.should.equal(1);
				result2.length.should.equal(0);
			});
		});
	});
}));