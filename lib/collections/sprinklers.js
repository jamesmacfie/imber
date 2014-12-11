Sprinklers = new Mongo.Collection('sprinklers');

Sprinklers.activeSprinkler = function() {
	return Sprinklers.findOne({
		status: { $in: ['active', 'paused'] }
	});
};
