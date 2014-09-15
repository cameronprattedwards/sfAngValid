(function(test) {
	if (typeof define == 'function' && define.amd)
		define(['sfAngValid/ValidatorFactory'], test());
	else
		test(ValidatorFactory);
}(function(ValidatorFactory) {
	describe('ValidatorFactory', function() {
		describe('#makeValidator()', function() {
			it('returns an object', function() {
				var returnValue = ValidatorFactory.makeValidator({});
				returnValue.should.be.an('object');
			});

			it('fails if no backend constraints are passed', function() {
				function fails() { ValidatorFactory.makeValidator(); }
				fails.should.throw(Error);
			});
		});
	});
}));
