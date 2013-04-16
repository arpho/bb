Ext.namespace('BB');

	var rowEditingContact = Ext.create('Ext.grid.plugin.RowEditing', {
					clicksToMoveEditor: 1,
					autoCancel: false
	});
	var ContactsGrid = Ext.create('Ext.grid.Panel', {
				title: 'Contatti',
				
				viewConfig	  : {
											style : { overflow: 'auto' }
										},
	store: Ext.data.StoreManager.lookup('bbContactsStore'),
	plugins: [
					rowEditingContact
				],
	listeners:{
					 itemcontextmenu: function(view, rec, node, index, event) {
							event.stopEvent(); // stops the default event. i.e. Windows Context Menu
							var gridContextMenu = Ext.create('Ext.menu.Menu', {
									items: [{ text: 'Isin', handler: function(){showIsins(rec.data)},icon: 'media/coins.png'},
									{ text: 'Modifica', handler: function(){contactForm(rec.data)},icon: 'media/modifica.png'},
									{
										text:'cancella',
										icon: 'media/delete.png',
										handler:function()
										{
											console.log('rec.data')
											console.debug(rec.data)
											rec.data.id = rec.data.id+'/'
											console.log('rec.data modificato')
											console.debug(rec.data)
											var Contact = Ext.ModelManager.create(rec.data,'Contact')
											function remove(btn){
												console.debug(Contact)
												if (btn=='yes')
												{
													var esito =Contact.destroy()
													console.debug(esito)
													if (esito)
													{
														Ext.gritter.add(
														{
															title: 'Cancellazione', 
															text: 'il contatto '+rec.data.nome+' è stato rimosso'
														}); 
														Ext.data.StoreManager.lookup('bbContactsStore').load()
													}
												};
											}
											Ext.MessageBox.confirm('Conferma', 'sei sicuro di voler cancellare '+rec.data.nome+'?', remove );
													
										}
									}]
							});
							//
							gridContextMenu.showAt(event.getXY()); // show context menu where user right clicked
							return false;
						},
				},
	dockedItems:[{xtype: 'pagingtoolbar',
	pageSize: pageSize,
	store: Ext.data.StoreManager.lookup('bbContactsStore'),
	dock: 'bottom',
	items: [
			{xtype:'button',text:'export excel',
		icon: 'media/excel.png',
		template:new Ext.Template(
				'<table border="0" cellpadding="0" cellspacing="0" class="x-btn-wrap"><tbody><tr>',
				'<td class="x-btn-left"><i> </i></td><td class="x-btn-center"><a class="x-btn-text" href="{1}" target="{2}">{0}</a></td><td class="x-btn-right"><i> </i></td>',
				"</tr></tbody></table>"),
		handler:function(){
			this.url = 'data:application/vnd.ms-excel;base64,' +
			Base64.encode(ContactsGrid.getExcelXml());
			window.location = this.url
		}
		},
			{
				xtype: 'button',
				icon: 'media/addcontact.png',
				text: 'aggiungi contatto',
				handler: function(){
					/*rowEditingContact.cancelEdit();
					var today = new Date()
					var dd = today.getDate()
					var mm = today.getMonth()+1 //January is 0!
					var yyyy = today.getFullYear()
					if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = mm+'/'+dd+'/'+yyyy
					var contact = Ext.ModelManager.create({
						data: today,
					}, 'Contact');
					var store = Ext.data.StoreManager.lookup('bbContactsStore')
					contact.data.firm_id = contact.data.firm // la combobox in rowediting inserisce firm_id nel campo firm
					
					store.insert(0, contact)
					console.log(rowEditingContact)
					rowEditingContact.startEdit(0, 0)
					ContactsGrid.on('edit', function() {
						console.log('contact')
						contact.data.firm_id = contact.data.firm // la combobox in rowediting inserisce firm_id nel campo firm
						console.log(contact)
						store.remove(contact)
						contact.save()
						store.load()
						rowEditingContact.cancelEdit()
					})*/
					contactForm()
				}
			},
			{
													xtype: 'button',
													text:'filtra contatti',
													icon: 'media/filter.png',
													handler: function(){
														ContactFilterForm()
													}
			
			
												},
												{
				xtype : 'button',
				icon : 'media/nofilter.png',
				text : 'Reset Filter',
				handler : function() {
															// resetto i campi della form
															contactsFilterParameter = {}
															var filteredStore = Ext.data.StoreManager.lookup('bbContactsStore')
					//delete filteredStore.getProxy().extraParams.firm_id
					filteredStore.getProxy().extraParams = {}
					filteredStore.load()
														}
												},
												{
													xtype : 'button',
													id : 'utenti-button',
													text : 'gestisci utenti',
													icon : 'media/users.png',
													handler : function(){
																			showUsers()
																		}
												}
		],
	displayMsg: 'Visualizzo i contatti {0} - {1} su un totale di {2}',
		emptyMsg: "Nessun contatto da visualizzare",
		totalProperty:'total',
	displayInfo: true}],
	columns:
								[
									{
											header: 'Firm',
											dataIndex: 'firm',
										editor: {
										// defaults to textfield if no xtype is supplied
										allowBlank: false,
										xtype:'combo',
										
		store:Ext.data.StoreManager.lookup('bbCompanies4ComboStore'),
		displayField : 'firm',
		valueField : 'id',
										allowBlank: true
									}
									},
									
									{
										header:'Nome',
										name: 'nome contatto',
										dataIndex: 'nome',
									editor: {
										// defaults to textfield if no xtype is supplied
										allowBlank: false
									}
									},
									{
										header: 'Email',
										dataIndex: 'email',
									editor: {
										// defaults to textfield if no xtype is supplied
										allowBlank: true
									}
									},
									{
										header:'Telefono',
										dataIndex:'telefono',
									editor: {
										// defaults to textfield if no xtype is supplied
										allowBlank: true
									}
									},
									{
										header: 'Data Inserimento',
										dataIndex: 'data',
										flex: 1
									},
									{
											header: 'Note',
											dataIndex: 'note',
											flex:2,
									editor: {
										// defaults to textfield if no xtype is supplied
										allowBlank: true
									}
									},
									{
										name:'comp',
										header:'Comp',
										dataIndex: 'comp',
										renderer:function (value, metaData, record, row, col, store, gridView) {
											var v = (value==true)?'y':'n'
											return v
										},
										editor: {
										// defaults to textfield if no xtype is supplied
										xtype:'checkboxfield',
										allowBlank: true
									}
									},
									{
										header:'M.L.',
										dataIndex: 'ml',
										renderer:function (value, metaData, record, row, col, store, gridView) {
											var v = (value==true)?'y':'n'
											return v
										},
										editor: {
										// defaults to textfield if no xtype is supplied
										xtype:'checkboxfield',
										allowBlank: true
									}
									},
									{
										header:'Tipo',
										dataIndex:'type'
									},
									{
										header:'Paese',
										dataIndex:'paese'
									},
									{
										header:'Isin',
										dataIndex: 'isin',
										flex:0.5
									},
									{
										header:'Price',
										dataIndex: 'price',
										flex:0.5
									},
									{
										header:'Size',
										dataIndex: 'size',
										flex:0.5
									},
									{
										header:'Data',
										dataIndex: 'data'
									}
								],
	//columns: columns,
			border: false,
			forceFit: true,
			columnLines: true,
	//renderTo: Ext.getBody()
			});//ends contactsGrid
			
