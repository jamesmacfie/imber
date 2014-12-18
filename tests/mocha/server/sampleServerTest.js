'use strict';

if (typeof MochaWeb !== 'undefined') {
	MochaWeb.testOnly(function(){

		describe('Daily run', function(){
			it('should have a Meteor version defined', function(){
				chai.assert(Meteor.release);
			});
		});
	});
}
