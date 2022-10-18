const db=require('./dao');

getServiceList = async () => new Promise((resolve, reject) => {
		const sql = 'SELECT ServiceName FROM SERVICES';
		db.all(sql, [], (err, rows) => {
			if (err) {
				reject(err);
				return;
			}
            const services = rows.map((s) => s.ServiceName)
			resolve(services);
		});
	});

const services = {getServiceList}
module.exports = services;