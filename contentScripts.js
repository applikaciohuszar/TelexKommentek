browser.runtime.onMessage.addListener(function(message, sender) {

	const articleUrl = window.location.href;
	const matchUrl = articleUrl.match(/^(https?\:\/\/)?(www\.)?([a-z0-9\.]+)\/(.*?)\/([0-9]+)\/([0-9]+)\/([0-9]+)\/([a-z0-9-_]+)/i);
	const setupComment = function(articleElem) {
		var boxElem  = document.querySelector('[data-telex=boxSeparator]');
		var articleElem = document.getElementsByClassName('article-html-content')[0];

		if(!boxElem && articleElem) {
			var btn = document.createElement('BUTTON');
				btn.setAttribute('data-telex', 'commentButton');
				btn.appendChild(document.createTextNode('Megjegyzések megjelenítése'));

			var separator = document.createElement('DIV');
				separator.setAttribute('data-telex', 'boxSeparator');
			var attention = document.createElement('DIV');
				attention.setAttribute('data-telex', 'attention');
				attention.appendChild(document.createTextNode('FIGYELEM! A megjegyzéseket nem a telex munkatársai moderálják! Probléma esetén ne őket keresse fel! Ha problémásnak talál felhasználókat, esetleg hózzászólásokat, kérem, jelentse! A jelentést úgy tudja megtenni, hogy rámegy egérrel a problémásnak ítélt megjegyzésre, majd a jobb felső sarokban megjelenő lefelé mutató kicsi háromszögre rákattint! A lenyíló menüben választhat az elérhető lehetőségek közül!'));
				attention.style.display='none';

				separator.appendChild(btn);
				separator.appendChild(attention);
				

			var dqElement = document.createElement('DIV');
				dqElement.id='disqus_thread';
				dqElement.style.display='none';
				separator.appendChild(dqElement);

			articleElem.appendChild(separator);

			btn.addEventListener('click', function() {
				dqElement.style.display='block';
				var disqus_config = function() {
					this.page.url = articleUrl;
					this.page.identifier = btoa(matchUrl[8]);
				};

				var dqScript = document.createElement('SCRIPT');
					dqScript.type='text/javascript';
					dqScript.src='https://telex-1.disqus.com/embed.js';
					dqScript.setAttribute('data-timestamp', +new Date());
					(document.head || document.body).appendChild(dqScript);
					btn.style.display='none';
					attention.style.display='block';
			});
		}
	};

	if(matchUrl) {
		var timer = null;
		var timeout = null;
		var parsed = false;

		timer = setInterval(function() {
			if(document.getElementsByClassName('article-html-content')[0]) {
				parsed = true;
				if(parsed && timeout) {
					clearTimeout(timeout);
				}
				setupComment();
				clearInterval(timer);
			}
		},20);

		timeout = setTimeout(function() {
			if(timer) {
				clearInterval(timer);
			}
		}, 30000);
	}

	//
	//	Világos / Sötét mód
	//

	return Promise.resolve('Initialized!');
});

