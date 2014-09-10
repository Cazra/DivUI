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
 * A container that only shows one of its components at a time. 
 * @param {div element} div   Optional. Wrap the provided div.
 */
DivUI.SwitchPane = function(div) {
  DivUI.Container.call(this, div);
};

DivUI.SwitchPane.prototype = {
  
  constructor: DivUI.SwitchPane,
  
  isaSwitchPane: true,
  
  
  /** 
   * Sets the specified component in this container to be displayed. 
   * All other components in this container become hidden. 
   * @param {DivUI.Component} comp
   */
  showComponent: function(comp) {
    var index = this.getComponents().indexOf(comp);
    this.showIndex(index);
  },
  
  
  /** 
   * Sets the nth component in this container to be displayed. 
   * All other components in this container become hidden.
   * @param {uint} n
   */
  showIndex: function(n) {
    var showedComp = this.getComponent(n);
    
    for(var i = 0; i < this.getComponentCount(); i++) {
      var comp = this.getComponent(i);
      comp.setVisible(comp === showedComp);
    }
  },
  
  
  //////// Overwritten DivUI.Container methods
  
  add: function(comp) {
    DivUI.Container.prototype.add.call(this, comp);
    if(this.getComponentCount() > 1) {
      comp.setVisible(false);
    }
  }
  
  
};

Util.Inheritance.inherit(DivUI.SwitchPane, DivUI.Container);

