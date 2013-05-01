
var UserWindow = null
function getTitle(obj){
	var text = this.titleNew
	if (obj.id!=null){
		text = this.titleUpdate
	}
		return text
}

function getButtonText(obj){
	var text = this.buttonNew
	if (obj.id!=null){
		text = this.buttonUpdate
	}
		return text
}
	
function getGritterText(obj){
	var text = this.gritterTextNew
	if (obj.id!=null){
		text = this.gritterTextUpdate
	}
	return text
}
function getGritterTitle(obj){
	var text = this.gritterTitleNew
	if (obj.id!=null){
		text = this.gritterTitleUpdate
	}
	return text
}
function textMakers(text){
	/*genera i testi che descrivono le finestre
	 * @param: string testo per la finestra di inserimento
	 * @param: string testo per lafinestra di modifica
	 * @param: string testo pulsante nuovo utente
	 * @param string testo pulsante modifica utente
	 * @param: string testo gritter nuovo utente
	 * @param string testo gritter modifica utente*/
	 //titleNew,titleUpdate,buttonNew,buttonUpdate,gritterNew,gritterUpdate
	this.titleNew = text.titleNew
	this.titleUpdate = text.titleUpdate
	this.buttonNew = text.buttonNew
	this.buttonUpdate = text.buttonUpdate
	this.gritterTextNew = text.gritterTextNew
	this.gritterTextUpdate = text.gritterTextUpdate
	this.gritterTitleNew = text.gritterTitleNew
	this.gritterTitleUpdate = text.gritterTitleUpdate
	this.getTitle=getTitle
	this.getButtonText=getButtonText
	this.getGritterText=getGritterText
	this.getGritterTitle= getGritterTitle
}
var texts = {titleNew:'Nuovo Utente',titleUpdate:'Modifica Utente',buttonNew:'Inserisci',
	buttonUpdate:'Modifica',gritterTextNew:'Utente Creato',gritterTextUpdate:'Utente Modificato',
	gritterTitleNew:'Inserimento',gritterTitleUpdate:'Modifica'}
	var texts = new textMakers(texts)
function windowFactory(item,title){
	
	var userWindow = Ext.create('Ext.window.Window',
	{
		title: title,
		height: 270,
		width:650,
    items: {
								region: 'center',
								items: item,
								height:320
							}
    
	}
	);
	
	return userWindow
}
function formFactory(user){
	
	var submitForm = function(){
		console.log('user.id')
		console.debug(user.id==null)
		var values = formPanel.getValues()
		console.log('values')
		console.debug(values)
		values.password = hex_sha1(values.password)// cripto la password
		if(user.id!=null){
			values.id=user.id+'/'
		}
		values.superuser =(values.superuser=="on")?true:false
		values.enabled =(values.enabled=="on")?true:false
		var User = Ext.ModelManager.create(values,'User')
		if(user.id!=null){
			User.data.id = user.id+'/'
		}


		console.log('User')
		console.debug(User.data)
		User.save()
		Ext.gritter.add(
														{
															title: texts.getGritterTitle(user), 
															text: texts.getGritterText(user)
														}); 
		Ext.data.StoreManager.lookup('bbUsersStore').load()
		UserWindow.close()
		
		
	}
	var formPanel = Ext.create('Ext.form.Panel',{
											//title: 'Add new Company',

											//renderTo: Ext.getBody(),
											style: 'margin: 50px',
											buttons: [
												{
														text: texts.getButtonText(user),
														handler: submitForm,
														icon: 'media/conferma.png'
												}
											],
											items:[
												{
													xtype: 'container',
													layout: 'hbox',
													items:[
														{
																xtype: 'textfield',
																fieldLabel: 'User', 
																name: 'user',
																allowBlank:false,
																labelAlign: 'top',
																cls: 'field-margin',
																flex: 2
														},
														{
															xtype: 'textfield',
															fieldLabel: 'Password', 
															name: 'password',
															allowBlank:false,
															labelAlign: 'top',
															cls: 'field-margin',
															flex: 2
														},{
												xtype: 'checkboxfield',
												fieldLabel: 'Superuser', 
												name: 'superuser',
												labelAlign: 'top',
												cls: 'field-margin',
												flex: 1
										},{
												xtype: 'checkboxfield',
												fieldLabel: 'Enabled', 
												name: 'enabled',
												labelAlign: 'top',
												cls: 'field-margin',
												flex: 1
										},
										
													]
												},
												{
													xtype: 'container',
													layout: 'hbox',
													items:[
														{
															xtype: 'combo',
															fieldLabel:'Gruppo',
															name : 'group_id',
															store:make_combo_store_group(BB.user.user.session_id),
															displayField : 'group',
															valueField : 'id',
															initialValue : (typeof contact ==="undefined")?'':contact.firm_id,
															pageSize : pageSize,
														   // mode: 'remote',
															//typeAhead :true,
															//typeAheadDelay: 20,
															//minChars  : 3,
															labelAlign : 'top',
															cls : 'field-margin',
															flex: 8
														},
													]
												}
											]
									})
									// faccio sì che ilcampo password della formsiasempre vuoto
									var dummy = {}
									dummy.user= user.user
									dummy.superuser = user.superuser
									dummy.enabled=user.enabled
									dummy.password = ''
	formPanel.getForm().setValues(dummy)
	return formPanel
}

