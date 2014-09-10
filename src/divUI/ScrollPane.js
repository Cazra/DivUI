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
 * A container with scrollbars.
 * @param {DivUI.Component} contents   The contents of the DivUI.Scrolling area.
 * @param {enum: DivUI.Scrolling} vScroll   Whether vertical DivUI.Scrolling is enabled.
 * @param {enum: DivUI.Scrolling} hScroll   Whether horizontal DivUI.Scrolling is enabled.
 * @param {div element} div   Optional. Wrap the provided div.
 */
DivUI.ScrollPane = function(contents, vScroll, hScroll, div) {
  DivUI.Container.call(this, div);
  div = this.getDiv();
  
  // Set up vertical DivUI.Scrolling based on our policy.
  this._vScroll = vScroll;
  if(vScroll == DivUI.Scrolling.AUTO) {
    div.style.overflowY = "auto";
  }
  else if(vScroll == DivUI.Scrolling.ALWAYS) {
    div.style.overflowY = "scroll";
  }
  else {
    div.style.overflowY = "hidden";
  }
  
  // Set up horizontal DivUI.Scrolling based on our policy.
  this._hScroll = hScroll;
  if(hScroll == DivUI.Scrolling.AUTO) {
    div.style.overflowX = "auto";
  }
  else if(hScroll == DivUI.Scrolling.ALWAYS) {
    div.style.overflowX = "scroll";
  }
  else {
    div.style.overflowX = undefined;
  }
  
  this.add(contents);
  this._contents = contents;
};


DivUI.ScrollPane.prototype = {
  
  constructor: DivUI.ScrollPane,
  
  isaScrollPane: true,
  
  
  /** 
   * Returns the contents of this scrollpane. 
   * @return {DivUI.Component}
   */
  getContents: function() {
    return this._contents;
  },
  
  
  /** 
   * Returns the horizontal DivUI.Scrolling policy for this container. 
   * @return {enum: DivUI.Scrolling}
   */
  getHScrollPolicy:function() {
    return this._hScroll;
  },
  
  
  /** 
   * Returns the vertical DivUI.Scrolling policy for this container. 
   * @return {enum: DivUI.Scrolling}
   */
  getVScrollPolicy:function() {
    return this._vScroll;
  }
  
};

Util.Inheritance.inherit(DivUI.ScrollPane, DivUI.Container);
