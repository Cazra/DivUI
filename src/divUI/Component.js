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
 * Superclass for components in a div-based web UI.
 * @param {div element} div   Optional. The Component will be a wrapper for 
 *      the provided div element.
 */
DivUI.Component = function(div) {
  if(div) {
    this._div = div;
  }
  else {
    this._div = document.createElement("div");
  }
  
  this._oldStyleDisplay = this._div.style.display;
  this._parent = undefined;
};

DivUI.Component.prototype = {
  
  constructor: DivUI.Component,
  
  isaComponent: true,
  
  
  /** 
   * Returns the div element wrapped by this component.
   * @return {div element}
   */
  getDiv: function() {
    return this._div;
  },
  
  
  /** 
   * Returns the DivUI.Container containing this component.
   * @return {DivUI.Container}
   */
  getParent: function() {
    return this._parent;
  },
  
  
  /** 
   * Sets whether this component is visible or hidden. 
   * @param {boolean} visible
   */
  setVisible: function(visible) {
    if(visible) {
      this._div.style.visibility = "visible";
      
      if(this._oldStyleDisplay !== "none") {
        this._div.style.display = this._oldStyleDisplay;
      }
      else {
        this._div.style.display = "inline";
      }
    }
    else {
      this._div.style.visibility = "hidden";
      
      if(this._oldStyleDisplay !== "none") {
        this._oldStyleDisplay = this._div.style.display;
      }
      this._div.style.display = "none";
    }
  },
  
  
  /** 
   * Returns whether this component is visible. 
   * @return {boolean}
   */
  isVisible: function() {
    return (this._div.style.visibility == "visible");
  }
  
};


