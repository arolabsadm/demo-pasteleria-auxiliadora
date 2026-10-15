(function(){
'use strict';
var $=function(s){return document.querySelector(s)};
var burger=$('#burger'),menu=$('#menu');
burger.addEventListener('click',function(){var o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Cerrar menú':'Abrir menú')});
menu.addEventListener('click',function(e){if(e.target.tagName==='A'){menu.classList.remove('open');burger.setAttribute('aria-expanded',false)}});

var els=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1,rootMargin:'0px 0px -30px 0px'});
  els.forEach(function(el,i){el.style.transitionDelay=(i%3)*80+'ms';io.observe(el)});
}else{els.forEach(function(el){el.classList.add('in')})}

/* carrusel de opiniones */
var slides=document.querySelectorAll('.slide'),dots=$('#dots'),cur=0,timer;
slides.forEach(function(_,i){var d=document.createElement('i');dots.appendChild(d)});
function go(n){cur=(n+slides.length)%slides.length;slides.forEach(function(s,i){s.classList.toggle('on',i===cur);dots.children[i].classList.toggle('on',i===cur)})}
function auto(){clearInterval(timer);if(!matchMedia('(prefers-reduced-motion: reduce)').matches)timer=setInterval(function(){go(cur+1)},5500)}
$('#sp').addEventListener('click',function(){go(cur-1);auto()});
$('#sn').addEventListener('click',function(){go(cur+1);auto()});
go(0);auto();

/* encargo de ejemplo (no envía nada) */
$('#form').addEventListener('submit',function(e){
  e.preventDefault();
  var f=e.target,n=f.n.value.trim(),t=f.t.value.trim(),note=$('#fnote');
  if(!n||!t){note.textContent='Por favor, indica tu nombre y un teléfono.';return}
  note.innerHTML='Esto es solo un ejemplo. En tu web real el encargo llegaría directo a la pastelería; por ahora, <a href="tel:+34953697045">llámanos al 953 69 70 45</a>.';
});
})();
