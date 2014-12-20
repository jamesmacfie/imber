'use strict';

if (typeof MochaWeb !== 'undefined') {
    MochaWeb.testOnly(function(){
        function setAllInactive() {
            Sprinklers.update({
                status: 'inactive'
            });
        }


        describe('A scheduled sprinkler due to run now should be set as active', function() {
            /* From what I can tell, Velocity is fucked when testing collections */


            // var momentNow = new moment();//,
            //     sprinklerId = Meteor.Sprinklers.insert({
                    // name: 'South veges',
                    // status: 'inactive',
                    // timer: {
                    //     lastStartDate: new moment().subtract(1, 'd').toDate(),
                    //     lastStopDate: new moment().subtract(1, 'd').toDate(),
                    //     time: '18:00',
                    //     days: 1,
                    //     duration: 60,
                    //     active: true
                    // },
                    // currentTimer: 0,
                    // connection: 1
                // });
                //
                //setAllInactive();
                //
                // var s = Sprinklers.activeSprinkler();
                // chai.assert(!s);
                // chai.assert.isTrue(true);

        });
    });
}
