Ext.namespace('BB');
	var pageSize = BB.pageSize;
	
	Ext.create('Ext.data.Store',
			{
        storeId: 'bbContactsStore',
        model: 'Contact',
        pageSize: pageSize,
        proxy:
        {
					idProperty : '_id',
					type: 'rest',
					url: 'data/contacts/' /*+ 'node-mongo-bb/contacts' + '/'*/,
					autoload: true,
					noCache: false,
					sortParam: undefined,
					autoSync: true,
					reader: {
            root: 'data',
            totalProperty: 'total'
        },
				autoLoad: {
				params: {
					start: 0,
					
				}
			},
					actionMethods:
					 {
							create : 'PUT',
							read   : 'GET',
							update : 'POST',
							destroy: 'DELETE'
						},
					reader:
					{
						type: 'json',
						root: 'data'
					},
					listeners: {
					exception: function(proxy, response, operation) {
						Ext.gritter.add({
							title: 'update',//BB.text['action.' + operation.action] || operation.action,
							text: (operation.error ? operation.error.statusText : null) || BB.text.exception
						}); 
						
						// Ext JS 4.0 does not handle this exception!
						switch (operation.action) {
							case 'create':
								Ext.each(operation.records, function(record) {
									record.store.remove(record);
								});
								break;
								
							case 'destroy':
								Ext.each(operation.records, function(record) {
									if (record.removeStore) {
										record.removeStore.insert(record.removeIndex, record);
									}
								});
								break;
						}
					}
				}
				}// close proxy
			}
    );
