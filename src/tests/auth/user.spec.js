import 'dotenv/config';

import chai from 'chai';
import { BASE_URL } from '../../config';
import { userAuth } from '../helper';
import { auth } from '../../utils';

const { expect } = chai;

describe('User Authentication routes APIs', function () {
	this.timeout(0);
	this.slow(1000);

	before(async () => {
		await auth.signOut('userToken');
	});

	it(`${BASE_URL}/api/user/auth/logout => DEL => should success`, async () => {
		try {
			const { body } = await userAuth.login();

			const { error, text } = await userAuth.logout(body.token);

			expect(error).to.be.false;
			expect(text).to.be.a.string("You've successfully signed out.");
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		}
	});

	it(`${BASE_URL}/api/user/auth/logout => DEL => should fail`, async () => {
		try {
			const { error, text } = await userAuth.logout();

			expect(error).to.be.an.instanceOf(Error);
			expect(text).to.be.a.string('You need to sign in.');
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		}
	});

	it(`${BASE_URL}/api/user/auth/login => POST => should fail`, async () => {
		try {
			const { error, text } = await userAuth.login('shahan', 'wrong-password');

			expect(error).to.be.an.instanceOf(Error);
			expect(text).to.be.a.string('Not Authenticated');
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		}
	});

	it(`${BASE_URL}/api/user/auth/login => POST => should fail`, async () => {
		try {
			const { error, text } = await userAuth.login('wrong-username', '123abc456');

			expect(error).to.be.an.instanceOf(Error);
			expect(text).to.be.a.string('Not Authenticated');
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		}
	});

	it(`${BASE_URL}/api/user/auth/login => POST => should success`, async () => {
		try {
			const { body, error } = await userAuth.login();

			expect(error).to.be.false;
			['token', 'user'].map((prop) => expect(body).to.have.property(prop));
			expect(body.user).to.be.an('object');
			expect(body.user).not.have.property('password');
			['id', 'username', 'role'].map((prop) => expect(body.user).to.have.property(prop));
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		}
	});

	it(`${BASE_URL}/api/user/auth/login => POST => should fail`, async () => {
		try {
			const { error, text } = await userAuth.login();

			expect(error).to.be.an.instanceOf(Error);
			expect(text).to.be.a.string('You need to sign out.');
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		} finally {
			await auth.signOut('userToken');
		}
	});

	it(`${BASE_URL}/api/user/auth/me => GET => should success`, async () => {
		try {
			const { body: loginBody } = await userAuth.login();

			const { body, error } = await userAuth.me(loginBody.token);

			expect(error).to.be.false;
			expect(body).to.be.an('object');
			expect(body).not.have.property('password');
			['id', 'username', 'role'].map((prop) => expect(body).to.have.property(prop));
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		} finally {
			await auth.signOut('userToken');
		}
	});

	it(`${BASE_URL}/api/user/auth/me => GET => should fail`, async () => {
		try {
			const { error, text } = await userAuth.me();

			expect(error).to.be.an.instanceOf(Error);
			expect(text).to.be.a.string('You need to sign in.');
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		}
	});
});
