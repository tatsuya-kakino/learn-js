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
  function MY_OBJ(OBJ, SELECTOR){
    this.OBJ = OBJ
    this.output = document.querySelector(SELECTOR);
  }
  MY_OBJ.prototype = {
    length( OBJ ) {
      const len = Object.keys(OBJ).length;
      return len;
    },
    getKey( OBJ, NUM ) {
      const value = Object.keys(OBJ)[NUM]
      return value;
    },
    getKeys( OBJ ) {
      const length = this.length( OBJ );
      let keyArray = [];
      for(let n = 0;n < length;n++) {
        const key = this.getKey(OBJ, n);
        keyArray.push(key);
      }
      return keyArray;
    },
    liWrap(STR, ID) {
      const li = `<li id="${ID}">${STR}</li>`
      return li;
    },
    pWrap(STR, ID) {
      const p = `<p id="${ID}">${STR}</p>`
      return p;
    },
    ulWrap(STR, ID) {
      const ul = `<ul id="${ID}>${STR}</ul>`
      return ul;
    },
    increment: (() => {
      let counter = 0;
      return () => {
        counter++
        return counter;
      }
    })(),
    render(TAG) {
      return new Promise( (resolve, reject) => {
        this.output.insertAdjacentHTML('beforeend', TAG);
        return resolve(TAG);
      })
    }
  }
  let increment = (() => {
    let counter = 0;
    return () => {
      counter++
      return counter;
    }
  })();

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
      // this.DOM = document.querySelector(DOM);
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
            target.classList.add(`nest${COUNT.get()}`)
            target.style.paddingLeft = `${COUNT.get() * 2}vw`;
          }else{
            const id = `${value}`
            const p = this.tagWrap(value, "p", `p-${id}`);
            const li = this.tagWrap(p, "li", `li-${id}`);
            this.render(li, DOM)
            const target = document.querySelector(`#p-${id}`);
            target.classList.add(`nest${COUNT.get()}`)
            target.style.paddingLeft = `${COUNT.get() * 2}vw`
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
          const object = value;
          objArray.push([object, target])
        }
      }
      console.log(objArray);
      if(objArray.length === 0){
        nestBool = true;
        console.log(true)
      }
      // console.log(objArray);
      // console.log(objArray.length);
      // console.log(COUNT.get())
      return objArray;
    }
    renderTree(OBJECT, DOM) {
      this.getKey(OBJECT, DOM).then(()=> {
        if(!nestBool){
          const ary = this.getDomArray(OBJECT);
          for(let n = 0;n < ary.length;n++){
            // this.getKey(ary[n][0],ary[n][1])
            this.renderTree(ary[n][0],ary[n][1])
          }
        }
      })
    }
  }
  let COUNT = new Counter(1);
  let nestBool = false;
  const wrapper = document.querySelector('.wrapper ul');
  const treeView = new TreeView(obj, wrapper);
  treeView.renderTree(obj, wrapper);  


      // console.log(value)
  //     // return value;
  //   }
  // } 


  // let COUNT = new Counter(1);
  // const RENDER = OBJECT => {
  //   const length = Object.keys(OBJECT).length;
  //   console.log(`length: ${length}`)
  //   console.log(`COUNT: ${COUNT.get()}`)

  //   for(let n in OBJECT){
  //     const key = Object.keys(OBJECT)
  //     const value = OBJECT[n];
  //     const bool = typeof value;
  //     if(bool === "object"){
  //       return new Promise( (resolve, reject) => {
  //         console.log(`nest: ${COUNT.get()}, key: ${n}`)
  //         COUNT.increment();
  //         RENDER(value)
  //       })
  //     }else if(bool === "string") {
  //       console.log(`nest: ${COUNT.get()}, key: ${n}`)
  //     }
  //     if(length === COUNT.get()){
  //       console.log("test")
  //     }
  //   }
  // } 


  // const length = Object.keys(obj).length;
  // const getLastValue = OBJECT => {
  //   const key = Object.keys(OBJECT)[0]
  //   const value = OBJECT[key];
  //   const bool = typeof value;
    
  //   if(bool === "object"){
  //     COUNT = new Counter(COUNT.get());
  //     COUNT.increment();
  //     for(let n in value){
  //       getLastValue(value)
  //     }
  //   }else{
  //     console.log(`nest: ${COUNT.get()}, key: ${key}`)
  //   }
  // }
  // getLastValue(obj)

  // const myObj = new MY_OBJ(obj, '.wrapper ul');
  // let count = 1;
  // const RENDER = (OBJECT) => {
  //   const length = myObj.length( OBJECT );
  //   for(let n = 0;n < length;n++){
  //     let key = Object.keys(OBJECT)[n];
  //     const value = key;
  //     const uniqueID = key;
  //     const str = myObj.pWrap(value, uniqueID);
  //     const tag = myObj.liWrap(str, `li-${uniqueID}`);
  //     myObj.render(tag)
  //     const DOM = document.querySelector(`#${uniqueID}`);
  //     DOM.style.paddingLeft = `${count * 2 }vw`
  //     let object = OBJECT[key]
  //   }
  // }
  // RENDER(obj);
  
  // const OBJ_RENDER = (OBJECT) => {
  //   const length = myObj.length( OBJECT );
  //   RENDER(OBJECT)
  //   for(let n = 0;n < length;n++){
  //     let key = Object.keys(OBJECT)[n];
  //     const bool = typeof OBJECT[key];
  //   }
  // }
  //  OBJ_RENDER(obj)


  // function GET_VALUES (OBJECT, COUNT) {
  //   const length = myObj.length( OBJECT );
  //   for(let n = 0;n < length;n++){
  //     const key = Object.keys(OBJECT)[n]
  //     const bool = typeof OBJECT[key];
  //     if(bool === "object"){
  //       const value = key;
  //       const uniqueID = key;
  //       const tag = myObj.liWrap(value, uniqueID);
  //       myObj.render(tag)
  //       const DOM = document.querySelector(`#${uniqueID}`);
  //       DOM.style.paddingLeft = `"${COUNT * 2 }vw"`
  //       COUNT++;
  //       let object = OBJECT[key]
  //       GET_VALUES(object, COUNT);
  //     }else if(bool !== "object") {
  //       const value = OBJECT[key];
  //       const uniqueID = OBJECT[key]
  //       const tag = myObj.liWrap(value, uniqueID);
  //       myObj.render(tag);
  //       const DOM = document.querySelector(`#${uniqueID}`);
  //       DOM.style.paddingLeft = `"${COUNT * 2 }vw"`
  //     }
  //   }
  // } 
  // function COUNTER() {
  //   var count = 0;
  //   this.INCREMENT = function(){
  //     count++;
  //     return count;
  //   }
  // }

  // const myObj = new MY_OBJ(obj, '.wrapper ul');
  // const RENDER = ( OBJECT ) => {
  //   const length = myObj.length( OBJECT );
  //   let COUNT = 1;
  //   for(let n = 0;n < length;n++) {
  //     const key = Object.keys(OBJECT)[n]
  //     console.log(key)
  //     const bool = typeof OBJECT[key];
  //     if(bool === "object"){
  //       const value = key;
  //       const uniqueID = key;
  //       console.log(`${COUNT * 2 + "vw"}`)
  //       const tag = myObj.liWrap(value, uniqueID);
  //       myObj.render(tag)
  //       const DOM = document.querySelector(`#${uniqueID}`);
  //       DOM.style.paddingLeft = `${COUNT * 2 + "vw"}`;
  //       let object = OBJECT[key]
  //       COUNT++
  //       GET_VALUES(object, COUNT)
  //     }else if(bool !== "object") {
  //       const value = OBJECT[key];
  //       const uniqueID = OBJECT[key]
  //       const tag = myObj.liWrap(value, uniqueID);
  //       myObj.render(tag);
  //       const DOM = document.querySelector(`#${uniqueID}`);
  //       DOM.style.paddingLeft = `"${COUNT * 2 }vw"`
  //     }
  //   }
  // }
  // GET_VALUES(obj);
  // RENDER(obj);


  // const RENDER = ( OBJECT ) => {
  //   const length = myObj.length( OBJECT );
  //   for(let n = 0;n < length;n++) {
  //     const key = Object.keys(OBJECT)[n]
  //     const bool = typeof OBJECT[key];
  //     if(bool === "object"){
  //       const value = key;
  //       const uniqueID = key;
  //       const tag = myObj.liWrap(value, uniqueID);
  //       myObj.render(tag)
  //       const DOM = document.querySelector(`#${uniqueID}`);
  //       DOM.style.paddingLeft = `${NESTCOUNT * 2 + "vw"}`;
  //       NESTCOUNT++;
  //       let object = OBJECT[key]
  //       RENDER(object, NESTCOUNT);
  //     }else if(bool !== "object") {
  //       const value = OBJECT[key];
  //       const uniqueID = OBJECT[key]
  //       const tag = myObj.liWrap(value, uniqueID);
  //       myObj.render(tag);
  //       const DOM = document.querySelector(`#${uniqueID}`);
  //       DOM.style.paddingLeft = `${NESTCOUNT * 2 + "vw"}`;
  //     }
  //   }
  // }
  // RENDER(obj);

  

  // const RENDER = (OBJECT) => {
  //   let nest = new COUNTER();
  //   let count = new COUNTER();
  //   for(let n in OBJECT){
  //     console.log(`nest: ${nest.INCREMENT()}`)
  //     console.log(`count: ${count.INCREMENT()}`)
  //   }
  // }
})()