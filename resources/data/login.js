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

function handleInit(conversation) {
	conversation.addMediaTypeByName('application/json')
	conversation.addMediaTypeByName('text/plain')
}

function isSystem(collectionName) {
	return (collectionName.substr(0, 7) == 'system.') || (collectionName.substr(0, 4) == 'tmp.')
}
function handlePost(conversation)
{
	var text =JSON.from(conversation.form,true)
	var pwd =  text.loginPassword
	var username =text.loginUsername
	//return JSON.to(text.loginUsername,true)
	var connection = application.globals.get('mongoDbConnection')
		if (null === connection) {
			try {
				connection = MongoDB.connect('127.0.0.1')
				application.globals.put('mongoDbConnection', connect) 
			}
			catch (x) {
			}
		}
		var firm = conversation.query.get('firm')
		var databaseName = 'node-mongo-bb'//databaseNames[d]
					var database = connection.getDB(databaseName)
					var children = []
					var systemChildren = []
					var collectionNames = database.collectionNames.toArray()
					var connection = new MongoDB.connect('127.0.0.1')
					var collection = new MongoDB.Collection('users', {db: database, connection: connection})
					var text =conversation.entity.text
					var user = collection.findOne({$and:[{"user":username},{password:pwd}]})
					var results={}
					results.user= user
					results.success=(user!=null)?true:false

	//return "{firm: 'Ed Spencer', note: 'ed@sencha.com','paese':'it'}"
	return JSON.to(results,true)
}
