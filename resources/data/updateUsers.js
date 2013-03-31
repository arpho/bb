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
		var collection = new MongoDB.Collection('users', {db: database, connection: connection})
		var text = conversation.entity.text
					//return JSON.to(text,true)
		var data = JSON.from(text, true)
					//return JSON.to(data,true)
		var user = {}
		user.user= data.user
		user.password = data.password
		user.superuser = data.superuser
		user.enabled = data.enabled
		user.id = Id
		//return JSON.to(contact,true)
						//return JSON.to('update',true)
		collection.update({"_id" : new org.bson.types.ObjectId(Id)},{$set:user})
		
	//return "{firm: 'Ed Spencer', note: 'ed@sencha.com','paese':'it'}"
	return JSON.to(user,true)
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
	var collection = new MongoDB.Collection('users', {db: database, connection: connection})
	collection.remove({"_id" : new org.bson.types.ObjectId(Id)})
	var result = {}
	result.success = true
	return JSON.to(result,true)
}

