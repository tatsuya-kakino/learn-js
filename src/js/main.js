'use strict'
//Style import
import '../css/style.scss';
// import { ObjectA } from './__module';

(() => {
  const ObjectA = function(){
  }
  ObjectA.prototype.getName = function() {
    console.log(this.name);
  }
  const OBJ = new ObjectA();
  const NAME = { name: "kakino" }
  OBJ.getName.call(NAME)
})();
