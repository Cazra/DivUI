/* 
 @preserve Copyright (c) 2014 Stephen "Cazra" Lindberg

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 The Software shall be used for Good, not Evil.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
*/

/** 
 * A Component that can contain other Components.
 * @param {div element} div   Optional. Wrap the provided div.
 */
DivUI.Container = function(div) {
  DivUI.Component.call(this, div);
  
  this._components = [];
};

DivUI.Container.prototype = {
  
  constructor: DivUI.Container,
  
  isaContainer: true,
  
  
  /** 
   * Adds a component to this container, appending it to its list of 
   * child components.
   * @param {DivUI.Component} comp
   * @return {DivUI.Component} The added component.
   */
  add: function(comp) {
    // If the component is already attached to a parent component, detach it.
    if(comp.getParent() !== undefined) {
      comp.getParent().remove(comp);
    }
    else if(comp.getDiv().parentNode !== null) {
      comp.getDiv().parentNode.removeChild(comp.getDiv());
    }
    
    // Attach the component to this container.
    comp._parent = this;
    this._components.push(comp);
    this.getDiv().appendChild(comp.getDiv());
    
    return comp;
  },
  
  
  /** 
   * Adds a component to this container, prepending it to its list of 
   * child components.
   * @param {DivUI.Component} comp
   * @return {DivUI.Component} The added component.
   */
  addFirst: function(comp) {
    // If the component is already attached to a parent component, detach it.
    if(comp.getParent() !== undefined) {
      comp.getParent().remove(comp);
    }
    else if(comp.getDiv().parentNode !== null) {
      comp.getDiv().parentNode.removeChild(comp.getDiv());
    }
    
    // Attach the component to this container.
    comp._parent = this;
    this._components.unshift(comp);
    this.getDiv().insertBefore(comp.getDiv(), this.getDiv().firstChild);
    
    return comp;
  },
  
  
  /** 
   * Removes a component from this container. 
   * @param {DivUI.Component || uint} comp   Either the component, or the index 
   *      for a component in this container.
   */
  remove: function(comp) {
    var index;
    if(comp.isaComponent) {
      index = this._components.indexOf(comp);
    }
    else {
      index = comp;
      comp = this._components[index];
    }
    
    if(index < 0) {
      throw Error("Component not found.");
    }
    
    this.getDiv().removeChild(comp.getDiv());
    comp._parent = undefined;
    
    this._components.splice(index, 1);
  },
  
  
  /** 
   * Removes the first component from the container and returns it.  
   * @return {DivUI.Component}
   */
  removeFirst: function() {
    var comp = this.getComponent(0);
    this.remove(comp);
    return comp;
  },
  
  /** 
   * Removes the last component from the container and returns it.  
   * @return {DivUI.Component}
   */
  removeLast: function() {
    var comp = this.getComponent(this.getComponentCount() - 1);
    this.remove(comp);
    return comp;
  },
  
  
  /** 
   * Removes all components from this container. 
   */
  removeAll: function() {
    while(this._components.length > 0) {
      this.remove(0);
    }
  },
  
  
  /** 
   * Returns the index of the specified element in this container. 
   * Returns -1 if not found.
   * @param {DivUI.Component} comp
   * @return {int}
   */
  indexOf: function(comp) {
    return this._components.indexOf(comp);
  },
  
  /** 
   * Returns the nth component in this container. 
   * @param {uint} n
   * @return {DivUI.Component}
   */
  getComponent: function(n) {
    if(n < 0 || n >= this._components.length) {
      throw new RangeError("Component index out of bounds. ");
    }
    else {
      return this._components[n];
    }
  },
  
  
  /** 
   * Returns a list of all the components in this container. 
   * @return {array:DivUI.Component}
   */
  getComponents: function() {
    var result = [];
    for(var i in this._components) {
      result.push(this._components[i]);
    }
    return result;
  },
  
  
  /** Returns the number of components in this container. */
  getComponentCount: function() {
    return this._components.length;
  }
};

Util.Inheritance.inherit(DivUI.Container, DivUI.Component);

