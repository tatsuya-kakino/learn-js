'use strict'
//Style import
import '../css/style.scss';

(() => {
  let plusEnable = document.querySelectorAll(".parent .plus.enable");
  let child = document.querySelectorAll(".parent + .child")
  console.log(child[0])
  plusEnable[0].addEventListener('click', () => {
    child[0].style.display = "flex";
  })
})();