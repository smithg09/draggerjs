# dragger.js

A tiny JS library to make DOM elements draggable and movable with Zero dependencies. [Demo here](https://dragger.smithgajjar.dev/).

## Usage
```javascript
import { dragger } from @smithg09/dragger;

// (target, handler, onDragStart(target, x, y), onDragEnd(target, x, y)).
// onDragStart and onDragEnd are optional callbacks that receive target element, and x, y coordinates.

dragger(document.querySelector("#dragBox"), document.querySelector("#dragBox .drag-handler"));
```

### ES6 module
[Check this example](https://github.com/smithg09/draggerjs/blob/main/docs/index.html) to include dragger.js as a `<script>` directly on an HTML page.

Licensed under the MIT License.
