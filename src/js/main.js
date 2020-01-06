'use strict'
import '../css/style.scss';
import { Count } from './Counter';

const OBJECT = () => {
  const OBJ = {
    parent1: "parent1",
    parent2: {
      child1: "child1",
      child2: "child2",
      child3: {
        grandChild1: "grandChild1",
        grandChild2: "grandChild2",
        grandChild3: {
          grandChild4: "grandChild4",
          grandChild5: {
            grandChild6: "grandChild6"
          }
        }
      }
    },
    parent3: "parent3",
    parent4: "parent4",
    parent5: "parent5"
  }
  return (() => {
    return OBJ;
  })();
};
const DOM = document.querySelector(".wrapper");

/**
 * 引数Elementに渡したDOMをメソッド名のElementでWrapする
 */
class Wrapper {
  static Div(Element) {
    const WRAPPER = document.createElement('div')
    Element.before(WRAPPER);
    WRAPPER.append(Element);
  }
  static Ul() {
    const WRAPPER = document.createElement('ul')
    Element.before(WRAPPER);
    WRAPPER.append(Element);
  }
  static li() {
    const WRAPPER = document.createElement('li')
    Element.before(WRAPPER);
    WRAPPER.append(Element);
  }
  static p() {
    const WRAPPER = document.createElement('p')
    Element.before(WRAPPER);
    WRAPPER.append(Element);
  }
}

class TreeView {
  constructor(OBJECT, DOM){
    this.OBJECT = OBJECT;
    this.DOM = DOM;
  }
  isObject(str){
    const type = typeof str
    if(type === "object"){
      return true;
    }else{
      return false;
    }
  }
}
const Render = (OBJECT, DOM, COUNT) => {
  const count_int = new Count(COUNT).Increment();
  const tree_obj = new TreeView(OBJECT, DOM);
  const objArray = Object.entries(OBJECT);
  for(let n of objArray){
    const objBool = tree_obj.isObject(n[1]);
    if(objBool){
      const key = n[0];
      console.log(key);
      console.log(`NEST-COUNT: ${COUNT}`);
      Render(n[1], DOM, new Count(count_int).get());
    }else{
      const key = n[1];
      console.log(key);
      console.log(`NEST-COUNT: ${COUNT}`);
    }
  }
}
Render(OBJECT(), DOM, new Count(0).get());

// const NULL     = null;
// const ob       = {parent: "parent"};
// const arr      = [1, 2, 3, 4, 5];
// const date     = new Date();
// const fn       = () => {};
// const str      = "string!";
// const num      = 123;
// const bool     = true;
// const undefine = undefined;

// console.log(`instanceof null:      ${NULL instanceof Object}`)    //instanceof null:      false
// console.log(`instanceof object:    ${ob instanceof Object}`)      //instanceof object:    true
// console.log(`instanceof array:     ${arr instanceof Object}`)     //instanceof array:     true
// console.log(`instanceof instanse:  ${date instanceof Object}`)    //instanceof instanse:  true
// console.log(`instanceof function:  ${fn instanceof Object}`)      //instanceof function:  true
// console.log(`instanceof string:    ${str instanceof Object}`)     //instanceof string:    false
// console.log(`instanceof number:    ${num instanceof Object}`)     //instanceof number:    false
// console.log(`instanceof boolean:   ${bool instanceof Object}`)    //instanceof boolean:   false
// console.log(`instanceof undefined: ${undefine instanceof Object}`)//instanceof undefined: false

// console.log(`typeof null:      ${typeof NULL}`)    //typeof null:      object
// console.log(`typeof object:    ${typeof ob}`)      //typeof object:    object
// console.log(`typeof array:     ${typeof arr}`)     //typeof array:     object
// console.log(`typeof instanse:  ${typeof date}`)    //typeof instanse:  object
// console.log(`typeof function:  ${typeof fn}`)      //typeof function:  function
// console.log(`typeof string:    ${typeof str}`)     //typeof string:    string
// console.log(`typeof number:    ${typeof num}`)     //typeof number:    number
// console.log(`typeof boolean:   ${typeof bool}`)    //typeof boolean:   boolean
// console.log(`typeof undefined: ${typeof undefine}`)//typeof undefined: undefined