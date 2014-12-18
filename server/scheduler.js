'use strict';

/*
 * Contains the logic for determining the countdown details of an active sprinkler
 * or setting a sprinkler as active if it's scheduled time is up.
 *
 * The interval runs every second and either updates the currently active sprinkler
 * (again assuming that only one can run at once) or checks to see if there are any
 * sprinklers that should be activated depending on their schedule.
 */

Meteor.startup(function () {
	/*
	 * Grabs any active sprinkler and, if there is one, will run the countdown timer. If
	 * not, check all other sprinklers for schedule details.
	 */
	function checkSprinklers() {
		var activeSprinkler = Sprinklers.activeSprinkler();

		if (activeSprinkler) {
			activeSprinklerCountdown(activeSprinkler);
		} else {
			checkAllSchedules();
		}
	}

	/*
	 * Countsdown the timer values for a given sprinkler. It will only countdown the
	 * the sprinkler if it's set as active. Paused states are ignored.
	 *
	 * @params {object} [sprinkler] An active/paused sprinkler
	 */
	function activeSprinklerCountdown(sprinkler) {
		if (Sprinklers.durationFinished(sprinkler)) {
			// We've passed the duration. Reset the timer and set as inactive
			Sprinklers.update(sprinkler._id, {
				$set: {
					status: 'inactive',
					'timer.lastStopDate': new Date(),
					currentTimer: 0
				}
			});
		} else {
			// We still have time to go. Set the timer to the new value
			Sprinklers.update(sprinkler._id, {
				$set: {
					currentTimer: Sprinklers.getNextTime(sprinkler)
				}
			});
		}
	}

	/*
	 * Check all sprinklers to see if any of them should be set as active
	 */
	function checkAllSchedules() {
		var sprinklers = Sprinklers.find(),
			stopLoop = false;

		sprinklers.forEach(function(sprinkler) {
			if (!stopLoop) {
				// If one of the sprinklers is set to active, set `stopLoop` to true
				// so that we don't check any more.
				stopLoop = checkSingleSprinklerSchedule(sprinkler);
			}
		});
	}

	/*
	 * Checks a single sprinklers schedule to see if it should be activated.
	 *
	 * @params {object} [sprinkler] The sprinkler to be checked
	 */
	function checkSingleSprinklerSchedule(sprinkler) {
		// Shouldn't run today
		if (!Sprinklers.isScheduledDay(sprinkler)) {
			return;
		}

		if (Sprinklers.isScheduledTime(sprinkler)) {
			if (sprinkler.status === 'inactive') {
				// The sprinkler is between it's scheduled time and is inactive. Set it
				// as active and set it's lastRun date. Also calculate the currentTime value
				// because we shouldn't assume this will always be 0.
				Sprinklers.update(sprinkler._id, {
					$set: {
						status: 'active',
						'timer.lastStartDate': new Date(),
						currentTimer: Sprinklers.getCurrentTimer(sprinkler)
					}
				});
				return true;
			}
		} else {
			if (sprinkler.status === 'active') {
				// A sprinkler is active and is outside it's set time. Set it as inactive.
				Sprinklers.update(sprinkler._id, {
					$set: {
						status: 'inactive',
						'timer.lastStopDate': new Date()
					}
				});
			}
		}
		//
		// var time = sprinkler.timer.time,
		// 	duration = sprinkler.timer.duration,
		// 	days = sprinkler.timer.days,
		// 	lastStopDate = sprinkler.timer.lastStopDate,
		// 	status = sprinkler.status,
		// 	timeSeperator = time.indexOf(':'),
		// 	hour = time.slice(0, timeSeperator),
		// 	minute = time.slice(timeSeperator + 1, time.length),
		// 	momentNow = new moment(new Date()),
		// 	momentStart = new moment(new Date()),
		// 	momentEnd = new moment(new Date()),
		// 	momentLastStop = new moment(lastStopDate),
		// 	dayDiff;
		//
		// dayDiff = days - momentLastStop.diff(momentNow, 'd');
		//
		// if (dayDiff < days) {
		// 	// The number of days we have to wait haven't passed. Let's jet.
		// 	return;
		// }
		//
		// // Set all out start/end times to be at the defined time
		// momentStart.hours(hour);
		// momentEnd.hours(hour);
		// momentStart.minutes(minute);
		// momentEnd.minutes(minute);
		// momentStart.seconds(0);
		// momentEnd.seconds(0);
		// momentStart.milliseconds(0);
		// momentEnd.milliseconds(0);
		//
		//
		// // Increate the end time by our sprinklers duration (saved as seconds)
		// momentEnd.add(duration, 's');
		//
		// console.log(['Checking', momentNow.format('HH:mm'), 'against', momentStart.format('HH:mm'), '&&', momentEnd.format('HH:mm')].join(' '));
		//
		// if ((momentStart < momentNow) && momentNow <= momentEnd) {
		// 	if (status === 'inactive') {
		// 		// The sprinkler is between it's scheduled time and is inactive. Set it
		// 		// as active and set it's lastRun date. Also calculate the currentTime value
		// 		// because we shouldn't assume this will always be 0.
		// 		Sprinklers.update(sprinkler._id, {
		// 			$set: {
		// 				status: 'active',
		// 				'timer.lastStartDate': new Date(),
		// 				currentTimer: Math.abs(momentStart.diff(momentNow, 's'))
		// 			}
		// 		});
		// 		return true;
		// 	}
		// } else {
		// 	if (status === 'active') {
		// 		// A sprinkler is active and is outside it's set time. Set it as inactive.
		// 		Sprinklers.update(sprinkler._id, {
		// 			$set: {
		// 				status: 'inactive',
		// 				'timer.lastStopDate': new Date()
		// 			}
		// 		});
		// 	}
		// }
	}

	Meteor.setInterval(checkSprinklers, 1000);
});
