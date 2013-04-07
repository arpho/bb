Ext.namespace('BB');
Ext.define('Company',
	{
	extend: 'Ext.data.Model',
	fields: [
			{
					name :  'id',
					type : 'string'
			},
			{
				name :'firm'
			},{
				name : 'c'
			},
			{
				name : 'c'
			},
			{
				name : 'data'
			},
			{
				name :'note'
			},
			{ 
				name :'paese'
			},
			{
				name : 'email'
			},
			{
				name : 'telefono'
			},
			{
				name : 'type'
			},
			{
				name : 'website'
			}
			
			
	],
	proxy : {
		type : 'rest',
		url : 'data/companies/'
	}

	}
	);
