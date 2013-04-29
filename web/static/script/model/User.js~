Ext.namespace('BB');
Ext.define('User',
	{
    extend: 'Ext.data.Model',
    fields: [
			{
					name :  'id',
					type : 'string'
			},
			{
				name : 'user',
				type : 'string'
			},
			{
				name : 'password',
				type : 'string'
			},
			{
				name : 'logged',
				type : 'boolean'
			},{
				name : 'superuser',
				type : 'boolean'
			},{
				name : 'enabled',
				type : 'boolean'
			}
    ],
    proxy : {
        type : 'rest',
        url : 'data/users/'
    }

	}
	);
