import request from "@/utils/request";
import { Dashboard, Login, User } from "@/types/api";
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
	}
}

