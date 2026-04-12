// 接口类型定义

// declare module 'axios' {
// 	interface AxiosRequestConfig {
// 		showLoading?: boolean
// 		showError?: boolean
// 	}
// }

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

export namespace User {
	export interface UserItem {
		_id: string,
		userId: number,
		userName: string,
		userEmail: string,
		deptId: string,
		state: number,
		role: number,
		roleList: string,
		createId: number,
		deptName: string,
		userImg: string
	}
}
