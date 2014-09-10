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
 * A row in a DivUI.Table. 
 * The contents of the row can be changed after it has been created, 
 * and it is even possible for them to be dynamically updated if 
 * they are subscribed to some object that updates its status.
 * @constructor
 * @param {array:string} columnIDs
 * @param {Object} contentsJSON
 */
DivUI.Table.Row = function(columnIDs, contentsJSON) {
  DivUI.Component.call(this);
  var div = this.getDiv();
  
  div.style.cssText = "display:table-row;";
  
  this._columnIDs = columnIDs;
  this._cells = {};
  
  for(var i in columnIDs) {
    var id = columnIDs[i];
    
    var cell = document.createElement("div");
    this._cells[id] = cell;
    div.appendChild(cell);
  }
  
  this.update(contentsJSON);
};


DivUI.Table.Row.prototype = {
  
  constructor:DivUI.Table.Row, 
  
  isaRow: true,
  
  /** 
   * Does any clean-up when the row is removed. This may involve 
   * unsubscribing the row from any event publishers it may be listening to.
   * Override this.
   */
  clean:function() {},
  
  
  getCellDiv:function(columnID) {
    return this._cells[columnID];
  },
  
  
  
  //////// Model data access
  
  /** 
   * Returns the underlying model this row's data is based upon. 
   * @return {object}
   */
  getModel:function() {
    return this._model;
  },
  
  
  /** 
   * Sets the underlying model this row's data is based upon. 
   * @param {object} model
   */
  setModel:function(model) {
    this._model = model;
  },
  
  
  //////// Cell contents
  
  /** 
   * Updates the contents of the row's cells. 
   * @param {Object} contents   A map of column IDs to their new cell contents.
   */
  update:function(contents) {
    for(var columnID in contents) {
      var content = contents[columnID];
      this.updateCell(columnID, content);
    }
  },
  
  
  /** 
   * Updates the content of an individual cell.
   * @param {string} columnID
   * @param {string | HTML element} content
   */
  updateCell: function(columnID, content) {
    var cell = this.getCellDiv(columnID);
    
    // If the content is some HTML element, clear the cell and append the 
    // content to the cell. Otherwise, just  set the content as the cell's 
    // innerHTML text.
    if(content !== undefined && content.style) {
      while(cell.firstChild) {
        cell.removeChild(cell.firstChild);
      }
      
      cell.appendChild(content);
    }
    else {
      cell.innerHTML = content;
    }
  },
  
  
  /** 
   * Returns the contents of a particular cell. 
   * @param {string} columnID
   * @return {string}
   */
  getContents:function(columnID) {
    return this.getCellDiv(columnID).innerHTML;
  },
  
  
  //////// Metrics
  
  
  /** 
   * Returns the width of a cell in the row. 
   */
  getCellWidth:function(columnID) {
    return this._cells[columnID].offsetWidth;
  },
  
  /** 
   * Returns the height of a cell in the row. 
   */
  getCellHeight:function(columnID) {
    return this._cells[columnID].offsetHeight;
  },
  
  
  /** Returns the total width of the row. */
  getWidth:function() {
    var width = 0;
    for(var i in this._columnIDs) {
      width += this.getCellWidth(i);
    }
    return width;
  },
  
  /** 
   * Returns the total height of the row.
   */
  getHeight:function() {
    var height = 0;
    for(var i in this._columnIDs) {
      height += this.getCellHeight(i);
    }
    return height;
  },
  
  
  
  //////// CSS style
  
  /** 
   * Returns the style used for the cells of this row. 
   * @return {string}
   */
  getStyle:function() {
    return this._cellsStyle;
  },
  
  
  /** 
   * Sets the style for the cells of this row. 
   * @param {string}
   */
  setStyle:function(style) {
    if(style.search("display:table-cell;") == -1) {
      style = "display:table-cell; " + style;
    }
    this._cellsStyle = style;
    
    for(var i in this._cells) {
      this._cells[i].style.cssText = style;
    }
  }
};


Util.Inheritance.inherit(DivUI.Table.Row, DivUI.Component);

