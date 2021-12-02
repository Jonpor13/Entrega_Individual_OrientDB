const OrientDBClient = require("orientjs").OrientDBClient;

OrientDBClient.connect({
	host: "servidor-orientdb",
	port: 2424
}).then(client => {
	client.session({ name: "OSystem", username: "root", password: "rootpwd"})
	.then(session => {
		session.command("create class prueba")
		session.close().then(()=>{
			return client.close()
		}).then(()=>{
			console.log('Client closed')
		});
	});
});

