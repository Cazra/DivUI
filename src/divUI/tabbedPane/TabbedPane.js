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
 * A container that only displays one of its components at a time, based on 
 * which tab is selected.
 * @param {div element} div   Optional. Wrap the provided div.
 */
DivUI.TabbedPane = function(div) {
  DivUI.Container.call(this, div);
  
  this._tabs = new DivUI.Container();
  this._tabs.getDiv().style.display = "table-row";
  DivUI.Container.prototype.add.call(this, this._tabs);
  
  this._switchPane = new DivUI.SwitchPane();
  var switchDiv = this._switchPane.getDiv();
  switchDiv.style.border = "1px solid";
  switchDiv.style.paddingTop = "1px";
  switchDiv.style.position = "relative";
  DivUI.Container.prototype.add.call(this, this._switchPane);
};

DivUI.TabbedPane.prototype = {

  constructor: DivUI.TabbedPane, 
  
  isaTabbedPane: true, 
  
  
  /** 
   * Selects the tabbed component at the nth index in this container. 
   * @param {uint} n
   */
  setSelectedIndex: function(n) {
    this._switchPane.showIndex(n);
    
    // Unselect all tabs except the nth one - Select that one.
    var tabs = this._tabs.getComponents();
    for(var i in tabs) {
      var tab = tabs[i];
      tab.setSelected(n == i);
    }
  },
  
  /** 
   * Selects the specified tabbed component. 
   * @param {DivUI.Component} comp
   */
  setSelectedComponent: function(comp) {
    var index = this._switchPane.indexOf(comp);
    this.setSelectedIndex(index);
  },
  
  
  //////// Overwritten DivUI.Container methods
  
  /** 
   * Adds a tab for a component. 
   * @param {string | image element} label
   * @param {DivUI.Component} comp
   */
  add: function(label, comp) {
    var self = this;
    
    var tab = new DivUI.TabbedPane.Tab(label);
    tab.getDiv().style.zIndex = this._switchPane.getDiv().style.zIndex + 1;
    this._tabs.add(tab);
    
    this._switchPane.add(comp);
    
    // Set the first tab added to be selected.
    if(this.getComponentCount() == 1) {
      this.setSelectedComponent(comp);
    }
    
    // Tabs become selected when they are clicked.
    tab.getDiv().onclick = function() {
      self.setSelectedComponent(comp);
    };
  },
  

  
  /** 
   * Removes a component and its associated tab. 
   * @param {DivUI.Component || uint} comp   Either the component, or the index 
   *      for a component in this container.
   */
  remove: function(comp) {
    var index;
    if(comp.isaDivUI.Component) {
      index = this.indexOf(comp);
    }
    else {
      index = comp;
    }
    
    this._tabs.remove(index);
    this._switchPane.remove(index);
  },
  
  
  /** 
   * Removes all tabbed components from the container.
   */
  removeAll: function() {
    this._tabs.removeAll();
    this._switchPane.removeAll();
  },
  
  
  
  /** 
   * Returns the index of the specified tabbed component in this container. 
   * @param {DivUI.Component} comp
   * @return {uint}
   */
  indexOf: function(comp) {
    return this._switchPane.indexOf(comp);
  },
  
  
  /** 
   * Returns the nth tabbed component in this container. 
   * @param {uint} n
   * @return {DivUI.Component}
   */
  getComponent: function(n) {
    return this._switchPane.getComponent(n);
  },
  
  
  /** 
   * Returns a list of all the tabbed components in this container. 
   * @return {array:DivUI.Component}
   */
  getComponents: function() {
    return this._switchPane.getComponents();
  },
  
  /** 
   * Returns the number of tabbed components in this container. 
   * @return {uint}
   */
  getComponentCount: function() {
    return this._switchPane.getComponentCount();
  }
};

Util.Inheritance.inherit(DivUI.TabbedPane, DivUI.Container);
