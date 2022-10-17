const db = require("./dao");

exports.getQueueLength = serviceID => {
	return new Promise((resolve, reject) => {
		const query =
			"SELECT COUNT(*) AS length FROM TICKETS WHERE serviceId = ?";
		db.get(query, [serviceID], (err, row) => {
			if (err) reject(err);
			else resolve(row.length);
		});
	});
};

exports.getServiceTime = serviceID => {
	return new Promise((resolve, reject) => {
		const query = "SELECT expectedTime FROM SERVICES WHERE serviceId = ?";
		db.get(query, [serviceID], (err, row) => {
			if (err) reject(err);
			else resolve(row);
		});
	});
};
