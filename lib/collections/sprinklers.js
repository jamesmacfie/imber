Sprinklers = new Mongo.Collection('sprinklers');

/*
 * Helper functionality for the sprinkler collection and individual sprinkler records.
 *
 * Many of these functions are to do with scheduling the timers.
 */

Sprinklers.activeSprinkler = function() {
	return Sprinklers.findOne({
		status: { $in: ['active', 'paused'] }
	});
};

/*
 * Given a sprinkler, will return a boolean to see if the sprinkler is scheduled to
 * run today.
 *
 * @params {object} [sprinkler] The sprinkler to check against
 *
 * @returns {boolean}
 */
Sprinklers.isScheduledDay = function(sprinkler) {
	'use strict';
	var momentNow = new moment(new Date()),
		momentLastStop = new moment(sprinkler.timer.lastStopDate),
		dayDiff = sprinkler.timer.days - momentLastStop.diff(momentNow, 'd');

	if (dayDiff <= sprinkler.timer.days) {
		// The number of days we have to wait haven't passed. Let's jet.
		return false;
	}

	return true;
};

Sprinklers.isSchdeduledTime = function() {

};

Sprinklers.getStartMoment = function() {

};

Sprinklers.getEndMoment = function() {

};

Sprinklers.startSchedule = function() {

};

Sprinklers.endSchedule = function() {

};

Sprinklers.durationFinished = function() {

};
