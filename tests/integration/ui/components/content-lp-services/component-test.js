import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

const data = [];

describe('Integration | Component | content lp services', function() {
	setupComponentTest('content-lp-services', {
		integration: true,
	});

	beforeEach(function() {
		this.set('data', data);
	});

	it('renders', function() {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.on('myAction', function (val) { ... });
		// Template block usage:
		// this.render(hbs`
		// 	{{#content-lp-services}}
		// 		template content
		// 	{{/content-lp-services}}
		// `);

		this.render(hbs`{{content-lp-services data=data}}`);

		expect(this.$()).to.have.length(1);
	});
});