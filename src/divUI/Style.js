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
 * An immutable set of style properties that can be applied to any DOM element  
 * to modify its style, not just div elements. 
 * @param {map: string->string} styleProps   The contents of this map reflect 
 *      the properties of a DOM element's style attribute.
 *      e.g.
 *      {
 *        "border": "5px solid red",
 *        "position": "relative",
 *        "backgroundColor": "grey"
 *      }
 */
DivUI.Style = function(styleProps) {
  this._props = {};
  for(var i in styleProps) {
    this._props[i] = styleProps[i];
  }
};

DivUI.Style.prototype = {
  
  constructor: DivUI.Style, 
  
  isaStyle: true,
  
  /** 
   * Applies this style to some DOM element. Only properties defined in this 
   * DivUI.Style are modified in the element's style.
   * @param {DOM element} elem
   */
  applyTo: function(elem) {
    for(var i in this._props) {
      elem.style[i] = this._props[i];
    }
  },
  
  
  /** 
   * Returns the value of the specified style property. 
   * @param {string} name
   * @return {string}
   */
  getProperty: function(name) {
    return this._props[name];
  },
  
  
  /** 
   * Returns a copy of the style's properties map.
   * @return {map: string->string}
   */
  getProperties: function() {
    var result = {};
    
    for(var i in this._props) {
      result[i] = this._props[i];
    }
    
    return result;
  }
};