function contactForm(contact)
{
	var submitForm = function()
															{
																var nomeField = formPanel.items.get(0).items.get(1);
																var firmField = formPanel.items.get(0).items.get(0);
																console.log('firmField')
																console.debug(firmField)
																var noteField = formPanel.items.get(1).items.get(0);
																var telefonoField = formPanel.items.get(0).items.get(3);
																var mlField = Field = formPanel.items.get(0).items.get(4);
																var compField = formPanel.items.get(0).items.get(5)
																var emailField = formPanel.items.get(0).items.get(2);
																var typeField = formPanel.items.get(0).items.get(6)
																var paeseField = formPanel.items.get(0).items.get(7)
																function getId(c){
																	var id
																	if (typeof c !== "undefined"){
																		id = c.id+'/'//  il trailing slash serve a sistemare lo url della richiesta Post
																		//console.log(id)
																	}
																	return id
																}
																var Contact = Ext.ModelManager.create({nome: nomeField.getValue(), note: noteField.getValue(),firm_id:firmField.getValue(),email:emailField.getValue(),
																																			type:typeField.getValue(),
																																			paese:paeseField.getValue(),telefono:telefonoField.getValue(),
																																			ml:mlField.getValue(), comp:compField.getValue(),id:getId(contact)}, 'Contact');
																console.log(Contact)
																Contact.save()
																Ext.data.StoreManager.lookup('bbContactsStore').load()
																contactWindow.close()
															Ext.gritter.add(
															{
																title: setTitleGritter(contact), 
																text: setTextGritter(contact)
															}); 

															}
														
	var formPanel = Ext.create('Ext.form.Panel', {
						style: 'margin: 50px',
						height: 170,
						buttons: [
								{
									text: setButtonText(contact),
									handler: submitForm,
									icon: 'media/conferma.png'
								}
							],
	items: [{
	xtype: 'container',
	layout: 'hbox',
	items: [ {
		xtype: 'combo',
		fieldLabel:'Firm',
		name : 'firm_id',
		store:Ext.data.StoreManager.lookup('bbCompanies4ComboStore'),
		displayField : 'firm',
		valueField : 'id',
		initialValue : (typeof contact ==="undefined")?'':contact.firm_id,
		pageSize : pageSize,
		listeners:{
												afterrender: function(){
													console.debug(this)
													this.store.load()
													var defaultValue = (typeof contact==="undefined")?'':contact.firm_id
													this.setValue(defaultValue)
													console.debug(defaultValue)
												}
											},
	   // mode: 'remote',
		typeAhead :true,
		typeAheadDelay: 20,
		minChars  : 3,
		labelAlign : 'top',
		cls : 'field-margin',
		flex: 8
	}, {
		xtype: 'textfield',
		fieldLabel: 'Nome', 
		name: 'nome',
		labelAlign: 'top',
		cls: 'field-margin',
		flex: 6
	},{
						xtype:'textfield',
						fieldLabel:'Email',
						name:'email',
						labelAlign: 'top',
		cls: 'field-margin',
		flex: 4
	  },
								{
									xtype:'textfield',
									fieldLabel:'Telefono',
									name:'telefono',
									labelAlign: 'top',
										cls: 'field-margin',
										flex: 5
								},{
									xtype:'checkboxfield',
									fieldLabel:'M.L.',
									name: 'ml',
									labelAlign: 'top',
									cls: 'field-margin',
								},
									{
										xtype : 'checkboxfield',
										fieldLabel : 'Comp',
										name : 'comp',
										labelAlign: 'top',
										cls: 'field-margin',
									},
									{
									xtype : 'textfield',
									fieldLabel : 'Tipo',
									name : 'type',
									labelAlign: 'top',
									cls: 'field-margin',
									flex : 2
								},
								{
										xtype : 'textfield',
										fieldLabel : 'Paese',
										name : 'paese',
										labelAlign: 'top',
										cls: 'field-margin',
										flex : 1
									}]
	},
	
		{
						xtype: 'container',
						layout: 'hbox',
						items:[{
			xtype : 'textfield',
			fieldLabel : 'Nota',  
			name : 'note',
			labelAlign : 'top',
			cls : 'field-margin',
			flex : 6
		},
	]
				}
		]
});
function setButtonText(c){
	var text = 'Inserisci contatto'
	if (typeof c !== "undefined"){
		text = 'modifica contatto'
	}
	return text
}
function setTitleGritter(c){
	var title = ' Nuovo Contatto'
	if (typeof c !== "undefined"){
		title = 'Modifica Contatto'
	}
	return title
}

function setTextGritter(c){
	var text = 'Contatto inserito correttamente'
	if (typeof c !== "undefined"){
		text = 'Contatto modificato correttamente'
	}
	return text
}
function setTitleContact(c){
	var title = 'Nuovo Contatto'
	if (typeof c !== "undefined")
	{
		title = 'Modifica Contatto '+c.nome
	}
	return title 
}
contactWindow = Ext.create('Ext.window.Window',
{
			title: setTitleContact(contact),
			height: 280,
			width:1300,
			layout: 'border',
			items: {
								region: 'center',
								items:formPanel
							}

});
formPanel.getForm().setValues(contact)
contactWindow.show();
}


Ext.define('BB.contactsPanel', {
				extend: 'Ext.panel.Panel',
				alias:'widget.bb-contacts',
	store: Ext.data.StoreManager.lookup('bbContactsStore'),
	layout: 'fit',
	items:ContactsGrid,
			border: true,
			forceFit: true,
			columnLines: true,
	//renderTo: Ext.getBody()
});
	

