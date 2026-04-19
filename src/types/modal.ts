import { RefObject } from "react"
import { User } from './api'

/**
 * 弹窗操作类型
 * create：新增
 * edit：编辑
 * delete：删除
 */
export type IAction = 'create' | 'edit' | 'delete'

/**
 * 弹窗组件的 Props 类型定义
 * 用于父组件控制弹窗，并在操作完成后刷新列表
 */
export interface IModalProp {
	/**
	 * 父组件调用弹窗的 ref 引用
	 * 通过 current.open() 可主动打开弹窗并传参
	 */
	mRef: RefObject<{
		open: (type: IAction, data: User.UserItem) => void
	} | undefined>

	/**
	 * 操作完成后的回调
	 * 一般用于重新请求列表数据、刷新页面
	 */
	update: () => void
}
