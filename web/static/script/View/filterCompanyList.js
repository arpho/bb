var companiesFilterParameter = null

function addParameter(keyParameter,valueCheck,value){
	/*aggiunge un parametro del filtro ad extraParams
	 * @param:keyParameter: chiave del parametro così come viene identificato  nel database e dal server
	 * @param: valueCheck la condizione che stabilisce se includere o meno  il parametro nel filtro, se omesso è false è il valore di default 
	 * @param: value il valore ricercato*/
	if (this.form[keyParameter]!=valueCheck){
		this.store.getProxy().extraParams[keyParameter] = (null!=value)?value:this.form[keyParameter]
	}
}
function filterMaker(store,form){
	/*classe dicomodoche permette di aggiungere agevolmente i parametri di ricerca
	 * @param: store di riferimento per la grid
	 * @param: form usata per inserire i dati*/
	this.store= store
	this.form=form
	this.addParameter=addParameter
}

function CompanyFilterForm()
{
	var submitForm = function(){
		var filterQuery = {}
		var store = Ext.data.StoreManager.lookup('bbCompaniesStore')
	

			companiesFilterParameter = CompanyFormList.getForm().getValues()/* memorizzo
			
			// i valori dei campi in una variabile che viene usata per ripristinare i valori dei campi quando riapro la form*/
			var parametersAdder = new filterMaker(store,companiesFilterParameter)
			parametersAdder.addParameter('firm')
			parametersAdder.addParameter('note')
			parametersAdder.addParameter('email')
			parametersAdder.addParameter('website')
			parametersAdder.addParameter('paese')
			parametersAdder.addParameter('tipo')
			parametersAdder.addParameter('telefono')
			if (companiesFilterParameter.somma){
						store.getProxy().extraParams.somma = true
			}
			store.load()
	}
	var CompanyFormList = Ext.create('Ext.form.Panel',
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
					items:[
										{
																	xtype: 'textfield',
																	name:'firm',
																	fieldLabel: "Firm",
																	labelAlign: 'top',
																	cls: 'filter-margin'
										},
										{
																	xtype: 'textfield',
																	name:'note',
																	fieldLabel: "Nota",
																	labelAlign: 'top',
																	cls: 'filter-margin'
										},
										{
																	xtype: 'textfield',
																	name:'email',
																	fieldLabel: "email",
																	labelAlign: 'top',
																	cls: 'filter-margin'
										},
										{
																	xtype: 'textfield',
																	name:'website',
																	fieldLabel: "Web site",
																	labelAlign: 'top',
																	cls: 'filter-margin'
										},
										
								]
			},{
					xtype: 'container',
					layout: 'hbox',
					items:[
									{
																	xtype: 'textfield',
																	name:'paese',
																	fieldLabel: "Paese",
																	labelAlign: 'top',
																	cls: 'filter-margin'
										},
										{
																	xtype: 'textfield',
																	name:'tipo',
																	fieldLabel: "Tipo",
																	labelAlign: 'top',
																	cls: 'filter-margin'
										},
										{
																	xtype: 'textfield',
																	name:'telefono',
																	fieldLabel: "Telefono",
																	labelAlign: 'top',
																	cls: 'filter-margin'
										},
										{
													xtype:'checkboxfield',
													fieldLabel:'almeno un parametro',
													name: 'somma',
													labelAlign: 'left',
													cls: 'filter-or-margin',
										}
					]
				}
		]
	})
	// fine CompanyFormlist
	console.debug(companiesFilterParameter)
	CompanyFormList.getForm().setValues(companiesFilterParameter)
	filterWindow = Ext.create('Ext.window.Window',
	{
				title: 'Filtra Aziende',
				height: 460,
				width:650,
				layout: 'border',
				items:[
								{
									region: 'center',
									items:CompanyFormList
								}
							]
			
	});
	
	filterWindow.show()
}