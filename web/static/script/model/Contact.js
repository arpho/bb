Ext.namespace('BB');

Ext.define('Contact', {
    extend: 'Ext.data.Model',
    fields: [{
        name : 'id',
        type : 'string'
    },/*{
				name :'_id',
				type :'string'
			},*/
			{
				name:'cla',
				type:'int'
			},{
						name:'firm',
						type:'string'
					},
					{
					name:'firm_id'
					},{
							name: 'email'
						},
						{
							name: 'note'
						},
						 {
								name: 'data',
								type: 'string',
								dateFormat: 'Y-m-d'
							},
							{
								name:'comp',
								type:'boolean' 
							},
							{
								name:'ml',
								type:'boolean'
							},
							{
								name:'nome'
							},
							{
								name:'paese'
							},
							{
								name:'note'
							},
							{
								name : 'telefono'
							},
							{
								name : 'type'
							},
							{
								name : 'Linee',
								type : 'string'
							},
							{
								name : 'ssi'
							},
							{
								name : 'back_office'
							},
							{
								name : 'mail_back_office'
							},
							{
								name : 'numero_back_office'
							},
							{
								name : 'altri_colleghi'
							},
							{
								name : 'session_id'
							},
							{
								name : 'group_id'
							}
							],
							proxy :
							{
									type: 'rest',
									url: 'data/contacts/'
							}
							});
