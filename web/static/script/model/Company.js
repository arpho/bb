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
				name :'firm',
				type : 'string'
			},{
				name : 'p'
			},
			{
				name: 'linee'
			},
			{
				name : 'c'
			},
			{
				name : 'data',
				type: 'date'
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
			},
			{
				name : 'session_id'
			},
			{
				name : 'group_id'
			}
			
			
	],
	proxy : {
		type : 'rest',
		url : 'data/companies/'
	}

	}
	);
