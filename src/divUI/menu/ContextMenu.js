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
 * A popup menu composed of a sequence of special div elements which
 * provides options in context to some object the menu was opened for.
 * (e.g. right-clicking on some interactable object)
 * @constructor
 */
DivUI.ContextMenu = function() {
  DivUI.Container.call(this);
  
  var div = this.getDiv();
  
  div.style.borderStyle = "outset";
  div.style.borderColor = "rgb(200,200,200)";
  div.style.position = "absolute";
  div.style.left = "900px";
  div.style.top = "50px";
  div.style.backgroundColor = "rgba(200,200,200,0.7)";
  
  this._menuItems = [];
  this._context = undefined;
  
  var self = this;
  var htmlElement = document.getElementsByTagName("html")[0];
  htmlElement.onclick = function() {
    self.hide();
  };
};

DivUI.ContextMenu.prototype = {
  
  constructor:DivUI.ContextMenu, 
  
  isaContextMenu: true,
  
  /** 
   * Displays the context menu in context to some object at the 
   * specified absolute coordinates.
   * @param {object} context
   * @param {int} x
   * @param {int} y
   */
  show:function(context, x, y) {
    this._context = context;
    
    // Loop through the menu items and choose whether to hide or disable them
    // based on the object provided as the context.
    for(var i = 0; i < this._menuItems.length; i++) {
      var item = this._menuItems[i];
      item.setEnabled(context);
    }
    
    var div = this.getDiv();
    div.style.left = x + "px";
    div.style.top = y + "px";
    div.style.visibility = "visible";
  },
  
  /** 
   * Makes the context menu no longer visible. 
   */
  hide:function() {
    this.getDiv().style.visibility = "hidden";
  },
  
  /** 
   * Adds an item to the context menu.
   * @param {DivUI.ContextMenuItem || DivUI.Component} item
   */
  add:function(item) {
    DivUI.Container.prototype.add.call(this, item);
    
    if(item.isaContextMenuItem) {
      var self = this;
      this._menuItems.push(item);
    //  this._menuDiv.appendChild(item.getDiv());
      
      item.getDiv().onclick = function(event) {
        if(item.isEnabled()) {
          item.clickHandler(self._context);
          self.hide();
        }
        event.stopPropagation();
      }
    }
  },
  
  
  /** 
   * Removes an item from the context menu.
   * @param {DivUI.ContextMenuItem || DivUI.Component} item
   */
  remove: function(item) {
    DivUI.Container.prototype.remove.call(this, item);
    
    if(item.isaContextMenuItem) {
      var index = this._menuItems.indexOf(item);
      
      this._menuItems.splice(index, 1);
    }
  },
  
  
  /** 
   * Returns the nth menu item in this context menu. 
   * @param {uint} n    The index of the menu item.
   * @return {DivUI.ContextMenuItem}
   */
  getItem: function(n) {
    if(n < 0 || n >= this._menuItems.length) {
      throw new RangeError("Component index out of bounds. ");
    }
  },
  
  
  /** 
   * Returns the number of menu items in this context menu.
   * @return {uint}
   */
  getItemCount: function() {
    return this._menuItems.length;
  }
};


Util.Inheritance.inherit(DivUI.ContextMenu, DivUI.Container);


