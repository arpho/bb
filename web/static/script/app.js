Ext.namespace('BB');

Ext.define('LoggedUser', {
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
proxy: {
type: 'sessionstorage',
id : 'loggeduser'
}
});
// Disable _dc parameter for caching
Ext.Loader.config.disableCaching = false;
Ext.onReady(function() 
	{
		var loggeUserStore = Ext.create('Ext.data.Store',{
													model: 'LoggedUser'
													});
													loggeUserStore.load();
		BB.user = new User(BB.user)
		if (!BB.user.isLogged()){
			showLogin(loggeUserStore)
		}
			Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
			BB.noWrapTextAreaTpl = Ext.create('Ext.XTemplate',
				'<textarea id="{id}" ',
						'<tpl if="name">name="{name}" </tpl>',
						'<tpl if="rows">rows="{rows}" </tpl>',
						'<tpl if="cols">cols="{cols}" </tpl>',
						'<tpl if="tabIdx">tabIndex="{tabIdx}" </tpl>',
						'class="{fieldCls} {typeCls}" style="border: none;" ',
						'autocomplete="off" spellcheck="false" wrap="off">',
				'</textarea>',
				{
						compiled: true,
						disableFormats: true
				}
		);
			BB.noSpellCheckTextAreaTpl = Ext.create('Ext.XTemplate',
	    '<textarea id="{id}" ',
	        '<tpl if="name">name="{name}" </tpl>',
	        '<tpl if="rows">rows="{rows}" </tpl>',
	        '<tpl if="cols">cols="{cols}" </tpl>',
	        '<tpl if="tabIdx">tabIndex="{tabIdx}" </tpl>',
	        'class="{fieldCls} {typeCls}" style="border: none;" ',
	        'autocomplete="off" spellcheck="false">',
	    '</textarea>',
	    {
	        compiled: true,
	        disableFormats: true
	    }
	);
	Ext.create('Ext.container.Viewport',
	{
		id: 'viewport',
		layout: 'border',
		items:
		[// ends header item
		/*{
				region: 'east',
				layout: 'fit',
				collapsible: true,
				split: true,
				id: 'mv-filter',
				layout:'fit',
				xtype: 'bb-filter',
				//width:500,
				//height:600
			},*/
		 {
				region: 'center',
				split: true,
				id: 'mv-editor-companies',
				layout:'fit',
				xtype: 'bb-companies',
				height:150
			},// ends companies item
			// 
		 {
				layout: 'fit',
				region: 'south',
				//collapsible: true,
				split: true,
				id: 'mv-editor-contacts',
				layout:'fit',
				autoScroll: true,
				xtype: 'bb-contacts',
				height: 250
			}//ends contacts item
		]//ends items in viewPort
	}// ends viewPort
	);//ends create viewport
	console.log('app')
	loadData(BB.user)
	}// ends onready
	);
