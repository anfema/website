import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
	location: config.locationType,
	rootURL: config.rootURL,
});

// eslint-disable-next-line array-callback-return
Router.map(function () {
	this.route('projects');
	this.route('project', { path: 'project/:id' });
	this.route('imprint');
});

export default Router;
