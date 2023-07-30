# dragger.js

A tiny JS library to make DOM elements draggable and movable with Zero dependencies. [Demo here](dragger.js/docs/).

## Usage

### Node
```shell
npm install @smithg09/dragger
```

```javascript
import { dragger } from @smithg09/dragger;

// (target, handler, onDragStart(target, x, y), onDragEnd(target, x, y)).
// onDragStart and onDragEnd are optional callbacks that receive target element, and x, y coordinates.

dragger(document.querySelector("#dragBox"), document.querySelector("#dragBox .drag-handler"));
```

### ES6 module
[Check this example](index.html) to include dragger.js as a `<script>` directly on an HTML page.

Licensed under the MIT License.
