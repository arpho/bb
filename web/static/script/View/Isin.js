function showIsins(contact,session_id){
	var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
					clicksToMoveEditor: 1,
					autoCancel: false
	});
	var store = Ext.data.StoreManager.lookup('bbIsinStore')
	console.log('isin ricevuto')
	console.log(session_id)
	store.getProxy().extraParams.session_id = session_id
	var IsinGrid = Ext.create('Ext.grid.Panel', {
				title: contact.nome +' '+contact.firm+': Isin',
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
			},
			{
				header : 'Nota',
				dataIndex : 'nota',
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
				items:[{xtype:'button',text:'export excel',
		icon: 'media/excel.png',
		template:new Ext.Template(
				'<table border="0" cellpadding="0" cellspacing="0" class="x-btn-wrap"><tbody><tr>',
				'<td class="x-btn-left"><i> </i></td><td class="x-btn-center"><a class="x-btn-text" href="{1}" target="{2}">{0}</a></td><td class="x-btn-right"><i> </i></td>',
				"</tr></tbody></table>"),
		handler:function(){
			this.url = 'data:application/vnd.ms-excel;base64,' +
			Base64.encode(IsinGrid.getExcelXml());
			window.location = this.url
		}
		},
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
								console.log('session_id isin')
								r.data.session_id = BB.user.user.session_id
								console.debug(r.data.session_id)
								r.save()
								store.getProxy().url = 'data/isin/'+contact.id+'/' // devo indirizzare la richiesta al giusto url
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
			width:565,
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
