import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find, findAll } from 'ember-native-dom-helpers';

describe('Integration | Component | content project gallery', function() {
	setupComponentTest('content-project-gallery', {
		integration: true,
	});

	const data = {
		images: ['foo', 'bar', 'baz', 'qux'],
	};

	beforeEach(function() {
		this.set('data', data);
		this.render(hbs`
			{{content-project-gallery data=data}}
		`);
	});

	it('renders', function() {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.on('myAction', function (val) { ... });
		// Template block usage:
		// this.render(hbs`
		// 	{{#content-project-gallery}}
		// 		template content
		// 	{{/content-project-gallery}}
		// `);

		expect(findAll('.content-project-gallery__image')).to.have.lengthOf(data.images.length);
		expect(findAll('.content-project-gallery__image')[0].getAttribute('src')).to.equal('/img/foo.svg');
	});
});