import request from "@/utils/request";
import { Dashboard, Login, Result, ResultData, User } from "@/types/api";
export default {
	login(params: Login.params) {
		return request.post<string>('/users/login', params, { showLoading: false, showError: false })
	},
	//获取用户信息
	getUserInfo() {
		return request.get<User.UserItem>("/users/getUserInfo")
	},
	//获取工作台汇总数据
	getReportData() {
		return request.get<Dashboard.ReportData>('/order/dashboard/getReportData')
	},
	getLineData() {
		return request.get<Dashboard.LineData>('/order/dashboard/getLineData')
	},
	// 获取城市分布数据
	getPieCityData() {
		return request.get<Dashboard.PieData[]>('/order/dashboard/getPieCityData')
	},
	// 获取年龄分布数据
	getPieAgeData() {
		return request.get<Dashboard.PieData[]>('/order/dashboard/getPieAgeData')
	},
	// 获取折线图数据
	getRadarData() {
		return request.get<Dashboard.RadarData>('/order/dashboard/getRadarData')
	},

	//获取用户列表
	getUserList(params: User.Params) {
		return request.get<ResultData<User.UserItem>>('/users/list', params)
	}
}

