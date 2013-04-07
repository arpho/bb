function showIsins(contact){
	var store = Ext.data.StoreManager.lookup('bbIsinStore')
	var IsinGrid = Ext.create('Ext.grid.Panel', {
				title: 'isin',
				viewConfig : {
											style : { overflow: 'auto' }
										},
	store: store,
	columns : [
			{
				header : 'isin',
				dataIndex : 'isin',
				//flex: 2
			},
			{
				header : 'Price',
				dataIndex : 'price',
				//flex: 2
			},{
				header : 'data',
				dataIndex : 'data',
			},
			{
				header : 'size',
				dataIndex : 'size',
			}
		],
		dockedItems:[{xtype: 'pagingtoolbar',
				pageSize: pageSize,
				store: Ext.data.StoreManager.lookup('bbIsinStore'),
				dock: 'bottom',
		}]
});
IsinWindow = Ext.create('Ext.window.Window',
{
			title: "isin relativi a "+contact.nome,
			height: 350,
			width:450,
			layout: 'border',
			items: {
								region: 'center',
								items:IsinGrid
							}

});
//store.getProxy().extraParams.id = contact.id
store.getProxy().url = 'data/isin/'+contact.id+'/'
store.load()
IsinWindow.show()
console.debug(contact)
}
