// collapsible QA section
var collapsibleList = document.getElementsByClassName("collapsible");

function hideOtherCollapse(exceptElement) {
  for (let index = 0; index < collapsibleList.length; index++) {
    let collapseItem = collapsibleList[index]
    let content = collapseItem.nextElementSibling;
    if (exceptElement !== collapsibleList[index]) {
      collapseItem.lastElementChild.classList.remove('active')
      content.style.maxHeight = null;
    }
  }
}

for (let index = 0; index < collapsibleList.length; index++) {
  collapsibleList[index].addEventListener("click", function() {
    this.lastElementChild.classList.toggle('active')
    let content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      hideOtherCollapse(this)
    } 
  });
}