const db=require('./dao');

getServiceList = async () => new Promise((resolve, reject) => {
		const sql = 'SELECT ServiceID, ServiceName, TimeRequired FROM SERVICES';
		db.all(sql, [], (err, rows) => {
			if (err) {
				reject(err);
				return;
			}
            const services = rows.map((s) => ({ServiceID: s.ServiceID, ServiceName: s.ServiceName, TimeRequired: s.TimeRequired}));
			resolve(services);
		});
	});

const services = {getServiceList}
module.exports = services;