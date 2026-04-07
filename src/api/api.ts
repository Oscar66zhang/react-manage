import request from "@/utils/request";
import { Login } from "@/types/api";
export default {
	login(params: Login.parmas) {
		return request.post('/users/login', params)
	}
}

