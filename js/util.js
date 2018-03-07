var EventUtil={
  addHandler:function(element,type,handler) {
    if(element.addEventListener) {
      element.addEventListener(type,handler);
    }
    else if (element.attachEvent) {
      element.attachEvent("on"+type,handler);
    }
    else {
      element["on"+type]=handler;
    }
  },
  getEvent:function(event){
     return event?event:window.event;
  },
  preventDefault:function(event) {
    if(event.preventDefault) {
      event.preventDefault();
    }
    else {
      event.returnValue=false;
    }
  },
  stopPropagation:function(event) {
    if(event.stopPropagation) {
      event.stopPropagation();
    }
    else {
      event.cancelBubble=true;
    }
  }
}
var DOMUtil= {
  hasClass:function(element,cName) {
    if(element.classList) {
      return element.classList.contains(cName);
    }
    else {
    return !!element.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
  }
  },
  addClass:function(element,cName) {
    if(element.classList) {
      element.classList.add(cName);
    }
    else {
      if (!this.hasClass(element, cName)) {
            element.className += " " + cName;
        }
    }
    
  },
  removeClass:function(element,cName) {
    if(element.classList) {
      element.classList.remove(cName);
    }
    else {
      if (this.hasClass(element, cName)) {
            element.className =
                element.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), '');
            console.log(element.className);
        }
    }
    
      },
  toggleClass:function(element,cName) {
    if(element.classList) {
      element.classList.toggle(cName);
    }
    else {
      if (this.hasClass(element, cName)) {
            this.removeClass(element, cName);
        } else {
            this.addClass(element, cName);
        }
      }

    }

    
}




