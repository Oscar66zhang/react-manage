import resso from "resso";
import { User } from '@/types/api'

const store = resso({
	token: '',
	userInfo: {
		userEmail: '',
		userName: ''
	},
	updateUserInfo(userInfo: User.UserItem) {
		store.userInfo = userInfo
	}
})

export default store
