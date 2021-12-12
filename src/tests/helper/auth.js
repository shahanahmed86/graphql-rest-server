const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../');

chai.use(chaiHttp);

module.exports.adminLogin = async function (username = 'shahan', password = 'shahan') {
	return server.then(async (app) => {
		const result = await chai
			.request(app)
			.post(`/api/admin/auth/login`)
			.set('content-type', 'application/json')
			.field('username', username)
			.field('password', password);

		return result;
	});
};