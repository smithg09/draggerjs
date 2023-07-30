// Smith Gajjar (c) 2022.
// MIT License.

let _isLoaded = false;
let callbacksFn = [];
const _isTouch = window.ontouchstart !== undefined;

export const dragger = function(target, handler, onDragStart, onDragEnd) {
  // Register a global event to capture mouse moves (once).
  if (!_isLoaded) {
    document.addEventListener(_isTouch ? "touchmove" : "mousemove", function(event) {
      let c = event;
      if (event.touches) {
        c = event.touches[0];
      }

      // On mouse move, dispatch the coords to all registered callbacks.
      for (var i = 0; i < callbacksFn.length; i++) {
        callbacksFn[i](c.clientX, c.clientY);
      }
    });
  }

  _isLoaded = true;
  let isMoving = false, hasStarted = false;
  let startX = 0, startY = 0, lastX = 0, lastY = 0;

  // On the first click and hold, record the offset of the pointer in relation
  // to the point of click inside the element.
  handler.addEventListener(_isTouch ? "touchstart" : "mousedown", function(event) {
    event.stopPropagation();
    event.preventDefault();
    if (target.dataset.dragEnabled === "false") {
      return;
    }

    let c = event;
    if (event.touches) {
      c = event.touches[0];
    }

    isMoving = true;
    startX = target.offsetLeft - c.clientX;
    startY = target.offsetTop - c.clientY;
  });

  // On leaving click, stop moving.
  document.addEventListener(_isTouch ? "touchend" : "mouseup", function(event) {   
    if (onDragEnd && hasStarted) {
      onDragEnd(target, parseInt(target.style.left), parseInt(target.style.top));
    }

    isMoving = false;
    hasStarted = false;
  });

  // Register mouse-move callback to move the element.
  callbacksFn.push(function move(x, y) {
    if (!isMoving) {
      return;
    }

    if (!hasStarted) {
      hasStarted = true;
      if (onDragStart) {
        onDragStart(target, lastX, lastY);
      }
    }

    lastX = x + startX;
    lastY = y + startY;

    // If boundary checking is on, don't let the element cross the viewport.
    if (target.dataset.dragBoundary === "true") {
      lastX = Math.min(window.innerWidth - target.offsetWidth, Math.max(0, lastX));
      lastY = Math.min(window.innerHeight - target.offsetHeight, Math.max(0, lastY));
    }

    target.style.left = lastX + "px";
    target.style.top = lastY + "px";
  });
}

export { dragger as default };
