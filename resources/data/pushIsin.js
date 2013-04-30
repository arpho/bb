document.executeOnce('/mongo-db/')
document.executeOnce('/session/')



function handleInit(conversation) {
	conversation.addMediaTypeByName('application/json')
	conversation.addMediaTypeByName('text/plain')
}

function isSystem(collectionName) {
	return (collectionName.substr(0, 7) == 'system.') || (collectionName.substr(0, 4) == 'tmp.')
}

function handlePost(conversation) {
	var connection = application.globals.get('mongoDbConnection')
	if (null === connection) {
		try {
			connection = MongoDB.connect('127.0.0.1')
			application.globals.put('mongoDbConnection', connect) 
		}
		catch (x) {
		}
	}
	var databaseName = 'node-mongo-bb'//databaseNames[d]
	var database = connection.getDB(databaseName)
	var children = []
	var systemChildren = []
	var collectionNames = database.collectionNames.toArray()
	var connection = new MongoDB.connect('127.0.0.1')
	var collection = new MongoDB.Collection('contacts', {db: database, connection: connection})
	var session = new MongoDB.Collection('session', {db: database, connection: connection})
	var text = conversation.entity.text
	var data = JSON.from(text, true)
	var Id = data.contact_id
	var Isin = {}
	//return  JSON.to(data, true)
	var session_id = data.session_id
	
	var user = check_session(session,new org.bson.types.ObjectId(session_id))
	//return  JSON.to(user.toArray(), true)
	if(user.toArray().length==0)
	{
		var r ={}
		r.success = false
		r.message = 'Access denied: sessione non valida!!'
		return  JSON.to(r, true)
	}
	Isin.isin = data.isin
	Isin.price = data.price
	Isin.data = data.data
	Isin.size = data.size
	Isin.nota = data.nota
	Isin.c_id =Id
	collection.update({"_id" : new org.bson.types.ObjectId(Id)},
				{$push:{isin:Isin}}
			)
			Isin.success = true
	return JSON.to(Isin,true)
}