function showUsers(){
	var grid  = Ext.create('Ext.grid.Panel', {
				store: Ext.data.StoreManager.lookup('bbUsersStore'),
				viewConfig      : {
											style : { overflow: 'auto', overflowX: 'hidden' }
										},
				listeners:{
					 itemcontextmenu: function(view, rec, node, index, event) {
							event.stopEvent();
							var gridContextMenu = Ext.create('Ext.menu.Menu',{
								items: [{ text: 'Modifica', handler: function(){updateUser(rec.data)},icon: 'media/modifica.png'},
								{
										text:'Cancella',
										icon: 'media/delete.png',
										handler:function()
										{
											console.log('rec.data')
											console.debug(rec.data)
											rec.data.id = rec.data.id+'/'
											console.log('rec.data modificato')
											console.debug(rec.data)
											var User = Ext.ModelManager.create(rec.data,'User')
											function remove(btn){
												console.debug(Contact)
												if (btn=='yes')
												{
													var esito =User.destroy()
													console.debug(esito)
													if (esito)
													{
														Ext.gritter.add(
														{
															title: 'Eliminazione', 
															text: "l'utente "+rec.data.user+' è stato rimosso'
														}); 
														Ext.data.StoreManager.lookup('bbUsersStore').load()
													}
													else{
														Ext.gritter.add(
														{
															title: 'Eliminazione', 
															text: "l'utente "+rec.data.user+' non è stato rimosso'
														}); 
													}
												};
											}
											Ext.MessageBox.confirm('Conferma', 'sei sicuro di voler cancellare '+rec.data.user+'?', remove );
													
										}
									}]
							})
							gridContextMenu.show()
						}
				},
				columns:[
					{
						header : 'Username',
						dataIndex : 'user',
						flex: 2
					},
					{
						header : 'Password',
						dataIndex : 'password',
						flex: 2
					},
					{
						header : 'SuperUser',
						dataIndex : 'superuser',
						flex: 1
					}
					,
					{
						header : 'Enabled',
						dataIndex : 'enabled',
						flex: 1
					}
				],
				border: false,
				forceFit: true,
				columnLines: true,
				dockedItems:[{xtype: 'pagingtoolbar',
											pageSize: pageSize,
											store: Ext.data.StoreManager.lookup('bbUsersStore'),
											displayMsg: 'Visualizzo gli utenti {0} - {1} su un totale di {2}',
											emptyMsg: "Nessun utente da visualizzare",
        displayInfo: true,
											dock: 'bottom',
											items :[
												{
													xtype : 'button',
													text : 'aggiungi utente',
													icon: 'media/user_add.png',
													handler : function(){
														insertNewUser()
														
													}
												}
											]
										}
										]
									})//chiude grid

			
	Ext.data.StoreManager.lookup('bbUsersStore').load()
	var userWindow = windowFactory(grid,'Utenti')
	userWindow.show();
}
function updateUser(user){
	UserWindow =windowFactory(formFactory(user),texts.getTitle(user))
	UserWindow.show()
}

function insertNewUser(){
	var dummy ={}// passo un utente vuoto
	console.log('dummy')
	console.debug(dummy)
	 UserWindow = windowFactory(formFactory(dummy),texts.getTitle(dummy))
														UserWindow.show()
}
