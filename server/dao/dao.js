const fs = require("fs");
const sqlite = require("sqlite3");
const initQueries = async () => {
	const dataArr = dataSql.toString().split(");");
	db.serialize(() => {
		db.run("PRAGMA foreign_keys=OFF;");
		db.run("BEGIN TRANSACTION;");
		dataArr.forEach(query => {
			if (query) {
				query += ");";
				db.run(query, err => {
					if (err) throw err;
				});
			}
		});
		db.run("COMMIT;");
	});
};
let restart;
if (fs.existsSync(__dirname + "/database.db")) restart = true;
else restart = false;
const dataSql = fs.readFileSync(__dirname + "/initQueries.sql").toString();
const db = new sqlite.Database(__dirname + "/database.db", e => {
	if (e) throw { status: 500, message: "Failed to create the database" };
	else {
		if (!restart)
			initQueries()
				.then()
				.catch(e => {
					throw e;
				});
	}
});

module.exports = db;
