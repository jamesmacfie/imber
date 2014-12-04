'use strict';

Template.registerHelper('primaryIcon', {
    iconType: 'primary'
});

Template.registerHelper('secondaryIcon', {
    iconType: 'secondary'
});

Template.registerHelper('sprinklerActionButtons', function() {
    switch(this.status) {
        case 'active':
            return 'sprinklerActionButtonsActive';
        case 'inactive':
            return 'sprinklerActionButtonsInactive';
        case 'paused':
            return 'sprinklerActionButtonsPaused';
    }

    console.warn('Unknown sprinker status of ' + this.status + ' for action buttons');
    return 'sprinklerActionButtonsInactive';
});
