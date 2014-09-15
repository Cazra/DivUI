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
  var th = document.createElement("th");
  DivUI.Component.call(this, th);
  
  this._id = id;
  
  this.header(label);
  this.sorter(function(a,b) {
    var textA = a.getValue(id);
    var textB = b.getValue(id);
    
    if(textA > textB) {
      return 1;
    }
    else if(textA < textB) {
      return -1;
    }
    else {
      return 0;
    }
  });
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
  
  /** 
   * Gets the TH element of the column's header. 
   * @return {th element}
   */
  getTH: function() {
    return this.getDiv();
  },
  
  //////// Header
  
  /** 
   * Setter/getter for the content of the column's header. 
   * @param {string} content
   * @return {string}
   */
  header: function(content) {
    if(content !== undefined) {
      this.getTH().innerHTML = content;
    }
    return this.getTH().innerHTML;
  },
  
  
  //////// Column sorting
  
  /** 
   * Setter/getter for the column's sorting comparison function. 
   * By default, the column contents will be sorted in alphabetical order
   * of its cells HTML content. The sorting comparison function is of the form
   * {function(a: DivUI.Table.Row, b: DivUI.Table.Row) : number}
   * @param {function} func
   * @return {function}
   */
  sorter: function(func) {
    if(func !== undefined) {
      this._sorter = func;
    }
    return this._sorter;
  }
  
};

Util.Inheritance.inherit(DivUI.Table.Column, DivUI.Component);

