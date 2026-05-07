declare interface Window {
  BMapGL: {
    [propName: string]: any
  }
  app: string
  getUser: () => { name: string; age: number }
}

declare function jQuery(selector: string): void

declare let Dev: string

declare interface String {
  getLen(): number
}
