var ApplicationController = Ember.Controller.extend({
    // jscs: disable
    hideNav: Ember.computed.match('currentPath', /(error|signin|signup|setup|forgotten|reset)/),
    // jscs: enable

    sessionUserImageAltText: Ember.computed('session.user.image', 'session.user.name', function () {
        var name = this.get('session.user.name');

        return name + '\'s profile picture';
    }),

    topNotificationCount: 0,
    showGlobalMobileNav: false,
    showSettingsMenu: false,

    actions: {
        topNotificationChange: function (count) {
            this.set('topNotificationCount', count);
        }
    }
});

export default ApplicationController;
