(function(){Sprinklers = new Mongo.Collection('sprinklers');

  Sprinklers.setAllInactive = function() {
    console.log('setting all inactive');
  }

  Sprinklers.activeSprinkler = function() {
    return Sprinklers.findOne({
      status: { $in: ['active', 'paused'] }
    });
  }
})();
