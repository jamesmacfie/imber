'use strict';

/*
 * Generic useful functions for templates
 */

/*
 * Get's the name of the primary icon modifier class
 *
 * @returns {string} The modifier class
 */
Template.registerHelper('primaryIcon', {
    iconType: 'primary'
});

/*
 * Get's the name of the secondary icon modifier class
 *
 * @returns {string} The modifier class
 */
Template.registerHelper('secondaryIcon', {
    iconType: 'secondary'
});

/*
 * Returns the name of the template for showing the a sprinkler's action buttons
 * given the scope of a sprinkler.
 *
 * @returns {string} The name of the button template
 */
Template.registerHelper('sprinklerActionButtons', function() {
    switch(this.status) {
        case 'active':
            return 'sprinklerActionButtonsActive';
        case 'inactive':
            return 'sprinklerActionButtonsInactive';
        case 'paused':
            return 'sprinklerActionButtonsPaused';
    }

    // Just in case we hit something weird
    console.warn('Unknown sprinker status of ' + this.status + ' for action buttons');
    return 'sprinklerActionButtonsInactive';
});
