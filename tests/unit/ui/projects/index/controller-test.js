import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | projects/index', function(hooks) {
	setupTest(hooks);

	// TODO: Replace this with your real tests.
	test('it exists', function(assert) {
		const controller = this.owner.lookup('controller:projects/index');
		assert.ok(controller);
	});
});
