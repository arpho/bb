Ext.namespace('BB');
	var pageSize = BB.pageSize;

Ext.create('Ext.data.Store',
			{
				storeId: 'bbCompaniesStore',
				model:'Company',
				pageSize: pageSize,
				buffered: true,
				purgePageCount: 0,
				proxy:
				{
					idProperty : '_id',
					type: 'rest',
					url: 'data/companies/' /*+ 'node-mongo-bb/companies' + '/'*/,
					autoload: true,
					noCache: false,
					sortParam: undefined,
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
						root: 'data',
						totalProperty: 'total'
					},
					
				},// proxy
				listeners: {
					exception: function(proxy, response, operation) {
						Ext.gritter.add({
							title: MongoVision.text['action.' + operation.action] || operation.action,
							text: (operation.error ? operation.error.statusText : null) || MongoVision.text.exception
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
			}
    );
