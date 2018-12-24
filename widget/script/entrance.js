// 入口
apiready = function () {
	var storage = new apiStorage()
	if (api.winName == 'root' && !api.frameName) {				
		// 进入app清空openedWindows数组
		storage.set('openedWindows', [])
	}
	var openedWindows = storage.get('openedWindows')

	var entryJS = document.getElementById('entry')
	var list = ['W/global', 'W/fastclick', 'W/util', 'W/http']
	list.push(entryJS.getAttribute('data-path'))
	// var sdk = entryJS.getAttribute('use-sdk')
	seajs.config({
		paths: {
			'C': 'Common',
			'M': 'Modules',
			'W': 'Middleware'
		}
	})
	seajs.use(list, function (vHammer) {
		FastClick.attach(document.body)
	})

	// window打开
	api.addEventListener({
		name: 'viewappear'
	}, function (ret, err) {
		if (!openedWindows) {
			return
		}
		var index = openedWindows.indexOf(api.winName)
		if (index == -1) {
			openedWindows.push(api.winName)
		}
		storage.set('openedWindows', openedWindows)
	})

}
