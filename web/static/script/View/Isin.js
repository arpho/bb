function showIsins(contact){
	var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
					clicksToMoveEditor: 1,
					autoCancel: false
	});
	var store = Ext.data.StoreManager.lookup('bbIsinStore')
	var IsinGrid = Ext.create('Ext.grid.Panel', {
				title: 'isin',
				plugins: [
					rowEditing
				],
				viewConfig : {
											style : { overflow: 'auto' }
										},
	store: store,
	columns : [
			{
				header : 'isin',
				dataIndex : 'isin',
				//flex: 2
				editor: {
				// defaults to textfield if no xtype is supplied
				allowBlank: false
			}
			},
			{
				header : 'Price',
				dataIndex : 'price',
				//flex: 2
				editor: {
				// defaults to textfield if no xtype is supplied
				allowBlank: false
			}
			},{
				header : 'data',
				dataIndex : 'data',
				renderer: Ext.util.Format.dateRenderer('Y-m-d')
			},
			{
				header : 'size',
				dataIndex : 'size',
				editor: {
				// defaults to textfield if no xtype is supplied
				allowBlank: false
			}
			}
		],
		dockedItems:[{xtype: 'pagingtoolbar',
				pageSize: pageSize,
				store: Ext.data.StoreManager.lookup('bbIsinStore'),
				dock: 'bottom',
				items:[
					{
						xtype: 'button',
						icon: 'media/coins_add.png',
						text: 'aggiungi isin',
						handler: function()
						{
							rowEditing.cancelEdit();// chiudo editing sospesi
							var today = new Date();
							var dd = today.getDate();
							var mm = today.getMonth()+1; //January is 0!
							var yyyy = today.getFullYear();
							if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = mm+'/'+dd+'/'+yyyy;
							var r = Ext.ModelManager.create({
								size: '',
								isin: '',
								data: today,
								price: '',
								contact_id: contact.id
							}, 'Isin');
							store.insert(0, r);
							rowEditing.startEdit(0, 0)
							IsinGrid.on('edit', function() {
								store.remove(r)
								//store.getProxy().url = 'data/isin/'+contact.id+'/'+'data/'
								//r.contact_id = contact.id
								console.debug(contact)
								r.save()
								store.getProxy().url = 'data/isin/'+contact.id+'/'
								Ext.data.StoreManager.lookup('bbIsinStore').load()
							})
						}
						
					}
				]
		}]
});
IsinWindow = Ext.create('Ext.window.Window',
{
			title: "isin relativi a "+contact.nome,
			height: 370,
			width:415,
			layout: 'border',
			items: {
								region: 'center',
								layout: 'fit',
								items:IsinGrid
							}

});
//store.getProxy().extraParams.id = contact.id
store.getProxy().url = 'data/isin/'+contact.id+'/'
store.load()
IsinWindow.show()
console.debug(contact)
}
