Ext.namespace('BB');
Ext.create('Ext.container.Viewport',
	{
		id: 'viewport',
		layout: 'border',
		autoScroll: true
		items:
		[{
			region: 'north',
			margins: '0 0 0 0',
			border: false,
			padding: '5 5 5 5',
			bodyCls: 'x-border-layout-ct', // Uses the neutral background color
			contentEl: 'header',
			height: 150
		},// ends header item
		 {
				region: 'center',
				split: true,
				id: 'mv-editor-companies',
				layout:'fit',
				xtype: 'bb-companies',
				//height: 400,
				//minHeight: 300

			},// ends companies item
		 {
				layout: 'fit',
				region: 'south',
				split: true,
				border: false,
				id: 'mv-editor-contacts',
				layout:'fit',
				autoScroll: true,
				xtype: 'bb-contacts',
				//height: 10000,
			}//ends contacts item
		]//ends items in viewPort
	}// ends viewPort
	);//ends create viewport
