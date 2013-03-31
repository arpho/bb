var contactsFilterParameter = null

function addParameter(keyParameter,valueCheck,value){
	if (this.form[keyParameter]!=valueCheck){
		this.store.getProxy().extraParams[keyParameter] = (null!=value)?value:this.form[keyParameter]
	}
}
function filterMaker(store,form){
	this.store= store
	this.form=form
	this.addParameter=addParameter
}
function ContactFilterForm()
{

	var submitForm = function()
		{
			var filterQuery = {}
			var store = Ext.data.StoreManager.lookup('bbContactsStore')
			
			contactsFilterParameter = ContactFormList.getForm().getValues() 
			var parametersAdder = new filterMaker(store,contactsFilterParameter)
			/* memorizzo
			
			// i valori dei campi in una variabile che viene usata per ripristinare i valori dei campi quando riapro la form*/
			//console.debug(contactsFilterParameter)
			parametersAdder.addParameter('firm',null)
			parametersAdder.addParameter('nome')
			parametersAdder.addParameter('ml','dnc')
			parametersAdder.addParameter('comp','dnc')
			if (contactsFilterParameter.comp!='dnc'){
						store.getProxy().extraParams.ml = contactsFilterParameter.comp
						
				
			}
			parametersAdder.addParameter('back_office')
			parametersAdder.addParameter('mail_back_office')
			parametersAdder.addParameter('paese')
			parametersAdder.addParameter('telefono')
			parametersAdder.addParameter('tipo')
			parametersAdder.addParameter('email')
			parametersAdder.addParameter('somma',null,true)
			/*if (contactsFilterParameter.somma){
						store.getProxy().extraParams.somma = true
			}*/
			parametersAdder.addParameter('back_office')
			parametersAdder.addParameter('ssi')
			store.load()
		} 
		
	var ContactFormList = Ext.create('Ext.form.Panel',
	{
    //style: 'margin: 10px',
    buttons: [{
        text: 'Cerca',
        handler: submitForm
    }],
    items:
    [
			{
					xtype: 'container',
					layout: 'hbox',
					items:
							[	
								
									{
										xtype: 'textfield',
										name:'telefono',
										fieldLabel: "Telefono",
										labelAlign: 'top',
										cls: 'filter-margin'
									},
									{
										xtype: 'textfield',
										name:'email',
										fieldLabel: "Email",
										labelAlign: 'top',
										cls: 'filter-margin'
									},
									{
											xtype: 'textfield',
											name:'linee',
											fieldLabel: "Linee",
											labelAlign: 'top',
											cls: 'filter-margin'
									},
									
							]
					
			},//fine primo container
			{
				xtype: 'container',
        layout: 'hbox',
        items: [{
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
									name : 'firm',
									labelAlign : 'top',
									cls : 'field-margin',
									flex: 4
							},
								{
									xtype: 'textfield',
									name:'tipo',
									fieldLabel: "Tipo",
									labelAlign: 'top',
									cls: 'filter-margin',
									flex: 1
								},
								{
											xtype: 'textfield',
											fieldLabel:"SSI",
											name:'ssi',
											labelAlign: 'top',
											cls: 'filter-margin',
									flex: 1
								},
							]
			},// fine secondo container
			{
				xtype: 'container',
        layout: 'hbox',
        items:
        [
					{
						xtype: 'textfield',
						fieldLabel:"Back Office",
						name:'back_office',
						fieldLabel: "Back Office",
						labelAlign: 'top',
						cls: 'filter-margin'
					},
									{
										xtype: 'textfield',
										name:'mail_back_office',
										fieldLabel: "Mail Back Office",
										labelAlign: 'top',
										cls: 'filter-margin'
									},
									{
											xtype:'combo',
											store:{fields: ['key','label'], 
															data: [
																			{key:'dnc',label: 'tralascia'},
																			{key:'on',label: 'y'}, 
																			{key:'off', label:'n'}, 
																			
																		]
														},
														listeners:{
																				afterrender: function(){
																					var defaultValue = 'dnc'
																					
																					if (null!=contactsFilterParameter){
																							defaultValue = (contactsFilterParameter.comp!=null)?contactsFilterParameter.comp:'dnc'
																						
																					}
																					this.setValue(defaultValue)
																					console.debug(contactsFilterParameter)
																				}
																			},
											displayField : 'label',
											valueField : 'key',
											fieldLabel:'Comp',
											name: 'comp',
											labelAlign: 'top',
											cls: 'filter-margin',
					},
				]
					//vuoto
									
				
      },//fine terzo container
      {
				xtype: 'container',
        layout: 'hbox',
        items:
				[
					{
											xtype: 'textfield',
											name:'paese',
											fieldLabel: "Paese",
											labelAlign: 'top',
											cls: 'filter-margin'
					},
					{
											xtype: 'textfield',
											fieldLabel:"Nome",
											name:'nome',
											labelAlign: 'top',
											cls: 'filter-margin'
					},
					{
											xtype:'combo',
											store:{fields: ['key','label'], 
															data: [
																			{key:'dnc',label: 'tralascia'},
																			{key:'on',label: 'y'}, 
																			{key:'off', label:'n'}, 
																			
																		]
														},
														listeners:{
																				afterrender: function(){
																					var defaultValue = 'dnc'
																					this.setValue(defaultValue)
																					if (null!=contactsFilterParameter){
																						if(contactsFilterParameter.ml!='dnc')
																							defaultValue =(contactsFilterParameter.ml!=null)?contactsFilterParameter.ml:'dnc'
																					}
																					console.debug(defaultValue)
																				}
																			},
											displayField : 'label',
											valueField : 'key',
											fieldLabel:'ML',
											name: 'ml',
											labelAlign: 'top',
											cls: 'filter-margin',
					},
					
					
				]
			},// fine quarto container
					{
						xtype: 'container',
						layout: 'hbox',
						items:
						[{
									xtype: 'textfield',
									fieldLabel:"Website",
									name:'website',
									fieldLabel: "website",
									labelAlign: 'top',
									cls: 'filter-margin'
								}
							
						,{
													xtype:'checkboxfield',
													fieldLabel:'almeno un parametro',
													name: 'somma',
													labelAlign: 'top',
													cls: 'filter-or-margin',
													flex: 1
							}
							 
						]
					}//fine sesto container
					
		]// fine lista container
			}// fine panel
)	 // fine filterForm
console.debug(contactsFilterParameter)
ContactFormList.getForm().setValues(contactsFilterParameter)
	filterWindow = Ext.create('Ext.window.Window',
	{
				title: 'Filtra Contatti',
				height: 410,
				width:495,
				layout: 'border',
				items:[
								{
									region: 'center',
									items:ContactFormList
								}
							]
			
	});
	
	filterWindow.show()
}

