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
 * An item in a DivUI.ContextMenu. 
 * @constructor
 * @param {string} text   The content displayed for the item in the menu.
 */
DivUI.ContextMenuItem = function(text) {
  DivUI.Component.call(this);
  
  this._enabled = true;
  
  var self = this;
  var itemDiv = this.getDiv();
  
  itemDiv.innerHTML = text;
  itemDiv.style.cursor = "pointer";
  itemDiv.style.color = "rgb(0,0,0)";
  itemDiv.onmouseover = function() {
    itemDiv.style.backgroundColor = "rgba(255,255,255, 1.0)";
  };
  itemDiv.onmouseout = function() {
    itemDiv.style.backgroundColor = "rgba(255,255,255, 0.0)";
  };
  itemDiv.onmousedown = function() {
    if(self._enabled) {
      itemDiv.style.backgroundColor = "rgba(100,100,200,1.0)";
    }
  };
  itemDiv.onmouseup = function() {
    itemDiv.style.backgroundColor = "rgba(255,255,255, 1.0)";
  };
};


DivUI.ContextMenuItem.prototype = {
  
  constructor:DivUI.ContextMenuItem,
  
  isaContextMenuItem: true,
  
  
  
  /** 
   * Returns true iff this item is enabled.
   * @return {boolean}
   */
  isEnabled:function() {
    return this._enabled;
  },
  
  /** 
   * Enables the item. The text for the item becomes black and it 
   * will be highlighted when it is mouse-overed to show that 
   * it is enabled.
   */
  enable:function() {
    this._enabled = true;
    this.getDiv().style.color = "rgb(0,0,0)";
  },
  
  /** 
   * Disables the item. Its text is grayed out and it won't be highlighted
   * when it is mouse-overed to show that it is disabled.
   */
  disable:function() {
    this._enabled = false;
    this.getDiv().style.color = "rgb(100,100,100)";
  },
  
  /** 
   * Causes the item to not be displayed in the menu.
   */
  hide:function() {
    this.getDiv().style.display = "none";
  },
  
  /** 
   * Causes the item to appear in the menu if it was previously hidden.
   */
  show:function() {
    this.getDiv().style.display = "block";
  },
  
  
  //////// User-implemented methods
  
  /** 
   * Sets whether the item is enabled or disabled based on some context in 
   * which the menu was generated. 
   * The default implementation always enables the item. 
   * Override this.
   * @param {object} context
   */
  setEnabled:function(context) {
    this.enable();
  },
  
  
  /** 
   * Defines the behavior for selecting this menu item based on some context 
   * in which the menu was generated. 
   * The default implementation does nothing.
   * Override this.
   * @param {object} context
   */
  clickHandler:function(context) {}
};


Util.Inheritance.inherit(DivUI.ContextMenuItem, DivUI.Component);

