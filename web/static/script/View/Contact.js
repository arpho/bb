Ext.namespace('BB');

	var ContactsGrid = Ext.create('Ext.grid.Panel', {
				title: 'Contatti',
				viewConfig	  : {
											style : { overflow: 'auto' }
										},
	store: Ext.data.StoreManager.lookup('bbContactsStore'),
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
				handler: function()
				{ contactForm(/*
				{
															_id : 1,
															Firm : 'Firm',
															nome : 'nome',
															note : 'nota',
															telefono : '123456789',
															ml : true,
															comp : true,
															cla : 7,
															email : 'damicogiuseppe77@gmail.com',
															firm_id :'513e727e44ae2025845e6efb',
															back_office : 'back_office',
															numero_back_office : 'numero back office',
															mail_back_office : 'mail back office',
															type : 'type',
															ssi : 'ssi',
															linee : 'linee',
															paese : 'paese'
				}*/
				)
															
															var formPanel = Ext.create('Ext.form.Panel', {
	style: 'margin: 50px',
	height: 370,
	items: [{
	xtype: 'container',
	layout: 'hbox',
	items: [{
		xtype: 'textfield',
		fieldLabel: 'Name', 
		name: 'nome',
		labelAlign: 'top',
		cls: 'field-margin',
		flex: 3
	}, {
		xtype: 'combo',
		fieldLabel:'Firm',
		store:Ext.data.StoreManager.lookup('bbCompanies4ComboStore'),
		displayField : 'firm',
		valueField : 'id',
		pageSize : pageSize,
		mode: 'remote',
		typeAhead :true,
		typeAheadDelay: 20,
		minChars  : 3,
		name : 'country',
		labelAlign : 'top',
		cls : 'field-margin',
		flex: 15
	},
	{
		xtype : 'textfield',
		fieldLabel : 'Nota',  
		name : 'note',
		labelAlign : 'top',
		cls : 'field-margin',
		flex : 4
	},{
		xtype:'textfield',
		fieldLabel:'Cla',
		name:'cla',
		labelAlign: 'top',
		cls: 'field-margin',
		flex: 2
	  }]
	},
	{
	xtype: 'container',
	layout: 'hbox',
	items:[
	{
		xtype:'textfield',
		fieldLabel:'E-Mail',
		name:'email',
		labelAlign: 'top',
		cls: 'field-margin',
		flex: 2
	  },
								{
									xtype:'textfield',
									fieldLabel:'Telefono',
									name:'telefono',
									labelAlign: 'top',
										cls: 'field-margin',
										flex: 1.5
								},
								{
									xtype:'checkboxfield',
									fieldLabel:'M.L.',
									name: 'ml',
									labelAlign: 'top',
									cls: 'field-margin',
								}
							]
		},{
	xtype: 'container',
	layout: 'hbox',
	items:[
								{
									xtype : 'textfield',
									fieldLabel : 'Back Office',
									name : 'back_office',
									labelAlign: 'top',
									cls: 'field-margin',
								},
								{
									xtype : 'textfield',
									fieldLabel : 'Mail Back Office',
									name : 'mail_back_office',
									labelAlign: 'top',
									cls: 'field-margin',
								},
								{
									xtype : 'textfield',
									fieldLabel : 'Numero Back Office',
									name : 'numero_back_office',
									labelAlign: 'top',
									cls: 'field-margin',
								}]
	  },
	  {
				xtype: 'container',
				layout: 'hbox',
				items:[
								{
									xtype : 'textfield',
									fieldLabel : 'Type',
									name : 'type',
									labelAlign: 'top',
									cls: 'field-margin',
								},
								{
									xtype : 'textfield',
									fieldLabel : 'Linee',
									name : 'Linee',
									labelAlign: 'top',
									cls: 'field-margin',
								},
								{
									xtype : 'textfield',
									fieldLabel : 'SSI',
									name : 'ssi',
									labelAlign: 'top',
									cls: 'field-margin',
								},
								
									]
			},{
					xtype: 'container',
					layout: 'hbox',
					items:[
									{
										xtype : 'textfield',
										fieldLabel : 'Paese',
										name : 'paese',
										labelAlign: 'top',
										cls: 'field-margin',
									},
									{
										xtype : 'checkboxfield',
										fieldLabel : 'Comp',
										name : 'comp',
										labelAlign: 'top',
										cls: 'field-margin',
									}
								]
				}
		]
});



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
									},
									{
										header:'Nome',
										name: 'nome contatto',
										dataIndex: 'nome'
									},
									{
										header: 'Email',
										dataIndex: 'email',
									},
									{
										header:'Telefono',
										dataIndex:'telefono'
									},
									{
										header: 'Data Inserimento',
										dataIndex: 'data',
										flex: 1
									},
									{
											header: 'Note',
											dataIndex: 'note',
											flex:2
									},
									{
										name:'comp',
										header:'Comp',
										dataIndex: 'comp',
										renderer:function (value, metaData, record, row, col, store, gridView) {
											var v = (value==true)?'y':'n'
											return v
										}
									},
									{
										header:'M.L.',
										dataIndex: 'ml',
										renderer:function (value, metaData, record, row, col, store, gridView) {
											var v = (value==true)?'y':'n'
											return v
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
										dataIndex: 'isin'
									},
									{
										header:'Price',
										dataIndex: 'price'
									},
									{
										header:'Size',
										dataIndex: 'size'
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
																var nomeField = formPanel.items.get(0).items.get(0);
																var firmField = formPanel.items.get(0).items.get(1);
																console.log('firmField')
																console.debug(firmField)
																var noteField = formPanel.items.get(0).items.get(2);
																var claField = formPanel.items.get(0).items.get(3);
																var telefonoField = formPanel.items.get(1).items.get(1);
																var mlField = Field = formPanel.items.get(1).items.get(2);
																var claField = formPanel.items.get(0).items.get(3);
																var emailField = formPanel.items.get(1).items.get(0);
																var telefonoField = formPanel.items.get(1).items.get(1);
																var back_office = formPanel.items.get(2).items.get(0);
																var mail_back_office = formPanel.items.get(2).items.get(1);
																var numero_back_office = formPanel.items.get(2).items.get(2);
																var typeField = formPanel.items.get(3).items.get(0)// nella quartalineadi form si trovano: type,linee, ssi
																var lineeField = formPanel.items.get(3).items.get(1)
																var ssiField = formPanel.items.get(3).items.get(2)
																var paeseField = formPanel.items.get(4).items.get(0)
																var compField = formPanel.items.get(4).items.get(1)
																function getId(c){
																	var id
																	if (null != c.id){
																		id = c.id+'/'//  il trailing slash serve a sistemare lo url della richiesta Post
																		//console.log(id)
																	}
																	return id
																}
																var Contact = Ext.ModelManager.create({nome: nomeField.getValue(), note: noteField.getValue(),firm_id:firmField.getValue(),email:emailField.getValue(),
																																			back_office: back_office.getValue(),numero_back_office:numero_back_office.getValue(),mail_back_office:mail_back_office.getValue(),
																																			type:typeField.getValue(),linee:lineeField.getValue(),ssi:ssiField.getValue(),
																																			paese:paeseField.getValue(),telefono:telefonoField.getValue(),Linee: lineeField.getValue(),
																																			Cla:claField.getValue(),ml:mlField.getValue(), comp:compField.getValue(),id:getId(contact)}, 'Contact');
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
						height: 370,
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
	items: [{
		xtype: 'textfield',
		fieldLabel: 'Name', 
		name: 'nome',
		labelAlign: 'top',
		cls: 'field-margin',
		flex: 3
	}, {
		xtype: 'combo',
		fieldLabel:'Firm',
		name : 'firm_id',
		store:Ext.data.StoreManager.lookup('bbCompanies4ComboStore'),
		displayField : 'firm',
		valueField : 'id',
		initialValue : contact.firm_id,
		pageSize : pageSize,
		listeners:{
												afterrender: function(){
													console.debug(this)
													this.store.load()
													var defaultValue = contact.firm_id
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
		flex: 15
	}, {
		xtype : 'textfield',
		fieldLabel : 'Nota',  
		name : 'note',
		labelAlign : 'top',
		cls : 'field-margin',
		flex : 4
	},{
						xtype:'textfield',
						fieldLabel:'Cla',
						name:'cla',
						labelAlign: 'top',
		cls: 'field-margin',
		flex: 2
	  }]
	},
	{
	xtype: 'container',
	layout: 'hbox',
	items:[
	{
						xtype:'textfield',
						fieldLabel:'E-Mail',
						name:'email',
						labelAlign: 'top',
		cls: 'field-margin',
		flex: 2
	  },
								{
									xtype:'textfield',
									fieldLabel:'Telefono',
									name:'telefono',
									labelAlign: 'top',
										cls: 'field-margin',
										flex: 1.5
								},
								{
									xtype:'checkboxfield',
									fieldLabel:'M.L.',
									name: 'ml',
									labelAlign: 'top',
									cls: 'field-margin',
								}
							]
		},{
	xtype: 'container',
	layout: 'hbox',
	items:[
								{
									xtype : 'textfield',
									fieldLabel : 'Back Office',
									name : 'back_office',
									labelAlign: 'top',
									cls: 'field-margin',
								},
								{
									xtype : 'textfield',
									fieldLabel : 'Mail Back Office',
									name : 'mail_back_office',
									labelAlign: 'top',
									cls: 'field-margin',
								},
								{
									xtype : 'textfield',
									fieldLabel : 'Numero Back Office',
									name : 'numero_back_office',
									labelAlign: 'top',
									cls: 'field-margin',
								}]
	  },
	  {
				xtype: 'container',
				layout: 'hbox',
				items:[
								{
									xtype : 'textfield',
									fieldLabel : 'Type',
									name : 'type',
									labelAlign: 'top',
									cls: 'field-margin',
								},
								{
									xtype : 'textfield',
									fieldLabel : 'Linee',
									name : 'linee',
									labelAlign: 'top',
									cls: 'field-margin',
								},
								{
									xtype : 'textfield',
									fieldLabel : 'SSI',
									name : 'ssi',
									labelAlign: 'top',
									cls: 'field-margin',
								},
								
									]
			},{
					xtype: 'container',
					layout: 'hbox',
					items:[
									{
										xtype : 'textfield',
										fieldLabel : 'Paese',
										name : 'paese',
										labelAlign: 'top',
										cls: 'field-margin',
									},
									{
										xtype : 'checkboxfield',
										fieldLabel : 'Comp',
										name : 'comp',
										labelAlign: 'top',
										cls: 'field-margin',
									}
								]
				}
		]
});
function setButtonText(c){
	var text = 'Inserisci contatto'
	if ( c.id != null){
		text = 'modifica contatto'
	}
	return text
}
function setTitleGritter(c){
	var title = ' Nuovo Contatto'
	if ( null != c.id){
		title = 'Modifica Contatto'
	}
	return title
}

function setTextGritter(c){
	var text = 'Contatto inserito correttamente'
	if ( null != c.id){
		text = 'Contatto modificato correttamente'
	}
	return text
}
function setTitleContact(c){
	var title = 'Nuovo Contatto'
	if (null != c.id)
	{
		title = 'Modifica Contatto '+c.nome
	}
	return title 
}
contactWindow = Ext.create('Ext.window.Window',
{
			title: setTitleContact(contact),
			height: 470,
			width:650,
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
	

