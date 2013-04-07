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
				name :'data'
			}
		],
	proxy : {
		type : 'rest',
		url : 'data/isin/'
	}
})
