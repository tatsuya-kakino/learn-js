'use strict'
// let variable1 = "fromModule.js";

export const module2 = {
  variable: "fromModule2.js",

  print() {
    console.log(this.variable)
  }
}
export function name2(){
  const print = (function(){
    const name = "kaikino2"
    console.log(name)
  })();
  const name = "name2"
  return name
}
