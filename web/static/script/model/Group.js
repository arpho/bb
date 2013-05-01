Ext.namespace('BB');
Ext.define('Group',
	{
		extend: 'Ext.data.Model',
		fields: [
			{
				name :  'id',
				type : 'string'
			},
			{
				name:'group'
			},
			{
				name: 'session_id'
			}
		],
	proxy : {
		type : 'rest',
		url : 'data/groups/'
	}
})
