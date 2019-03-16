export let globals = {
	mockEnv: 'uat',
	version: '1.0', // 版本号
	unifiedLogin: '',
	host: 'http://192.168.1.101:7001/api', // 接口地址
	domain: '',
	isIE9: /MSIE (9.0|10.0)/.test(navigator.userAgent),
	uniServe: {
		dev: '',
		uat: '', // UAT统一用户
		pre: '', // 预生产统一用户
		prod: '' // 正式统一用户
	},
	hostServe: {
		dev: '',
		uat: '',
		pre: '',
		prod: ''
	},
	hostServeIe9: {
		dev: '',
		uat: '',
		pre: '',
		prod: ''
	},
	domainServe: {
		dev: '',
		uat: '',
		pre: '',
		prod: ''
	}
}
