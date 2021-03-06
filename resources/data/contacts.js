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
var cache_firm_id = {}
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
function addParameterNoRegex(name,value){
	if(value){
		//return JSON.to(name, true)
		var a = {}
		a[name.toString()] = value
		this.list.push(a)
	}
	}
	
function FilterMaker(list){
	this.list = list
	this.makeFilter =makeFilter
	this.addParameter = addParameter
}
function FilterMakerNoRegex(list){
	this.list = list
	this.makeFilter =makeFilter
	this.addParameter = addParameterNoRegex
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
		var databaseName = db_name//'node-mongo-bb'//databaseNames[d]
					var database = connection.getDB(databaseName)
					var children = []
					var systemChildren = []
					var collectionNames = database.collectionNames.toArray()
					var connection = new MongoDB.connect('127.0.0.1')
					var collection = new MongoDB.Collection('contacts', {db: database, connection: connection})
					var session = new MongoDB.Collection('session', {db: database, connection: connection})
					var text =conversation.entity.text
					var data = JSON.from(text, true)
					var contact = {}
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
					contact.nome= data.nome
					contact.firm = data.firm
					contact.note = data.note
					contact.paese = data.paese
					contact.type = data.type
					contact.email = data.email
					contact.skype = data.skype
					contact.telefono = data.telefono
					contact.c = data.c
					contact.p = data.p
					//contact.linee = data.linee
					contact.telefono = data.telefono
					contact.email = data.email
					contact.comp = data.comp
					contact.type = data.type
					contact.comp = data.comp
					contact.ml = data.ml
					contact.firm_id = data.firm_id
					contact.group_id = data.group_id
					contact.paese = data.paese
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
					contact.data = today
					collection.insert(contact)
	//return "{firm: 'Ed Spencer', note: 'ed@sencha.com','paese':'it'}"
	return JSON.to(contact,true)
}

function handleGet(conversation) {
	var lista_parametri = []
	var filterMaker= new FilterMaker(lista_parametri)
	var filterMakerNoRegex= new FilterMakerNoRegex(lista_parametri)
	var session_id = conversation.query.get('session_id')
	var limit = conversation.query.get('limit')
	var start = conversation.query.get('start')
	var node = conversation.query.get('node')
	var firm_id = conversation.query.get('firm_id')
	var firm_filter = conversation.query.get('firm')
	var nome = conversation.query.get('nome')
	var isin = conversation.query.get('isin')
	var paese = conversation.query.get('paese')
	var ssi = conversation.query.get('ssi')
	var tipo = conversation.query.get('tipo')
	var somma = conversation.query.get('somma')
	var telefono = conversation.query.get('telefono')
	var email = conversation.query.get('email')
	var linee = conversation.query.get('linee')
	var back_office = conversation.query.get('back_office')
	var mail_back_office = conversation.query.get('mail_back_office')
	var ml = conversation.query.get('ml')
	var comp = conversation.query.get('comp')
	var group_id = conversation.query.get('group_id')
	filterMaker.addParameter('mail_back_office',mail_back_office)
	filterMaker.addParameter('nome',nome)
	filterMaker.addParameter('ssi',ssi)
	filterMaker.addParameter('back_office',back_office)
	filterMaker.addParameter('paese',paese)
	filterMaker.addParameter('Linee',linee)
	filterMaker.addParameter('type',tipo)
	filterMaker.addParameter('firm_id',firm_filter)
	filterMakerNoRegex.addParameter('isin.isin',isin)
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
					var databaseName = db_name//databaseNames[d]
						//return  JSON.to(databaseName, true)
					var database = connection.getDB(databaseName)
					var children = []
					var systemChildren = []
					var collectionNames = database.collectionNames.toArray()
					var connection = new MongoDB.connect('127.0.0.1')
					var collection = new MongoDB.Collection('contacts', {db: database, connection: connection})
					var session = new MongoDB.Collection('session', {db: database, connection: connection})
					var collection_company = new MongoDB.Collection('companies', {db: database, connection: connection})
					var user = check_session(session,new org.bson.types.ObjectId(session_id))
					//return  JSON.to(user.toArray(), true)
					if(user.toArray().length==0)
					{
						var r ={}
						r.success = false
						r.message = 'Access denied: sessione non valida!!'
						return  JSON.to(r, true)
					}
					var query={}
					if (null!== firm_id) {
						
						lista_parametri.push({'firm_id': firm_id})
						//return  JSON.to(query, true)
					}
					
					if (ml){
						var filter = {}
						filter.$exists =(ml=='on')?true:false
						//query.type = filter
						lista_parametri.push({'ml':filter})
					}
					if (comp){
						var filter = {}
						filter.$exists =(comp=='on')?true:false
						//query.type = filter
						lista_parametri.push({'comp':filter})
					}
					filterMaker.addParameter('email',email)
					filterMaker.addParameter('telefono',telefono)
					filterMaker.addParameter('group_id',group_id)
					// adesso devo combinare i parametri in and oppure or
					if (lista_parametri.length!=0){
						if (!somma){
							query.$and = lista_parametri
						}
						else{
							query.$or = lista_parametri
						}
						
					}
					//return JSON.to(lista_parametri, true)
					var cursor_contacts = collection.find(query).sort({'nome':1}).toArray()//var cursor_contacts = collection.find(query).sort({'nome':1}).limit(limit).skip(start).toArray()
					//return JSON.to(cursor_, true)
					//return  JSON.to(cursor_contacts, true)
					var contacts = []
					var results = {}
					
					var person = null
					var dummy = null
					
					for (var c in cursor_contacts){
						person = cursor_contacts[c]
						person.id = person._id.toString()
						if ((person.firm_id != null)&& (person.firm_id != "")){
							var firm
								firm = cache_firm_id[person.firm_id]/*cache_firm_id permette di ridurre le richieste al server mongodb: viene interrogato il database
							//solo  una volta per ogni azienda di cui recupererare il campo firm*/
							
							if (typeof firm  === "undefined")// se undefined firm non presente in cache
							{
								//return  JSON.to(person, true)
								//try{
									dummy = collection_company.find({"_id" : new org.bson.types.ObjectId(person.firm_id)}).toArray()
									
									if (null!=dummy[0])
									{
										firm = dummy[0].firm
										//return  JSON.to(firm, true)
									}
									else
									{
										
										firm = 'azienda rimossa'
										
									}
									cache_firm_id[person.firm_id] = firm
									person.firm = firm
								/*}
								catch(e){
										firm = 'trouble'
								}*/
							//return  JSON.to(person, true)
						}
						//return  JSON.to(person, true)
						person.firm = firm
						contacts.push(person)
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
				results.data = contacts
				results.total = collection.find(query).count()
				results.success = true
				return  JSON.to(results, true)
			}//**
			
			
		}
		catch (x) {
				application.logger.warning(x.message)
				return  JSON.to(x.message, true)
		}
	}
	
	conversation.modificationTimestamp = java.lang.System.currentTimeMillis()
	return JSON.to(nodes, conversation.query.get('human') == 'true')

}
}
