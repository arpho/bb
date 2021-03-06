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
document.executeOnce('/constants/')

function handleInit(conversation) {
	conversation.addMediaTypeByName('application/json')
	conversation.addMediaTypeByName('text/plain')
}

function isSystem(collectionName) {
	return (collectionName.substr(0, 7) == 'system.') || (collectionName.substr(0, 4) == 'tmp.')
}
function handlePost(conversation)
{/*passo i dati in post per nasconderli
	*/
	var text = JSON.from(conversation.form,true)
	var pwd = text.loginPassword
	var username =text.loginUsername
	
	//return JSON.to({uname:text.loginUsername,pwd:text.loginPassword},true)
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
		var databaseName = db_name//'node-mongo-bb'//databaseNames[d]
					var database = connection.getDB(databaseName)
					var children = []
					var systemChildren = []
					var collectionNames = database.collectionNames.toArray()
					var connection = new MongoDB.connect('127.0.0.1')
					var collection = new MongoDB.Collection('users', {db: database, connection: connection})
					var text =conversation.entity.text
					var user = collection.findOne({$and:[{"user":username},{password:pwd}]})
					var session = new MongoDB.Collection('session', {db: database, connection: connection})
					var results={}
					if (null!= user){
						dateObj = new Date()
						/*user.logged_on_y = dateObj.getFullYear()
						user.logged_on_m = dateObj.getMonth()
						user.logged_on_d = dateObj.getDate()+1*/
						user.logged_on = dateObj
						var session_doc = {}
						session_doc.user = user
						//elimino le vecchie sessioni più vecchie di 9 ore
						//session.remove({$where:"new Date()-new Date(this.user.logged_on_y,this.user.logged_on_m,this.user.logged_on_d)>1000*24*60*60"})
						session.remove({$where:"new Date()-this.user.logged_on>60*60*9*1000"})
						session.insert(session_doc)
						session.ensureIndex({logged_on:1})
						//cerco l'ultima sessione creata dall'utente
						var new_session= session.find({'user.id':user.id}).sort({_id:-1}).limit(1).toArray()[0]
						var session_id = new_session._id.toString()
						user.session_id = session_id
						results.user = user
						results.success = true
						return JSON.to(results,true)
					}
					else
					{
						results.success=false
						return JSON.to(results,true)
					}

	//return "{firm: 'Ed Spencer', note: 'ed@sencha.com','paese':'it'}"
	//return JSON.to(results,true)
}
