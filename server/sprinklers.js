'use strict';


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
		},

		/* Need to consolidate these two functions - the only differnece is that this
		 * doesn't return the connection details*/
		checkSprinklerStatus: function() {
			var sprinklers = Sprinklers.find(),
				returnArr = [];

			sprinklers.forEach(function(s) {
				returnArr.push({
					id: s._id,
					name: s.name,
					status: s.status
				});
			});

			return returnArr;
		}
	});
