import styleBody from 'ghost/mixins/style-body';
import ShortcutsRoute from 'ghost/mixins/shortcuts-route';
import loadingIndicator from 'ghost/mixins/loading-indicator';
import PaginationRouteMixin from 'ghost/mixins/pagination-route';

var paginationSettings = {
    status: 'all',
    staticPages: 'all',
    page: 1
};

var PostsRoute = Ember.Route.extend(SimpleAuth.AuthenticatedRouteMixin, ShortcutsRoute, styleBody, loadingIndicator, PaginationRouteMixin, {
    classNames: ['manage'],

    model: function () {
        var self = this;

        return this.store.find('user', 'me').then(function (user) {
            if (user.get('isAuthor')) {
                paginationSettings.author = user.get('slug');
            }
            // using `.filter` allows the template to auto-update when new models are pulled in from the server.
            // we just need to 'return true' to allow all models by default.
            return self.store.filter('post', paginationSettings, function (post) {
                if (user.get('isAuthor')) {
                    return user.get('id') === post.get('author_id');
                }

                return true;
            });
        });
    },

    setupController: function (controller, model) {
        this._super(controller, model);
        this.setupPagination(paginationSettings);
    },

    shortcuts: {
        'up': 'moveUp',
        'down': 'moveDown'
    },
    actions: {
        openEditor: function (post) {
            this.transitionTo('editor.edit', post);
        },
        moveUp: function () {
            window.alert('@todo keyboard post navigation: up');
        },
        moveDown: function () {
            window.alert('@todo keyboard post navigation: down');
        }
    }
});

export default PostsRoute;
