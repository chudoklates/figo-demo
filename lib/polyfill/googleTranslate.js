// Monkeypatching Google Translate to prevent it from breaking the page
export default function monkeyPatchGoogleTranslate() {
  if (typeof Node === "function" && Node.prototype) {
    const originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function (...rest) {
      const [child] = rest;
      if (child.parentNode !== this) {
        return child;
      }
      return originalRemoveChild.apply(this, rest);
    };

    const originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function (...rest) {
      const [newNode, referenceNode] = rest;
      if (referenceNode && referenceNode.parentNode !== this) {
        return newNode;
      }
      return originalInsertBefore.apply(this, rest);
    };
  }
}
