import { Menu } from "@/types/api"

/**
 * 工具函数封装
 */

//格式化金额
export const formatMoney = (num?: number | string) => {
	if (!num) return '0.00'
	const a = parseInt(num.toString());
	return a.toLocaleString('zh-CN', { style: "currency", currency: "CNY" })
}


//格式化数字
export const formatNum = (num?: number | string) => {
	if (!num) return 0;
	const a = num.toString()
	if (a.indexOf('.') > -1) return a.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
	return a.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}


//格式化日期
export const toLocalDate = (date?: Date, rule?: string) => {
	let curData = new Date();
	if (date) curData = date;
	if (rule === 'yyy-MM-dd') return curData.toLocaleDateString();
	if (rule === "HH:mm:sss") return curData.toLocaleTimeString();
	return curData.toLocaleString().replace('/', '-');
}

// 格式化日期
export const formatDate = (date?: Date | string, rule?: string) => {
	let curDate = new Date()
	if (date instanceof Date) curDate = date
	else if (date) curDate = new Date(date)

	let fmt = rule || 'yyyy-MM-dd HH:mm:ss'
	fmt = fmt.replace(/(y+)/, curDate.getFullYear().toString())
	type OType = {
		[key: string]: number
	}

	const O: OType = {
		'M+': curDate.getMonth() + 1,
		'd+': curDate.getDate(),
		'H+': curDate.getHours(),
		'm+': curDate.getMinutes(),
		's+': curDate.getSeconds()
	}

	for (const k in O) {
		fmt = fmt.replace(new RegExp(`(${k})`), O[k] > 9 ? O[k].toString() : '0' + O[k].toString())
	}
	return fmt;
}


export const formatState = (state: number) => {
	if (state === 1) return "在职"
	if (state === 2) return "试用期"
	if (state === 3) return "离职"
}


//获取页面路径
export const getMenuPath = (list: Menu.MenuItem[]): string[] => {
	return list.reduce((result: string[], item: Menu.MenuItem) => {
        return result.concat(
            Array.isArray(item.children) && item.children.length > 0 && !item.buttons
                ? getMenuPath(item.children)
                : item.path + ''
        )
    }, [])

}

//递归获取路由对象
export const searchRoute: any=(path: string, routes: any = []) => {
	for (const item of routes) {
		if (item.path === path) return item
		if (item.children) {
			const result = searchRoute(path, item.children)
			if (result) return result
		}
	}
	return null
}
