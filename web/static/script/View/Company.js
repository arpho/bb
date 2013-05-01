Ext.namespace('BB');

var linkButton = new Ext.LinkButton({
	id: 'grid-excel-button',
	text: 'Export to Excel'
});
	var rowEditingCompany = Ext.create('Ext.grid.plugin.RowEditing', {
					clicksToEdit: 2,
	});
	console.log(rowEditingCompany)
	var CompanyGrid = Ext.create('Ext.grid.Panel',{
	title: 'Aziende',
	selType: 'rowmodel',
		viewConfig: {
											style : { overflow: 'auto'}
										},
		store: Ext.data.StoreManager.lookup('bbCompaniesStore'),
		plugins: [
					rowEditingCompany
				],
		dockedItems:[{xtype: 'pagingtoolbar',
		store: Ext.data.StoreManager.lookup('bbCompaniesStore'),
		
		dock: 'bottom',
		items:[{xtype:'button',text:'export excel',
		id:'linkButton',
		icon: 'media/excel.png',
		template:new Ext.Template(
				'<table border="0" cellpadding="0" cellspacing="0" class="x-btn-wrap"><tbody><tr>',
				'<td class="x-btn-left"><i> </i></td><td class="x-btn-center"><a class="x-btn-text" href="{1}" target="{2}">{0}</a></td><td class="x-btn-right"><i> </i></td>',
				"</tr></tbody></table>"),
		handler:function(){
			console.debug(this)
			this.url = 'data:application/vnd.ms-excel;base64,' +
			Base64.encode(CompanyGrid.getExcelXml());
			window.location = this.url
		}
		},
		{
						xtype: 'button',
						icon: 'media/addcompany.png',
						text: 'aggiungi azienda',
						handler: function()
						{companyForm()/*
							console.log('rowediting before cancel')
							console.log(rowEditingCompany)
							rowEditingCompany.cancelEdit();
							console.log('rowediting after cancel')
							console.log(rowEditingCompany)
							var today = new Date();
							var dd = today.getDate();
							var mm = today.getMonth()+1; //January is 0!
							var yyyy = today.getFullYear();
							if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = mm+'/'+dd+'/'+yyyy;
							var company = Ext.ModelManager.create({
								data: today,
							}, 'Company');
							var store = Ext.data.StoreManager.lookup('bbCompaniesStore')
							store.insert(0, company);
							rowEditingCompany.startEdit(0, 0)
							CompanyGrid.on('edit', function() {
								store.remove(company)
								company.save()
								company.sync()
								store.load()
							})
						}*/
						}
		},
			{
					xtype:'button',
					text: 'Filtra aziende',
					icon: 'media/filter.png',
					handler:function(){
						CompanyFilterForm()
				}
				
				},
			{
						    xtype: 'button',
						    
						    text: 'Reset Filter',
						    icon : 'media/nofilter.png',
						    handler: function() {
															// resetto i campi della form
															companiesFilterParameter = {}
															var filteredStore = Ext.data.StoreManager.lookup('bbCompaniesStore')
					//delete filteredStore.getProxy().extraParams.firm_id
					filteredStore.getProxy().extraParams = {}
					filteredStore.load()
														}
						},
		],

		
		
		displayMsg: 'Visualizzo le aziende {0} - {1} su un totale di {2}',
		    emptyMsg: "Nessuna azienda da visualizzare",
		displayInfo: true}],
		columns:
								[
								{
									header : 'P',
									dataIndex:'p',
									editor: {
				// defaults to textfield if no xtype is supplied
				allowBlank: true
			}
								},
								{
									header : 'C',
									dataIndex : 'c',
									editor: {
				// defaults to textfield if no xtype is supplied
										allowBlank: true
									}
								},
									
									{
											header: 'Firm',
											dataIndex: 'firm',
											flex:4,
									editor: {
				// defaults to textfield if no xtype is supplied
										allowBlank: false
									}
									},
									{
										header:'Paese',
										dataIndex:'paese',
									editor: {
				// defaults to textfield if no xtype is supplied
										allowBlank: true
									}
									},
									{
										header : 'Note',
										dataIndex : 'note',
										flex:5,
									editor: {
				// defaults to textfield if no xtype is supplied
										allowBlank: true
									}
									},
									{
										header:'Tipo',
										dataIndex:'type',
									editor: {
				// defaults to textfield if no xtype is supplied
										allowBlank: true
									}
									},
									{
										header:'Linee',
										dataIndex:'linee',
									editor: {
				// defaults to textfield if no xtype is supplied
										xtype:'combo',
										store:{fields: ['key','label'], 
										data: [
												{key:'aperto',label: 'aperto'},
												{key:'hot',label: 'hot'}, 
												{key:'bridge', label:'bridge'},
												{key:'tradato', label:'tradato'}
									
											]
										},
										displayField : 'label',
										valueField : 'key',
										allowBlank: true
									}
									},
									{
										header:'Data',
										dataIndex:'data',
										renderer: Ext.util.Format.dateRenderer('Y-m-d')
									},
								],
		//columns: columns,
			border: false,
			forceFit: true,
			columnLines: true,
			listeners:
			{
				itemclick: function(view, record, item, index, e, options){
					//console.debug(record)
					var filteredStore = Ext.data.StoreManager.lookup('bbContactsStore')
					filteredStore.getProxy().extraParams = {firm_id: record.raw._id}
					filteredStore.load()
				},
				itemcontextmenu: function(view, rec, node, index, event) {
					event.stopEvent(); // stops the default event. i.e. Windows Context Menu
							//console.log('contextmenu')
							//console.debug(rec)
					var gridContextMenu = Ext.create('Ext.menu.Menu',
					{
						items: [
						{ text: 'Modifica', handler: function()
																{
																	//companyForm(rec.data)
																	var store = Ext.data.StoreManager.lookup('bbCompaniesStore')
																	rowEditingCompany.startEdit(index, 0)
																	rec.data.id = rec.data.id +'/'
																	CompanyGrid.on('edit', function() {
																		var company = Ext.ModelManager.create(rec.data, 'Company')
																		company.data.session_id = BB.user.user.session_id
																		store.remove(company)
																		company.save()
																		store.load()
																	})
																	
																},
							icon: 'media/modifica.png'
						},
						{text:'cancella',
						icon:'media/delete.png',
							handler:function()
							{
								rec.data.id = rec.data.id+'/'
								var Company = Ext.ModelManager.create(rec.data,'Company')
								function remove(btn){
									console.debug(btn)
									if (btn=='yes')
									{
										var esito =Company.destroy()
										console.debug(esito)
										if (esito)
										{
											Ext.gritter.add(
											{
												title: 'Cancellazione', 
												text: rec.data.firm+' è stata rimossa'
											}); 
											Ext.data.StoreManager.lookup('bbCompaniesStore').load()
										}
									};
								}
								Ext.MessageBox.confirm('Conferma', 'sei sicuro di voler cancellare '+rec.data.firm+'?', remove );
										
							}
						}
						]
						});
							//
							gridContextMenu.showAt(event.getXY()); // show context menu where user right clicked
							return false;
						},
			}
		
		//renderTo: Ext.getBody()
			});
