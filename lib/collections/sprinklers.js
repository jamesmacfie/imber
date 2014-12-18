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

/*
 * Given a sprinkler, will return a boolean to see if the sprinkler is scheduled to
 * run right now.
 *
 * @params {object} [sprinkler] The sprinkler to check against
 *
 * @returns {boolean}
 */
Sprinklers.isSchdeduledTime = function(sprinkler) {
	'use strict';

	var momentNow = new moment(new Date()),
		momentStart = Sprinklers.getStartMoment(sprinkler),
		momentEnd = Sprinklers.getEndMoment(sprinkler);

	return (momentStart < momentNow) && momentNow <= momentEnd;
};

/*
 * Given a sprinkler, will return a moment object set to the start time of the
 * sprinklers schedule.
 *
 * @params {object} [sprinkler] The sprinkler to check against
 *
 * @returns {objet} The start time moment
 */
Sprinklers.getStartMoment = function(sprinkler) {
	'use strict';

	var time = sprinkler.timer.time,
		timeSeperator = time.indexOf(':'),
		hour = time.slice(0, timeSeperator),
		minute = time.slice(timeSeperator + 1, time.length),
		momentStart = new moment(new Date());

	momentStart.hours(hour);
	momentStart.minutes(minute);
	momentStart.seconds(0);
	momentStart.milliseconds(0);

	return momentStart;
};

/*
 * Given a sprinkler, will return a moment object set to the end time of the
 * sprinklers schedule.
 *
 * @params {object} [sprinkler] The sprinkler to check against
 *
 * @returns {objet} The end time moment
 */
Sprinklers.getEndMoment = function(sprinkler) {
	'use strict';

	var duration = sprinkler.timer.duration,
		time = sprinkler.timer.time,
		timeSeperator = time.indexOf(':'),
		hour = time.slice(0, timeSeperator),
		minute = time.slice(timeSeperator + 1, time.length),
		momentEnd = new moment(new Date());

	momentEnd.hours(hour);
	momentEnd.minutes(minute);
	momentEnd.seconds(0);
	momentEnd.milliseconds(0);

	// Increate the end time by our sprinklers duration (saved as seconds)
	momentEnd.add(duration, 's');

	return momentEnd;
};

Sprinklers.startSchedule = function() {

};

Sprinklers.endSchedule = function() {

};

Sprinklers.durationFinished = function() {

};
