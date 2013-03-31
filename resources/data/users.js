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

function handleGet(conversation) {
	var node = conversation.query.get('node')
	var user = conversation.query.get('user')
	var password = conversation.query.get('password')
	var limit = conversation.query.get('limit')
	var start = conversation.query.get('start')
	//return JSON.to(tipo,true)
	//return JSON.to(firm+'subito',true)
	var nodes = []
	
	//if (node == 'root') 
	{
		var connection = application.globals.get('mongoDbConnection')
		if (null === connection) {
			try {
				connection = MongoDB.connect('127.0.0.1')
				application.globals.put('mongoDbConnection', connect) 
			}
			catch (x) {
			}
		}
		
		if (null !== connection) {
			try {
				var databaseNames = connection.databaseNames.toArray()
				for (var d in databaseNames) {
					var databaseName = 'node-mongo-bb'//databaseNames[d]
					var database = connection.getDB(databaseName)
					var children = []
					var systemChildren = []
					var collectionNames = database.collectionNames.toArray()
					var connection = new MongoDB.connect('127.0.0.1')
					var collection = new MongoDB.Collection('users', {db: database, connection: connection})
					var query = {}
					//return JSON.to(queryString,true)
					var lista_parametri = []
					
					var cursor = collection.find(query).sort({'user':1}).limit(limit).skip(start).toArray()
					//di default il campo _id  ritornato da mongodb ha questa forma _id:{$oid:id} quindi devoestrapolare lo id per poterlo usare nella grid di extjs
					var users = []
					var dummy = null
					var results = {}
					
					for ( var c in cursor) {
						dummy = cursor[c]
						var id = dummy._id
						dummy._id = dummy._id.toString()
						dummy.id = dummy._id
						users.push(dummy)
				}
				return JSON.to(users,true)
					results.data = users
					results.total = collection.find(query).count()
					return  JSON.to(results, true)
					for (var c in collectionNames) {
						var collectionName = collectionNames[c]
						
						var n = {
							id: databaseName + '/' + collectionName,
							text: collectionName,
							leaf: true
						}
						
						if (isSystem(collectionName)) {
							n.cls = 'x-mongovision-system-collection'
							systemChildren.push(n)
						}
						else {
							children.push(n)
						}
					}
					
					children = children.concat(systemChildren)
					
					n = {
						id: databaseName,
						text: databaseName,
						children: children,
						expanded: true
					}
					
					if (children.length == 0) {
						// Ext JS will annoyingly use a leaf icon for nodes without children.
						// This class of ours will override it.
						n.cls = 'x-tree-node-expanded-important'
					}
					
					nodes.push(n)
				}
			}
			catch (x) {
				application.logger.warning(x.message)
			}
		}
	}
	
	conversation.modificationTimestamp = java.lang.System.currentTimeMillis()
	return JSON.to(nodes, conversation.query.get('human') == 'true')
}
function handlePost(conversation)
{
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
					var text =conversation.entity.text
					var data = JSON.from(text, true)
					var user = {}
					user.password = data.password
					user.user = data.user
					user.superuser = data.superuser
					user.enabled = data.enabled
					collection.insert(user)
	return JSON.to(user,true)
}
