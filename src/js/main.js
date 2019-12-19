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
    parent4: "parent4",
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
    ulWrap(STR, ID) {
      const ul = `<ul id="${ID}">${STR}</ul>`
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
  // let count = increment()
  let count = 1;
   const getValue = (OBJECT) => {
     for(let n in OBJECT){
       let key = Object.keys(OBJECT);
       const bool = typeof OBJECT[n];
       if(bool === "object"){
        console.log(`key: ${n}, count: ${count}`)
        count++
        getValue(OBJECT[n])
      }else{
        console.log(`key: ${n}, count: ${count}`)

       }
     }
   }
   const myObj = new MY_OBJ(obj, '.wrapper ul');
   getValue(obj)
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