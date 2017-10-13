import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';
import { A } from '@ember/array';

describe('Unit | Service | head data', function() {
	setupTest('service:head-data', {
		// needs: ['service:foo'],
	});

	// Replace this with your real tests.
	it('exists', function() {
		const service = this.subject();

		expect(service).to.be.ok;
	});

	it('has an empty list of inlineStyles', function() {
		const service = this.subject();

		expect(service.get('inlineStyles')).to.be.an.instanceOf(Array);
	});
});
