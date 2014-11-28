'use strict';

// The function names in this file are fucked.

Meteor.startup(function () {
	Meteor.methods({
		setSprinklerActive: function(s) {
			Sprinklers.update({
				id: {
					$nin: [s._id]
				}
			}, {
				$set: {
					status: 'inactive'
				}
			}, {
				multi: true
			});

			Sprinklers.update(s._id, {
				$set: {
					status: 'active'
				}
			});
		},
		/*
		 * Useful information for any service that is consuming data and subscribing to events
		 * from the sprinkler collection. This returns data that gives minimal information about
		 * the sprinklers
		 */
		getConnectionDetails: function() {
			var sprinklers = Sprinklers.find(),
				returnArr = [];

			sprinklers.forEach(function(s) {
				returnArr.push({
					id: s._id,
					name: s.name,
					status: s.status,
					connection: s.connection
				});
			});

			return returnArr;
		}
	});

	function checkSprinklers() {
		if (!checkSprinklerCountdown()) {
			checkSprinklerTimer();
		}
	}

	function checkSprinklerCountdown() {
		var activeSprinkler = Sprinklers.findOne({
				status: { $in: ['active', 'paused'] }
			});

		if (activeSprinkler) {
			activeSprinklerSet(activeSprinkler);
			return true;
		} else {
			return false;
		}
	}

	function checkSprinklerTimer() {
		var sprinklers = Sprinklers.find(),
			stopLoop = false;

		sprinklers.forEach(function(sprinkler) {
			if (!stopLoop) {
				stopLoop = timerSprinkler(sprinkler);
			}
		});
	}

	function timerSprinkler(sprinkler) {
		var time = sprinkler.timer.time,
			duration = sprinkler.timer.duration,
			status = sprinkler.status,
			timeSeperator = time.indexOf(':'),
			hour = time.slice(0, timeSeperator),
			minute = time.slice(timeSeperator + 1, time.length),
			momentNow = new moment(new Date()),
			momentStart = new moment(new Date()),
			momentEnd = new moment(new Date());

		momentStart.hours(hour);
		momentEnd.hours(hour);
		momentStart.minutes(minute);
		momentEnd.minutes(minute);
		momentStart.hours(hour);
		momentEnd.hours(hour);

		momentEnd.add(duration, 's');

		if ((momentStart < momentNow) &&
			momentNow <= momentEnd) {
			if (status === 'inactive') {
				console.log(momentStart.diff(momentNow, 's'));
				Sprinklers.update(sprinkler._id, {
					$set: {
						status: 'active',
						'timer.lastRUn': new Date(),
						currentTimer: Math.abs(momentStart.diff(momentNow, 's'))
					}
				});
				return true;
			}
		} else {
			if (status === 'active') {
				Sprinklers.update(sprinkler._id, {
					$set: {
						status: 'inactive'
					}
				});
			}
		}
	}

	function activeSprinklerSet(sprinkler) {
		var status = sprinkler.status,
			timer = sprinkler.timer,
			newTime = sprinkler.currentTimer + 1;

		if (status === 'active') {
			if (newTime >= timer.duration) {
				Sprinklers.update(sprinkler._id, {
					$set: {
						status: 'inactive',
						currentTimer: 0
					}
				});
			} else {
				Sprinklers.update(sprinkler._id, {
					$set: {
						currentTimer: newTime
					}
				});
			}
		}
	}

	Meteor.setInterval(checkSprinklers, 1000);

});
