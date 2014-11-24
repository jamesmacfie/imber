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
		}
	});


	Meteor.setInterval(checkSprinklerTimer, 1000);
	function checkSprinklerTimer() {
		var activeSprinkler = Sprinklers.findOne({
				status: { $in: ['active', 'paused'] }
			}),
			sprinklers = Sprinklers.find();

		if (activeSprinkler) {
			activeSprinklerSet(activeSprinkler);
		}
	}

	function activeSprinklerSet(sprinkler) {
		var status = sprinkler.status,
			timer = sprinkler.timer,
			newTime = sprinkler.currentTimer + 1;

		if (sprinkler.status === 'active') {
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

});
