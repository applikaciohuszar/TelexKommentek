var tabInspector = function(callback) {
	var storedTabs = {};
	browser.tabs.onUpdated.addListener(function(tabId, info, tabInfo) {
		var url = new String(tabInfo.url).toLowerCase(),
			id  = tabId;

		if(typeof info.status !== 'undefined' && info.status === 'complete') {
			if(url.startsWith('http') || url.startsWith('https')) {
				if(Object.keys(storedTabs).includes(id))
					return;

				storedTabs[id] = url;
				callback({event : 'updated', tabId : id});
			}
		}
	});
	browser.tabs.onRemoved.addListener(function(tabId, tabInfo) {
		if(typeof storedTabs[tabId] !== 'undefined') {
			delete storedTabs[tabId];
			callback({event : 'removed', tabId : tabId});
		}
	});
};

tabInspector(function(response) {
	browser.tabs.sendMessage(response.tabId, {
		bind : 'update'
	}).then(function(result) {
		if(typeof result !== 'undefined') {
			
		}
	}).catch(function(e) {
		
	});
});