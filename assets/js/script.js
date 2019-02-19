// collapsible QA section
var collapsibleList = document.getElementsByClassName("collapsible");

function hideOtherCollapse(exceptElement) {
  for (let index = 0; index < collapsibleList.length; index++) {
    let collapseItem = collapsibleList[index]
    let content = collapseItem.nextElementSibling;
    if (exceptElement !== collapsibleList[index]) {
      collapseItem.firstElementChild.classList.remove('active')
      content.style.maxHeight = null;
      collapseItem.style.background = null;
    }
  }
}

for (let index = 0; index < collapsibleList.length; index++) {
  collapsibleList[index].addEventListener("click", function() {
    this.firstElementChild.classList.toggle('active')
    let content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
      this.style.background = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      this.style.background = '#E0E0E0';
      hideOtherCollapse(this)
    } 
  });
}

setTimeout(function() {
  collapsibleList[0].click()
}, 500)