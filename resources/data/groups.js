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
document.executeOnce('/constants/')

function handleInit(conversation) {
	conversation.addMediaTypeByName('application/json')
	conversation.addMediaTypeByName('text/plain')
}

function isSystem(collectionName) {
	return (collectionName.substr(0, 7) == 'system.') || (collectionName.substr(0, 4) == 'tmp.')
}
function makeFilter(value){
	var filter = {}
						filter.$regex = value
						filter.$options = 'i'
	return filter
	
}

function addParameter(name,value){
	if(value){
		//return JSON.to(name, true)
		var a = {}
		a[name.toString()]=this.makeFilter(value)
		this.list.push(a)
	}
	}
	
function FilterMaker(list){
	this.list = list
	this.makeFilter =makeFilter
	this.addParameter = addParameter
}

function handleGet(conversation) {
	var session_id = conversation.query.get('session_id')
	var queryString = conversation.query.get('query')
	
	var nodes = []
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
				
					var databaseName = db_name//'node-mongo-bb'//databaseNames[d]
					var database = connection.getDB(databaseName)
					var children = []
					var systemChildren = []
					var collectionNames = database.collectionNames.toArray()
					
					var connection = new MongoDB.connect('127.0.0.1')
					var collection = new MongoDB.Collection('groups', {db: database, connection: connection})
					
					var session = new MongoDB.Collection('session', {db: database, connection: connection})
					var user = null
					try
					{
						user = check_session(session,new org.bson.types.ObjectId(session_id))
					}
					catch (x){
						var r ={}
						r.success = false
						r.message = 'Access denied: sessione non valida!!'
						return  JSON.to(r, true)
					}
					//return  JSON.to(user, true)
					//return JSON.to(query,true)
					
					var cursor = collection.find().toArray()//var cursor = collection.find(query).sort({'firm':1}).limit(limit).skip(start).toArray()
					//di default il campo _id  ritornato da mongodb ha questa forma _id:{$oid:id} quindi devoestrapolare lo id per poterlo usare nella grid di extjs
					var groups = []
					var dummy = null
					var results = {}
					for ( var c in cursor) {
						dummy = cursor[c]
						var id = dummy._id
						dummy._id = dummy._id.toString()
						dummy.id = dummy._id
						groups.push(dummy)
				}
					results.data = groups
					results.total = collection.find().count()
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
			catch (x) {
				application.logger.warning(x.message)
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
					var collection = new MongoDB.Collection('groups', {db: database, connection: connection})
					var session = new MongoDB.Collection('session', {db: database, connection: connection})
					var text =conversation.entity.text
					var data = JSON.from(text, true)
					var group = {}
					group.group = data.group
					var session_id = data.session_id
					var user =null
					try{
						var user = check_session(session,new org.bson.types.ObjectId(session_id))
					}
					catch(x)
					{
						var r ={}
						r.success = false
						r.message = 'Access denied: sessione non valida!!'
						return  JSON.to(r, true)
					}
					collection.insert(group)
	//return "{firm: 'Ed Spencer', note: 'ed@sencha.com','paese':'it'}"
	return JSON.to(group,true)
}
