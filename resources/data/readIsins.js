document.executeOnce('/mongo-db/')
document.executeOnce('/session/')
document.executeOnce('/constants/')

function handleInit(conversation) {
	conversation.addMediaTypeByName('application/json')
	conversation.addMediaTypeByName('text/plain')
}

function isSystem(collectionName) {
	return (collectionName.substr(0, 7) == 'system.') || (collectionName.substr(0, 4) == 'tmp.')
}
function slice(arr,begin,end){
	var r = []
	for (var i in arr){
				if ((i>=begin) && (i<end)){
					r.push(arr[i])
				}
			}
			return r
	}

function handleGet(conversation) {
	var Id = conversation.locals.get('id')
	var limit = conversation.query.get('limit')
	var session_id = conversation.query.get('session_id')
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
		var databaseName = db_name//'node-mongo-bb'
		var database = connection.getDB(databaseName)
		var connection = new MongoDB.connect('127.0.0.1')
		var collection = new MongoDB.Collection('contacts', {db: database, connection: connection}) // i dati isin sono contenuti nei documenti dei contatti
		var session = new MongoDB.Collection('session', {db: database, connection: connection})
		var user = check_session(session,new org.bson.types.ObjectId(session_id))
		//return  JSON.to(user.toArray(), true)
		if(user.toArray().length==0)
		{
			var r ={}
			r.success = false
			r.message = 'Access denied: sessione non valida!!'
			return  JSON.to(r, true)
		}
		var contact = collection.find({"_id" : new org.bson.types.ObjectId(Id)}).toArray()
		var isin = contact[0]["isin"] // slice1 non fa nulla
		return  JSON.to(isin, true)
		var isins = []
		var dummy = null
		var n = 0
		var a ='isin'
		if (typeof isin === "undefined"){
			var results = {}
		results.data = []
		results.total = 0 
		return  JSON.to(start, true)// chiudo qua l'elaborazione,non ci sono isin
		}
			//return  JSON.to(isin, true)
			for (var i in isin){
				var d = {}
				dummy = isin[i]
				d.isin = dummy.isin
				d.price = dummy.price
				d.data = dummy.data
				d.size = dummy.size
				d.nota = dummy.nota
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
