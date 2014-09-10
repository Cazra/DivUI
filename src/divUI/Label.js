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
 * A component for containing text.
 * @constructor
 * @param {string} text
 * @param {string} alignment  Either "left", "center", or "right".
 */
DivUI.Label = function(text, alignment) {
  DivUI.Component.call(this);
  
  if(!alignment) {
    alignment = "left";
  }
  
  this.setText(text);
  this.setAlignment(alignment);
};

DivUI.Label.prototype = {
  
  constructor: DivUI.Label,
  
  isaLabel: true,
  
  
  /** 
   * Returns the text contained by this component. 
   * @return {string}
   */
  getText: function() {
    return this.getDiv().innerHTML;
  },
  
  
  /**
   * Sets the text contained by this component.
   * @param {string} text
   */
  setText: function(text) {
    this.getDiv().innerHTML = text;
  },
  
  
  /**  
   * Returns the alignment of the text.
   * @return {string}
   */
  getAlignment: function() {
    return this.getDiv().style.textAlign;
  },
  
  
  /** 
   * Sets the alignment of the text. 
   * @param {string} alignment  Either "left", "center", or "right".
   */
  setAlignment: function(alignment) {
    if(alignment == "left" || alignment == "center" || alignment == "right") {
      this.getDiv().style.textAlign = alignment;
    }
    else {
      throw Error(alignment + " is not a valid alignment value.");
    }
  }
  
};

Util.Inheritance.inherit(DivUI.Label, DivUI.Component);


