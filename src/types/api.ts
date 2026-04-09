// 接口类型定义

// declare module 'axios' {
// 	interface AxiosRequestConfig {
// 		showLoading?: boolean
// 		showError?: boolean
// 	}
// }

interface A {
	name: string
}

interface B {
	age: number
}

const user: A & B = {
	name: 'jack',
	age: 10
}

export interface Result<T = any> {
	code: number,
	data: T,
	msg: string
}


export namespace Login {
	export interface params {
		username: string
		password: string
	}
}
