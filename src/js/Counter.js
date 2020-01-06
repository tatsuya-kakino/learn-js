'use strict'
export class Count {
  constructor(count){
    this.count = count;
  }
  get(){
    return this.count
  }
  Increment() {
    this.count++;
    return this.count;
  }
  Decrement() {
    this.count--;
    return this.count;
  }
}
