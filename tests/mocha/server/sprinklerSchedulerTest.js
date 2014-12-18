'use strict';

if (typeof MochaWeb !== 'undefined') {
    MochaWeb.testOnly(function(){
        describe('Sprinker scheduler day function', function() {
            it ('should return true when a sprinkler is due to run today', function() {
                var sprinkler = {
                    timer: {
                        days: 1,
                        lastStopDate: new moment().subtract(1, 'd')
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
                        lastStopDate: new moment().subtract(2, 'd')
                    }
                };

                chai.assert.isTrue(Sprinklers.isScheduledDay(sprinkler));
            });
        });

        describe('Sprinker scheduler time function', function() {
            it ('should return true when a sprinkler is due to run right now', function() {
                var now = new moment().subtract(5, 'm'),
                    sprinkler = {
                        timer: {
                            time: now.format('HH:mm'),
                            duration: 600
                        }
                    };

                chai.assert.isTrue(Sprinklers.isSchdeduledTime(sprinkler));
            });

            it ('should return false when a sprinkler is due to run an hour ago', function() {
                var now = new moment().subtract(60, 'm'),
                sprinkler = {
                    timer: {
                        time: now.format('HH:mm'),
                        duration: 600
                    }
                };

                chai.assert.isFalse(Sprinklers.isSchdeduledTime(sprinkler));
            });

            it ('should return false when a sprinkler is due to run an hour from now', function() {
                var now = new moment().add(60, 'm'),
                sprinkler = {
                    timer: {
                        time: now.format('HH:mm'),
                        duration: 600
                    }
                };

                chai.assert.isFalse(Sprinklers.isSchdeduledTime(sprinkler));
            });
        });

        describe('Sprinker start time function', function() {
            it ('should return a valid moment object when given a sprinkler with a set time', function() {
                var sprinkler = {
                        timer: {
                            time: new moment().format('HH:mm'),
                        }
                    },
                    startMoment = Sprinklers.getStartMoment(sprinkler);

                chai.assert.isTrue(startMoment.isValid());
            });

            it ('should return a the correct startTime moment object for the time 00:00', function() {
                var sprinkler = {
                    timer: {
                        time: ('00:00'),
                    }
                },
                startMoment = Sprinklers.getStartMoment(sprinkler);

                chai.assert.isTrue(startMoment.isValid() && startMoment.format('HH:mm') === '00:00');
            });

            it ('should return a the correct startTime moment object for the time 1:23', function() {
                var sprinkler = {
                    timer: {
                        time: ('1:23'),
                    }
                },
                startMoment = Sprinklers.getStartMoment(sprinkler);

                chai.assert.isTrue(startMoment.isValid() && startMoment.format('HH:mm') === '01:23');
            });

            it ('should return a the correct startTime moment object for the time 01:23', function() {
                var sprinkler = {
                    timer: {
                        time: ('01:23'),
                    }
                },
                startMoment = Sprinklers.getStartMoment(sprinkler);

                chai.assert.isTrue(startMoment.isValid() && startMoment.format('HH:mm') === '01:23');
            });

            it ('should return a the correct startTime moment object for the time 14:00', function() {
                var sprinkler = {
                    timer: {
                        time: ('14:00'),
                    }
                },
                startMoment = Sprinklers.getStartMoment(sprinkler);

                chai.assert.isTrue(startMoment.isValid() && startMoment.format('HH:mm') === '14:00');
            });

            it ('should return a the correct startTime moment object for the time 23:59', function() {
                var sprinkler = {
                    timer: {
                        time: ('23:59'),
                    }
                },
                startMoment = Sprinklers.getStartMoment(sprinkler);

                chai.assert.isTrue(startMoment.isValid() && startMoment.format('HH:mm') === '23:59');
            });

        });

        describe('Sprinker duration function', function() {
            it ('should return false when a sprinkler is active and has not finised it\'s scheduled duration', function() {
                var sprinkler = {
                    status: 'active',
                    timer: {
                        duration: 600
                    },
                    currentTimer: 45
                };

                chai.assert.isFalse(Sprinklers.durationFinished(sprinkler));
            });

            it ('should return true when a sprinkler is active and has reached it\'s scheduled duration', function() {
                var sprinkler = {
                    status: 'active',
                    timer: {
                        duration: 45
                    },
                    currentTimer: 45
                };

                chai.assert.isTrue(Sprinklers.durationFinished(sprinkler));
            });

            it ('should return true when a sprinkler is active and has exceeded it\'s scheduled duration', function() {
                var sprinkler = {
                    status: 'active',
                    timer: {
                        duration: 45
                    },
                    currentTimer: 50
                };

                chai.assert.isTrue(Sprinklers.durationFinished(sprinkler));
            });

            it ('should throw an error when a non-active sprinkler is testsed for it\'s finished duration', function() {
                var sprinkler = {
                    status: 'inactive',
                    timer: {
                        duration: 600
                    },
                    currentTimer: 45
                };
                try {
                    Sprinklers.durationFinished(sprinkler);
                } catch(e) {
                    chai.assert(true);
                }

            });
        });

    });
}
