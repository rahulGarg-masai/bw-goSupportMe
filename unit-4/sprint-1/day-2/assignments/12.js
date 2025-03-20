let item2 = document.getElementById('item2');
let parent = item2.parentElement;
let prevsib = item2.previousElementSibling;
let nextsib = item2.nextElementSibling;
item2.addEventListener("click",()=>{
//alert(parent.textContent);
console.log(prevsib.textContent);
console.log(nextsib.textContent);
})