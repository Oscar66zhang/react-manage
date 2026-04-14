// 从 zustand 引入 create，用来创建全局 store
import { create } from 'zustand'

// 引入用户类型定义
import { User } from '@/types/api'

// 本地存储工具（一般是 localStorage 封装）
import storage from '@/utils/storage'

// 创建一个全局 store
const store = create<{
	token: string // 登录 token
	userInfo: User.UserItem // 用户信息
	collapsed: boolean // 侧边栏是否折叠
	isDark: boolean // 是否是暗黑主题

	// 更新 token 的方法
	updateToken: (token: string) => void

	// 更新用户信息的方法
	updateUserInfo: (userInfo: User.UserItem) => void

	// 切换侧边栏折叠状态
	updateCollapsed: () => void

	// 更新主题
	updateTheme: (isDark: boolean) => void
}>((set) => ({
	// 初始 token
	token: '',

	// 初始用户信息（给一个默认空结构，避免 undefined）
	userInfo: {
		_id: '',
		userId: 0,
		userName: '',
		userEmail: '',
		deptId: '',
		state: 0,
		mobile: '',
		job: '',
		role: 0,
		roleList: '',
		createId: 0,
		deptName: '',
		userImg: ''
	},

	// 默认侧边栏不折叠
	collapsed: false,

	// 是否暗黑模式，从本地存储中读取（刷新不丢失）
	isDark: storage.get('isDark') || false,

	// 更新 token
	updateToken: (token) => set({ token }),

	// 更新主题（暗黑 / 亮色）
	updateTheme: (isDark) => set({ isDark }),

	// 更新用户信息
	updateUserInfo: (userInfo) => set({ userInfo }),

	// 切换侧边栏折叠状态（取反）
	updateCollapsed: () =>
		set((state) => {
			return {
				collapsed: !state.collapsed
			}
		})
}))

// 导出 store（在组件中使用）
export default store
