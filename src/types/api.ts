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
	message: string
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
		mobile: string,
		job: string,
		role: number,
		roleList: string,
		createId: number,
		deptName: string,
		userImg: string
	}
}

export namespace Dashboard {
	export interface ReportData {
		driverCount: number
		totalMoney: number
		orderCount: number
		cityNum: number
	}
	export interface LineData {
		label: string[]
		order: number[]
		money: number[]
	}

	export interface PieData {
		value: number
		name: string
	}

	export interface RadarData {
		indicator: Array<{ name: string; max: number }>
		data: {
			name: string
			value: number[]
		}
	}


}


