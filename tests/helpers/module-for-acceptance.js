import { module } from 'qunit';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import { resolve } from 'rsvp';

export default function moduleForAcceptance(name, options = {}) {
	module(name, {
		beforeEach() {
			this.application = startApp();

			if (options.beforeEach) {
				return options.beforeEach.apply(this, arguments);
			}

			return null;
		},

		afterEach() {
			const afterEach = options.afterEach && options.afterEach.apply(this, arguments);

			return resolve(afterEach).then(() => destroyApp(this.application));
		},
	});
}
