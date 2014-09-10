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
 * A DivUI.Component for a tab in a DivUI.TabbedView. 
 * A tab has two styles: slected and unselected.
 */
DivUI.TabbedPane.Tab = function(label) {
  DivUI.Component.call(this);
  var div = this.getDiv();
  
  var tab;
  if(label.style) {
    this.getDiv().appendChild(label);
  }
  else {
    this.getDiv().innerHTML = label;
  }
  
  // Set the default styling properties.
  this._stylePropsBase = new DivUI.Style({
    "float": "left",
    "paddingRight": "10px",
    "paddingLeft": "5px",
    "borderTop": "1px solid",
    "borderLeft": "1px solid",
    "borderRight": "1px solid",
    "borderTopLeftRadius": "5px",
    "borderTopRightRadius": "5px",
    "cursor": "pointer"
  });
  
  this._stylePropsSelected = new DivUI.Style({
    "backgroundColor": "white",
    "position":"relative",
    "top": "1px"
  });
  
  this._stylePropsUnselected = new DivUI.Style({
    "backgroundColor": "lightgrey",
    "paddingBottom": "1px",
    "position": "static",
    "top": "0px"
  });
  
  this._styleClassBase = undefined;
  this._styleClassSelected = undefined;
  this._styleClassUnselected = undefined;
  
  
  this.setSelected(false);
};

DivUI.TabbedPane.Tab.prototype = {
  constructor: DivUI.TabbedPane.Tab,
  
  isaTab: true,
  
  
  /** 
   * Returns whether this tab is selected. 
   * @return {boolean}
   */
  isSelected: function() {
    return this._selected;
  },
  
  
  /** 
   * Sets whether this tab is selected, changing its style class accordingly. 
   * @param {boolean} selected
   */
  setSelected: function(selected) {
    this._selected = selected;
    
    var div = this.getDiv();
    if(this._stylePropsBase) {
      this._stylePropsBase.applyTo(div);
      
      if(selected) {
        this._stylePropsSelected.applyTo(div);
      }
      else {
        this._stylePropsUnselected.applyTo(div);
      }
    }
    else {
      if(selected) {
        div.className = this._styleClassBase + " " + this._styleClassSelected;
      }
      else {
        div.className = this._styleClassBase + " " + this._styleClassUnselected;
      }
    }
  },
  
  
  /** 
   * Sets the tab's base style properties.
   * @param {DivUI.Style} style
   */
  setBaseStyle: function(style) {
    this._stylePropsBase = style;
  },
  
  /** 
   * Sets the tab's selected style properties.
   * @param {DivUI.Style} style
   */
  setSelectedStyle: function(style) {
    this._stylePropsSelected = style;
  },
  
  /** 
   * Sets the tab's unselected style properties.
   * @param {DivUI.Style} style
   */
  setUnselectedStyle: function(style) {
    this._stylePropsUnselected = style;
  },
  
  /** 
   * Sets the tab to get its styles from style classes defined in some style 
   * sheet, instead of from its DivUI.Styles.
   * @param {string} base   The class name for styling on all tabs.
   * @param {string} selected   The class name for styling only on selected tabs.
   * @param {string} unselected   The class name for styling only on unselected tabs.
   */
  setStyleClasses: function(base, selected, unselected) {
    this._styleClassBase = base;
    this._styleClassSelected = selected;
    this._styleClassUnselected = unselected;
    
    this._stylePropsBase = undefined;
    this._stylePropsSelected = undefined;
    this._stylePropsUnselected = undefined;
  }
  
};

Util.Inheritance.inherit(DivUI.TabbedPane.Tab, DivUI.Component);
