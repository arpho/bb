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
	var node = conversation.query.get('node')
	var note = conversation.query.get('note')
	var limit = conversation.query.get('limit')
	var start = conversation.query.get('start')
	var queryString = conversation.query.get('query')
	var firm = conversation.query.get('firm')
	var somma = conversation.query.get('somma')
	var website = conversation.query.get('website')
	var email = conversation.query.get('email')
	var telefono = conversation.query.get('telefono')
	var tipo = conversation.query.get('tipo')
	var paese = conversation.query.get('paese')
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
					var collection = new MongoDB.Collection('companies', {db: database, connection: connection})
					var query = {}
					//return JSON.to('connected',true)
					var lista_parametri = []
					var filterMaker= new FilterMaker(lista_parametri)
					if (null !==queryString )
					{// querystring è usata solo dallo store del combobox, quindi la tratto in modo diverso dagli altri parametri
						var filter = {}
						filter.$regex = queryString
						filter.$options ='i'
						query.firm = filter
					}
					if (null!==firm){
						var filter = {}
						//
						filter.$regex = firm
						filter.$options = 'i'
						//return JSON.to(filter,true)
						lista_parametri.push({'firm':filter})
						//return JSON.to(lista_parametri,true)
					}
					if (null!==note){
						var filter = {}
						filter.$regex = note
						filter.$options = 'i'
						lista_parametri.push({'note':filter})
					}
					if (null!==telefono){
						var filter = {}
						filter.$regex = telefono
						filter.$options = 'i'
						lista_parametri.push({'telefono':filter})
					}
					if (null!==paese){
						var filter = {}
						//
						filter.$regex = paese
						filter.$options = 'i'
						lista_parametri.push({'paese':filter})
					}
					if (null!==tipo){
						var filter = {}
						filter.$regex = tipo
						filter.$options = 'i'
						lista_parametri.push({'type':filter})
						//return JSON.to(filter,true)
					}
					if (null!==paese){
						var filter = {}
						filter.$regex = paese
						filter.$options = 'i'
						lista_parametri.push({'paese':filter})
					}
					if (null!==telefono){
						var filter = {}
						filter.$regex = telefono
						filter.$options = 'i'
						lista_parametri.push({'telefono':filter})
					}
					if (null!==email){
						var filter = {}
						//
						filter.$regex = email
						filter.$options = 'i'
						//return JSON.to(filter,true)
						lista_parametri.push({'email':filter})
						//return JSON.to(lista_parametri,true)
					}
					if (null!==website){
						var filter = {}
						//
						filter.$regex = website
						filter.$options = 'i'
						//return JSON.to(filter,true)
						lista_parametri.push({'website':filter})
						//return JSON.to(lista_parametri,true)
					}
					if (lista_parametri.length!=0){
						if (!somma){
							query.$and = lista_parametri
						}
						else{
							query.$or = lista_parametri
						}
						
					}
					//return JSON.to(query,true)
					
					var cursor = collection.find(query).sort({'firm':1}).toArray()//var cursor = collection.find(query).sort({'firm':1}).limit(limit).skip(start).toArray()
					//di default il campo _id  ritornato da mongodb ha questa forma _id:{$oid:id} quindi devoestrapolare lo id per poterlo usare nella grid di extjs
					var companies = []
					var dummy = null
					var results = {}
					for ( var c in cursor) {
						dummy = cursor[c]
						var id = dummy._id
						dummy._id = dummy._id.toString()
						dummy.id = dummy._id
						companies.push(dummy)
				}
					results.data = companies
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
		var firm = conversation.query.get('firm')
		var databaseName = 'node-mongo-bb'//databaseNames[d]
					var database = connection.getDB(databaseName)
					var children = []
					var systemChildren = []
					var collectionNames = database.collectionNames.toArray()
					var connection = new MongoDB.connect('127.0.0.1')
					var collection = new MongoDB.Collection('companies', {db: database, connection: connection})
					var text =conversation.entity.text
					var data = JSON.from(text, true)
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
					collection.insert(company)
	//return "{firm: 'Ed Spencer', note: 'ed@sencha.com','paese':'it'}"
	return JSON.to(company,true)
}
