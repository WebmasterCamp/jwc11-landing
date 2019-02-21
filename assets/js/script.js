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

// carousel branch
var current = 0;

var positions = {
  front: 'rotateY(0deg) translateZ(250px)',
  right: 'rotateY(77deg) translateZ(140px)',
  back: 'rotateY(0deg) translateZ(100px)',
  left: 'rotateY(-77deg) translateZ(140px)'
}

function carousel(prevButton, nextButton) {
  
  let cards = Array.from(document.querySelectorAll('.major-card'))
  
  let positionList = [
    positions.front,
    positions.right,
    positions.back,
    positions.left
  ]
  
  function changeStyle () {
    cards.map((each, index) => {
      each.style.transform = positionList[index]
      if (positions.front === positionList[index]) {
        each.style.zIndex = '10'
      } else {
        each.style.zIndex = null
      }
    })
  }

  function next () {
    current = (current + 1) % 4
    current = current === -1 ? 4 : current
    positionList.splice(0, 0, positionList.pop())
    changeStyle()
  }

  
  function prev () {
    current = (current - 1) % 4
    current = current === -1 ? 4 : current
    positionList.push(positionList.shift())
    changeStyle()
  }

  this.init = function () {
    document.querySelector('.major-card.is-1').style.zIndex = '10'
    prevElement = document.querySelector(prevButton)
    nextElement = document.querySelector(nextButton)
    prevElement.addEventListener('click', prev)
    nextElement.addEventListener('click', next)
  }
}

let branchCarousel = new carousel('#major-left', '#major-right')
branchCarousel.init()

// flip card

function getViewport() {
  var viewPortWidth
  var viewPortHeight

  // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
  if (typeof window.innerWidth != 'undefined') {
    viewPortWidth = window.innerWidth,
    viewPortHeight = window.innerHeight
  }

  // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
  else if (typeof document.documentElement != 'undefined'
  && typeof document.documentElement.clientWidth !=
  'undefined' && document.documentElement.clientWidth != 0) {
    viewPortWidth = document.documentElement.clientWidth,
    viewPortHeight = document.documentElement.clientHeight
  }

  // older versions of IE
  else {
    viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
    viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
  }
  return [viewPortWidth, viewPortHeight];
}


let viewDetailButtons = Array.from(document.querySelectorAll('.side.front'))

let majorCards = Array.from(document.querySelectorAll('.major-card'))


majorCards.map(each => {
  each.addEventListener('click', function () {
    viewDetail(this)
  }, false)
})

viewDetailButtons.map(eachBtn => {
  eachBtn.addEventListener('click', function () {
    viewDetail(this.parentElement.parentElement)
  }, false)
})

function viewDetail(element) {
  const branches = {
    0: 'content',
    1: 'design',
    2: 'marketing',
    3: 'programming'
  }
  const [widthViewport, height] = getViewport()
  selectedBranch = element.getAttribute('data-branch')
  if (widthViewport < 576 && branches[current] !== selectedBranch)
    return

  element.classList.add('active')
}

// detect click outside card it will hide
document.addEventListener('click', function (event) {
  if (!event.target.closest('.major-card')) {
    majorCards.map(each => {
      each.classList.remove('active')
    })
  }
})