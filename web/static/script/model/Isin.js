Ext.namespace('BB');
Ext.define('Isin',
	{
		extend: 'Ext.data.Model',
		fields: [
			{
				name :  'id',
				type : 'string'
			},
			{
				name :'isin'
			},
			{
				name :'price'
			},
			{
				name :'size'
			},
			{
				name :'data',
				type: 'date'
			},
			{
				name: 'nota'
			},
			{
				name : 'contact_id'
			},
			{
				name : 'session_id'
			}
		],
	proxy : {
		type : 'rest',
		url : 'data/isin/'
	}
})
