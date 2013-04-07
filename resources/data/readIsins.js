document.executeOnce('/mongo-db/')

function handleInit(conversation) {
	conversation.addMediaTypeByName('application/json')
	conversation.addMediaTypeByName('text/plain')
}

function isSystem(collectionName) {
	return (collectionName.substr(0, 7) == 'system.') || (collectionName.substr(0, 4) == 'tmp.')
}

function handleGet(conversation) {
	var Id = conversation.locals.get('id')
	var limit = conversation.query.get('limit')
	var start = conversation.query.get('start')
	var connection = application.globals.get('mongoDbConnection')
	if (null === connection) {
		try {
			connection = MongoDB.connect('127.0.0.1')
			application.globals.put('mongoDbConnection', connection) 
		}
		catch (x) {
		}
		}
if (null !== connection) {
	try {
		var databaseName = 'node-mongo-bb'
		var database = connection.getDB(databaseName)
		var connection = new MongoDB.connect('127.0.0.1')
		var collection = new MongoDB.Collection('contacts', {db: database, connection: connection}) // i dati isin sono contenuti nei documenti dei contatti
		var contact = collection.find({"_id" : new org.bson.types.ObjectId(Id)}).toArray()
		var isin = contact[0]["isin"] // anchese trova un solo elemento lo mette in array
		//return  JSON.to(contact[0].isin, true)
		var isins = []
		var dummy = null
		var n = 0
		for (var i in isin.slice(start,limit+start)){
			var d = {}
			dummy = isin[i]
			d.isin = dummy.isin
			d.price = dummy.price
			d.data = dummy.data
			d.size = dummy.size
			d.id = n  // creo un id  fittizio
			isins.push(d)
			n += 1
		}
		var results = {}
		results.data = isins
		results.total = 0 || isin.length
		return  JSON.to(results, true)
	}
	catch (x) {
		application.logger.warning(x.message)
	}
}
}
