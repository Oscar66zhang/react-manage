/**
 * 工具函数封装
 */

//格式化金额
export const formatMoney = (num: number | string) => {
	const a = parseInt(num.toString());
	return a.toLocaleString('zh-CN', { style: "currency", currency: "CNY" })
}


//格式化数字
export const formatNum = (num: number | string) => {
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
export const fomratDate = (date?: Date, rule?: string) => {
	let curDate = new Date()
	if (date) curDate = date

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


