//
// Copyright 2010-2011 Three Crickets LLC.
//
// The contents of this file are subject to the terms of the Apache License
// version 2.0: http://www.opensource.org/licenses/apache2.0.php
// 
// Alternatively, you can obtain a royalty free commercial license with less
// limitations, transferable or non-transferable, directly from Three Crickets
// at http://threecrickets.com/
//

document.executeOnce('/mongo-db/')
document.executeOnce('/session/')
var cache_firm_id = {}
function handleInit(conversation) {
	conversation.addMediaTypeByName('application/json')
	conversation.addMediaTypeByName('text/plain')
}

function isSystem(collectionName) {
	return (collectionName.substr(0, 7) == 'system.') || (collectionName.substr(0, 4) == 'tmp.')
}

function handlePut(conversation)
{
	//return JSON.to(conversation.globals.get('mongoDbConnection'),true)
	var Id = conversation.locals.get('id')
	//return JSON.to(Id,true)
	var connection = application.globals.get('mongoDbConnection')
	
		if (null === connection) {
			try {
				connection = MongoDB.connect('127.0.0.1')
				application.globals.put('mongoDbConnection', connect) 
			}
			catch (x) {
			}
		}
		
		var firm = conversation.locals.get('firm')
		var databaseName = 'node-mongo-bb'//databaseNames[d]
		var database = connection.getDB(databaseName)
		var children = []
		var systemChildren = []
		var collectionNames = database.collectionNames.toArray()
		var connection = new MongoDB.connect('127.0.0.1')
		var collection = new MongoDB.Collection('companies', {db: database, connection: connection})
		var session = new MongoDB.Collection('session', {db: database, connection: connection})
		var text = conversation.entity.text
					//return JSON.to(text,true)
		var data = JSON.from(text, true)
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
					//return JSON.to(data,true)
		var company = {}
		company.firm = data.firm
		company.note = data.note
		company.paese = data.paese
		company.type = data.type
		company.email = data.email
		company.telefono = data.telefono
		company.website = data.website
		company.c = data.c
		company.p = data.p
		company.linee = data.linee
		dateObj = new Date()
		var today
		var dd = dateObj.getDate();
		var mm = dateObj.getMonth()+1;
		var yyyy = dateObj.getFullYear();
		if(dd<10)
		{dd='0'+dd}
		if(mm<10)
		{mm='0'+mm}
		today = mm+'/'+dd+'/'+yyyy
		company.data = today
						//return JSON.to('update',true)
		collection.update({"_id" : new org.bson.types.ObjectId(Id)},{$set:company})
					
	//return "{firm: 'Ed Spencer', note: 'ed@sencha.com','paese':'it'}"
		return JSON.to(company,true)
}

function handleDelete(conversation)
{
	
	//return JSON.to(conversation.globals.get('mongoDbConnection'),true)
	var Id = conversation.locals.get('id')
	//return JSON.to(Id,true)
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
	var collection = new MongoDB.Collection('companies', {db: database, connection: connection})
	collection.remove({"_id" : new org.bson.types.ObjectId(Id)})
	var result = {}
	result.success = true
	return JSON.to(result,true)
}

