'use strict';

if (typeof MochaWeb !== 'undefined') {
    MochaWeb.testOnly(function(){
        describe('Sprinker scheduler functions', function() {
            it ('should return true when a sprinkler is due to run today', function() {
                var sprinkler = {
                    timer: {
                        days: 1,
                        lastStopDate: new moment(new Date()).subtract(1, 'd')
                    }
                };


                console.log(chai);
                chai.assert.isTrue(Sprinklers.isScheduledDay(sprinkler));
            });

            it ('should return false when a sprinkler is due to run tomorrow', function() {
                var sprinkler = {
                    timer: {
                        days: 1,
                        lastStopDate: new Date()
                    }
                };

                chai.assert.isFalse(Sprinklers.isScheduledDay(sprinkler));
            });

            it ('should return true when a sprinkler is due to run yesterday', function() {
                var sprinkler = {
                    timer: {
                        days: 1,
                        lastStopDate: new moment(new Date()).subtract(2, 'd')
                    }
                };

                chai.assert.isTrue(Sprinklers.isScheduledDay(sprinkler));
            });
        });
    });
}
