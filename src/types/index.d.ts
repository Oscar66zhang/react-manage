declare interface Window {
	app: string,
	getUser: () => { name: string, age: number }
}

declare function jQuery(selector: string): void;

declare let Dev: string

declare interface String {
	getLen(): number
}
