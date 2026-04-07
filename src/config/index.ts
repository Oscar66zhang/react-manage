/**
 * 环境配置封装
 */

type ENV = "dev" | "stg" | "prd"

const env = document.documentElement.dataset.env as ENV

const config = {
	'dev': {
		baseApi: '/api',
		uploadApi: "http://api-driver-dev.marsview.cc",
		cdn: "http://xxx.aliyun.com",
		mock: true,
		mockApi: "http://127.0.0.1:4523/m1/8065399-7820911-default"
	},
	'stg': {
		baseApi: '/api',
		uploadApi: "http://api-driver-stg.marsview.cc",
		cdn: "http://xxx.aliyun.com",
		mock: false,
		mockApi: ""
	},
	'prd': {
		baseApi: '/api',
		uploadApi: "http://api-driver.marsview.cc",
		cdn: "http://xxx.aliyun.com",
		mock: false,
		mockApi: ""
	}
}

export default {
	env,
	...config[env]
}
