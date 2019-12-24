'use strict'
//Style import
import '../css/style.scss';
import { type } from 'os';
(() => {
  let obj = {
    parent1: {
      child1: {
        grandChild1: "grandChild1",
        grandChild2: "grandChild2"
      },
      child2: "child2"
    },
    parent2: "parent2",
    parent3: "parent3",
    parent4: {
      child3:"child3"
    },
    parent5: "parent5"
  }
  class Counter {
    constructor(INIT){
      this.INIT = INIT;
    }
    get(){
      return this.INIT
    }
    increment(){
      return this.INIT++;
    }
    decrement(){
      return this.INIT--;
    }
  }
  
  class TreeView{
    constructor(OBJECT, DOM) {
      this.OBJECT = OBJECT;
      this.LENGTH = Object.keys(OBJECT).length;
    }
    tagWrap(STR, TAG, ID){
      const result =  `<${TAG} id="${ID}">${STR}</${TAG}`;
      return result;
    }
    render(TAG, DOM) {
      return new Promise( (resolve, reject) => {
        DOM.insertAdjacentHTML('beforeend', TAG);
        return resolve()
      }).then(()=> {return DOM} )
    }
    wrap(DOM, WRAPPER) {
      DOM.before(WRAPPER);
      WRAPPER.append(DOM);
    }
    getKey(OBJECT, DOM) {
      return new Promise( (resolve, reject) => {
        for(let n in OBJECT){
          const key = Object.keys(OBJECT)
          let value = OBJECT[n];
          const bool = typeof value;
          if(bool === "object"){
            value = n;
            const id = `${value}`;
            const p = this.tagWrap(value, "p", `p-${id}`);
            const li = this.tagWrap(p, "li", `li-${id}`);
            this.render(li, DOM);
            const target = document.querySelector(`#p-${id}`);
            const addClass = document.querySelector(`#li-${id}`);
            addClass.classList.add(`nest${COUNT.get()}`)
            // target.classList.add(`nest${COUNT.get()}`)
            target.style.paddingLeft = `${COUNT.get() * 2}vw`;
            // if(COUNT.get() > 1){
            //   target.classList.add('hidden')
            // }
          }else{
            const id = `${value}`
            const p = this.tagWrap(value, "p", `p-${id}`);
            const li = this.tagWrap(p, "li", `li-${id}`);
            this.render(li, DOM)
            const target = document.querySelector(`#p-${id}`);
            const addClass = document.querySelector(`#li-${id}`);
            addClass.classList.add(`nest${COUNT.get()}`)
            // target.classList.add(`nest${COUNT.get()}`)
            target.style.paddingLeft = `${COUNT.get() * 2}vw`
            // console.log()
            // if(COUNT.get() > 1){
            //   target.classList.add('hidden')
            // }
          }
        }
        return resolve()
      })//.then(()=> console.log('test'))
    }
    getDomArray(OBJECT) {
      const objArray = []
      COUNT.increment()
      for(let n in OBJECT){
        const key = Object.keys(OBJECT)
        let value = OBJECT[n];
        const bool = typeof value;
        if(bool === "object"){
          const target = document.querySelector(`#li-${n}`);
          const targetChild = target.children[0]
          const wrapper = document.createElement("div");
          wrapper.className = `parentWrapper`;
          this.wrap(targetChild, wrapper);
          const object = value;
          objArray.push([object, target])
        }
      }
      if(objArray.length === 0){
        nestBool = true;
      }
      return objArray;
    }
    renderTree(OBJECT, DOM) {
      this.getKey(OBJECT, DOM).then(()=> {
      if(!nestBool){
        const ary = this.getDomArray(OBJECT);
        for(let n = 0;n < ary.length;n++){
          this.renderTree(ary[n][0],ary[n][1])
        }
      }
      let count = COUNT.get();
      })
    }
    parentPlus() {
      const wrapperArray = document.querySelectorAll(".parentWrapper");
      for(let i = 0;i < wrapperArray.length;i++){
        const tag = `<p id="${wrapperArray[i]}-plus">+</p>`;
        wrapperArray[i].insertAdjacentHTML('afterbegin', tag);
      }
    }
  }
  let COUNT = new Counter(1);
  let nestBool = false;
  const wrapper = document.querySelector('.wrapper ul');
  const treeView = new TreeView(obj, wrapper);
  treeView.renderTree(obj, wrapper); 
  // treeView.parentPlus(); 
})()