Ext.namespace('BB');

	var CompanyGrid = Ext.create('Ext.grid.Panel',{
        title: 'Aziende',
        viewConfig      : {
											style : { overflow: 'auto', overflowX: 'hidden' }
										},
        store: Ext.data.StoreManager.lookup('bbCompaniesStore'),
        dockedItems:[{xtype: 'pagingtoolbar',
        store: Ext.data.StoreManager.lookup('bbCompaniesStore'),
        
        dock: 'bottom',
        items:[
        {
                            xtype: 'button',
                            icon: 'media/addcompany.png',
                            text: 'aggiungi azienda',
                            handler: function()
                            {  companyForm(//carico la  form con dati di default
															{
																_id: 5,
																Firm : 'Firm',
																country : 'paese',
																note : 'nota',
																type : 'tipo',
																telefono : '123456789',
																website : 'www.firm.it',
																email: ' arpho@live.co.uk'
															})
														}
			},{
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
										header:'P',
										dataIndex:'p'
									},
									{
										header:'C',
										dataIndex:'c'
									},
									{
											header: 'Firm',
											dataIndex: 'firm',
											flex:4
									},
									{
										header:'Paese',
										dataIndex:'paese'
									},
									{
											header: 'Note',
											dataIndex: 'note',
											flex:4
									},
									{
										header:'Tipo',
										dataIndex:'type'
									},
									{
										header:'Linee',
										dataIndex:'linee'
									},
									{
										header: 'Data',
										dataIndex: 'data',
										flex: 1
									}
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
																	companyForm(rec.data)
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
																var firmField = formPanel.items.get(0).items.get(0);
																var countryField = formPanel.items.get(0).items.get(1);
																var noteField = formPanel.items.get(0).items.get(2);
																var typeField =  formPanel.items.get(0).items.get(3);
																var mailField = formPanel.items.get(1).items.get(0)
																var telefonoField = formPanel.items.get(2).items.get(0)
																var webField = formPanel.items.get(3).items.get(0)
																function getId(c){
																	var id
																	if (null != c.id){
																		id = c.id+'/'//  il trailing slash serve a sistemare lo url della richiesta Post
																		//console.log(id)
																	}
																	return id
																}
																var Company = Ext.ModelManager.create({firm: firmField.getValue(), note: noteField.getValue(),
																'paese':countryField.getValue(),type:typeField.getValue(),email:mailField.getValue(),
																telefono:telefonoField.getValue(),website:webField.getValue(),id:getId(company)}, 'Company');
																Company.save()
																Ext.data.StoreManager.lookup('bbCompaniesStore').load
																companyWindow.close()
																function setTitleGritter(c){
																	//console.log(c.id)
																	var title = 'Inserimento'
																	if (null != c.Id || "" != c.id){
																		title = "Modifica"
																	}
																	return title
																}
																function setTextGritter(c){
																	var text = "azienda inserita correttamente"
																	if (null != c.Id || "" != c.id){
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
		if (null!= c.id ){
			text = 'Modifica Azienda'
		}
			return text
	}
	var formPanel = Ext.create('Ext.form.Panel',
{
    //title: 'Add new Company',

    //renderTo: Ext.getBody(),
		style: 'margin: 50px',
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
											xtype: 'textfield',
											fieldLabel: 'Linee',  
											name: 'linee',
											labelAlign: 'top',
											cls: 'field-margin',
											flex: 1
									},
									]
			},
		]
});
function setTitleCompany(company){
	var title = 'Nuova Azienda'
	//console.debug(company)
	if (null != company.id){
		title = ' Modifica azienda '+company.firm
	}
	return title
	}
	formPanel.getForm().setValues(company)
	companyWindow = Ext.create('Ext.window.Window',
	{
		title: setTitleCompany(company),
		height: 400,
		width:1300,
    layout: 'border',
    items: {
							region: 'center',
							items:formPanel
						}
	}
	);
	companyWindow.show();
}
