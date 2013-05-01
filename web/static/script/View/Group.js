function show_group_grid(session_id){
	var row_editing_group = Ext.create('Ext.grid.plugin.RowEditing', {
						clicksToEdit: 2,
		});
		var store = makes_group_store(session_id)
	var Group_grid = Ext.create('Ext.grid.Panel',{
		//title: 'Gruppi',
		selType: 'rowmodel',
		plugins: [
					row_editing_group
				],
			viewConfig: {
												style : { overflow: 'auto'}
											},
			store: store,
			dockedItems:[{xtype: 'pagingtoolbar',
					pageSize: pageSize,
					store: store,
					dock: 'bottom',
					items:[
						{xtype:'button',
						text:'aggiungi gruppo',
						icon:'media/group_add.png',
						handler: function(){
									row_editing_group.cancelEdit();
									var r = Ext.ModelManager.create({
										group: '',
									}, 'Group');
									console.log('gruppo')
									console.log(r)
									store.insert(0, r);
									row_editing_group.startEdit(0, 0)
									Group_grid.on('edit', function() {
									store.remove(r)
									//store.getProxy().url = 'data/isin/'+contact.id+'/'+'data/'
									//r.contact_id = contact.id
									console.log('session_id isin')
									r.data.session_id = BB.user.user.session_id
									console.debug(r.data.session_id)
									r.save()
									//store.getProxy().url = 'data/isin/'+contact.id+'/' // devo indirizzare la richiesta al giusto url
									store.load()
							})
								}
						}
					],
					displayMsg: 'Visualizzo i gruppi {0} - {1} su un totale di {2}',
					emptyMsg: "Nessun gruppo da visualizzare",
					displayInfo: true
				}
				],
			columns:[{
										header : 'Gruppo',
										dataIndex : 'group',
										align : 'right',
										flex : 1,
										editor : {
											// defaults to textfield if no xtype is supplied
											allowBlank: true
										}
									}
				]
	})
	Group_window = Ext.create('Ext.window.Window',
{
			title: "lista gruppi",
			height: 170,
			width:510,
			layout: 'border',
			items: {
								region: 'center',
								layout: 'fit',
								items:Group_grid
							}

})
store.load()
Group_window.show()
}