/* linkButton.getEl().child('a', true).href = 'data:application/vnd.ms-excel;base64,' +
Base64.encode(CompanyGrid.getExcelXml());*/
 
 Ext.define('BB.companiesPanel',
  {
				extend: 'Ext.panel.Panel',
				alias:'widget.bb-companies',
		store: Ext.data.StoreManager.lookup('bbCompaniesStore'),
		layout: 'fit',
		items: CompanyGrid,
    });

function companyForm(company)
{
	var submitForm = function()
															{
																var pField =  formPanel.items.get(0).items.get(0);
																var cField =  formPanel.items.get(0).items.get(1);
																var firmField = formPanel.items.get(0).items.get(2);
																var countryField = formPanel.items.get(0).items.get(3);
																var noteField = formPanel.items.get(0).items.get(4);
																var typeField =  formPanel.items.get(0).items.get(5);
																var lineeField =  formPanel.items.get(0).items.get(6);
																var mailField = null// formPanel.items.get(1).items.get(0)
																var telefonoField = null// formPanel.items.get(2).items.get(0)
																var webField = null// formPanel.items.get(3).items.get(0)
																function getId(c){
																	var id
																	if (typeof c!== "undefined"){
																		id = c.id+'/'//  il trailing slash serve a sistemare lo url della richiesta Post
																		//console.log(id)
																	}
																	return id
																}
																var Company = Ext.ModelManager.create({firm: firmField.getValue(), note: noteField.getValue(),
																'paese':countryField.getValue(),type:typeField.getValue(),'c':cField.getValue()
																,'p':pField.getValue(),'linee':lineeField.getValue(),group_id:BB.user.user.group_id,
																id:getId(company)}, 'Company');
																Company.data.session_id = BB.user.user.session_id
																Company.save()
																Ext.data.StoreManager.lookup('bbCompaniesStore').load
																companyWindow.close()
																function setTitleGritter(c){
																	//console.log(c.id)
																	var title = 'Inserimento'
																	if (typeof c!== "undefined"){
																		title = "Modifica"
																	}
																	return title
																}
																function setTextGritter(c){
																	var text = "azienda inserita correttamente"
																	if (typeof c!== "undefined"){
																		text = "azienda modificata correttamente"
																	}
																	return text
																}
															Ext.gritter.add(
															{
																title: setTitleGritter(company), 
																text: setTextGritter(company)
															}); 
															}
	function setTextButton(c){
		var text = 'Inserisci Azienda'
		if (typeof c!== "undefined" ){
			text = 'Modifica Azienda'
		}
			return text
	}
	var formPanel = Ext.create('Ext.form.Panel',
{
    //title: 'Add new Company',

    //renderTo: Ext.getBody(),
		style: 'margin: 5px',
		height: 100,
		width : 1100,
		buttons: [
								{
										text: setTextButton(company),
										handler: submitForm,
										icon: 'media/conferma.png'
								}
							],
    items:
    [
			{
					xtype: 'container',
					layout: 'hbox',
					items: [
										{
												xtype: 'textfield',
												fieldLabel: 'P', 
												name: 'p',
												labelAlign: 'top',
												cls: 'field-margin',
												flex: 1
										},
										{
												xtype: 'textfield',
												fieldLabel: 'C', 
												name: 'c',
												labelAlign: 'top',
												cls: 'field-margin',
												flex: 1
										},
										{
												xtype: 'textfield',
												fieldLabel: 'Firm', 
												name: 'firm',
												labelAlign: 'top',
												cls: 'field-margin',
												flex: 1
										},{
												xtype: 'textfield',
												fieldLabel: 'Paese',  
												name: 'paese',
												labelAlign: 'top',
												cls: 'field-margin',
												flex: 1
											},
											{
												xtype: 'textfield',
												fieldLabel: 'Nota',  
												name: 'note',
												labelAlign: 'top',
												cls: 'field-margin',
												flex: 2
											},
											{
											xtype: 'textfield',
											fieldLabel: 'type',  
											name: 'type',
											labelAlign: 'top',
											cls: 'field-margin',
											flex: 1
									},
									{
											xtype:'combo',
							store:{fields: ['key','label'], 
								data: [
									{key:'aperto',label: 'aperto'},
									{key:'hot',label: 'hot'}, 
									{key:'bridge', label:'bridge'},
									{key:'tradato', label:'tradato'}
									
								]
							},
											displayField : 'label',
											valueField : 'key',
											fieldLabel: 'Linee',  
											name: 'linee',
											labelAlign: 'top',
											cls: 'field-margin',
											flex: 1
									},
									]
			},
			{
		xtype: 'container',
		layout: 'hbox',
		items: [
							]
			},// chiude secondo container
			{
		xtype: 'container',
		layout: 'hbox',
		items: [
									{
											xtype: 'textfield',
											fieldLabel: 'Telefono',  
											name: 'telefono',
											labelAlign: 'top',
											cls: 'field-margin',
											flex: 1
									},
							]
			},
			{
		xtype: 'container',
		layout: 'hbox',
		items: [
									{
											xtype: 'textfield',
											fieldLabel: 'Sito Internet',  
											name: 'website',
											labelAlign: 'top',
											cls: 'field-margin',
											flex: 1
									},
							]
			}
		]
});
function setTitleCompany(company){
	var title = 'Nuova Azienda'
	//console.debug(company)
	if (typeof company!== "undefined"){
		title = ' Modifica azienda '+company.firm
	}
	return title
	}
	formPanel.getForm().setValues(company)
	companyWindow = Ext.create('Ext.window.Window',
	{
		title: setTitleCompany(company),
		height: 150,
		width:1140,
    layout: 'border',
    items: {
							region: 'center',
							items:formPanel
						}
	}
	);
	companyWindow.show();
}
