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
 * A column of information for a DivUI.Table.
 * @constructor
 * @param {string} id   A unique identifier for the column in the table.
 * @param {string} label    The content that will be displayed in the header 
 *      row as the label for the column.
 */
DivUI.Table.Column = function(id, label) {
  DivUI.Component.call(this);
  
  this._id = id;
  
  this.setLabelContent(label);
  
  this._sorter = function(a,b) {
    var textA = a.getContents(id);
    var textB = b.getContents(id);
    
    if(textA > textB) {
      return 1;
    }
    else if(textA < textB) {
      return -1;
    }
    else {
      return 0;
    }
  };
};

DivUI.Table.Column.prototype = {
  
  constructor:DivUI.Table.Column,
  
  isaColumn:true,
  
  /** 
   * Returns the column's ID. 
   * @return {string}
   */
  getID:function() {
    return this._id;
  },
  
  
  //////// Header
  
  /** 
   * Returns the HTML content of the column's header. 
   * @return {string}
   */
  getLabelContent:function() {
    return this.getDiv().innerHTML
  },
  
  
  /**
   * Sets the HTML content of the column's header.
   * @param {string} label
   */
  setLabelContent:function(label) {
    this.getDiv().innerHTML = label;
  },
  
  
  /** 
   * Returns the width of the column's header. 
   * @return {uint}
   */
  getWidth:function() {
    return this.getDiv().offsetWidth;
  },
  
  /** 
   * Returns the height of the column's header cell. 
   * @return {uint}
   */
  getHeaderHeight:function() {
    return this.getDiv().offsetHeight;
  },
  
  
  //////// Column sorting
  
  /** 
   * Returns the function used by the table to sort rows by this column.
   * By default, this returns a comparator function that would sort the rows 
   * in increasing alphabetical order by the contents of this column.
   * @return {function(a, b) -> number}   a and b are DivUI.Table.Row objects.
   */
  getSorter:function() {
    return this._sorter;
  },
  
  
  /** 
   * Sets the function used by the table to sort rows by this column.
   */
  setSorter:function(sorter) {
    this._sorter = sorter;
  },
  
  
  //////// Look & Feel
  
  /** 
   * Returns the CSS style for the column's div element for the table's 
   * header row. 
   * @return {string}
   */
  getStyle:function() {
    return this.getDiv().style.cssText;
  },
  
  
  /** 
   * Sets the CSS style for the column's div element for the table's header row.
   * @param {string} style
   */
  setStyle:function(style) {
    if(style.search("display:table-cell;") == -1) {
      style = "display:table-cell; " + style;
    }
    this.getDiv().style.cssText = style;
  }
  
};

Util.Inheritance.inherit(DivUI.Table.Column, DivUI.Component);

