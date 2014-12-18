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
	 * Checks if a sprinkler's scheduled duration has finished. Sets the sprinkler
	 * if it has; increments the currentTimer if it hasn't
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

		// Do we even want to run this schedule?
		if (!sprinkler.timer.active) {
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
	}

	Meteor.setInterval(checkSprinklers, 1000);
});
