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
 * Constructs a dynamically-updatable table element.
 * 
 * To create a table, first create the DivUI.Table object, then add the Columns 
 * for the table. After the columns have been created, rows can be added, 
 * removed, and updated from the table at any time.
 * @constructor
 */
DivUI.Table = function() {
  var table = document.createElement("table");
  DivUI.Component.call(this, table);
  
  this._header = Util.DOM.appendNew(Util.DOM.appendNew(table, "thead"), "tr");
  this._body = Util.DOM.appendNew(table, "tbody");
  
  this._columns = {};
  this._columnIDs = [];
  this._rows = [];
};

DivUI.Table.prototype = {
  
  constructor: DivUI.Table,
  
  isaTable: true,
  
  
  getTable: function() {
    return this.getDiv();
  },
  
  
  getBody: function() {
    return this._body;
  },
  
  
  getHeader: function() {
    return this._header;
  },
  
  //////// Columns
  
  /** 
   * Adds a column to the table. 
   * @param {string} id   A unique identifier for the column in this table.
   * @param {string} label  The content used as the label for the column in the header row.
   * @return {DivUI.Table.Column}
   */
  addColumn:function(id, label) {
    var column = new DivUI.Table.Column(id, label);
    this._header.appendChild(column.getTH());
    
    this._columns[id] = column;
    this._columnIDs.push(id);
    
    var self = this;
    column.getTH().onclick = function(event) {
      self.sortByColumn(column.getID());
      event.stopPropagation();
    };
    
    return column;
  },
  
  
  /** 
   * Returns the column in this table with the specified ID.
   * @param {string} id
   * @return {DivUI.Table.Column}
   */
  getColumn:function(id) {
    return this._columns[id];
  },
  
  
  /** 
   * Returns the IDs for the table's columns, in the order that they appear 
   * from left to right. 
   * @return {array:string}
   */
  getColumnIDs:function() {
    return this._columnIDs;
  },
  
  
  /**
   * Returns the number of columns present in the table. 
   * @return {uint}
   */ 
  getColumnCount:function() {
    return this._columnIDs.length;
  },
  
  
  //////// Rows
  
  /** 
   * Adds a row to the end of the table. 
   * @param {Object} contentsJSON   A json object that maps columnIDs for their
   *      corresponding values for this row.
   */
  addRow:function(contentsJSON) {
    var row = new DivUI.Table.Row(this._columnIDs, contentsJSON);
    
    // Append the row.
    this._body.appendChild(row.getDiv());
    this._rows.push(row);

    return row;
  },
  
  /** 
   * Adds a row to the beginning of the table. 
   * @param {Object} contentsJSON   A json object that maps columnIDs for their
   *      corresponding values for this row.
   */
  addRowFirst: function(contentsJSON) {
    var row = new DivUI.Table.Row(this._columnIDs, contentsJSON);
    row.setStyle(this._cellStyle);
    
    // Prepend the row
    this._body.insertBefore(row.getDiv());
    this._rows.unshift(row);
    
    return row;
  },
  
  
  /** 
   * Returns the nth row in the table. 
   * @param {uint} n
   * @return {DivUI.Table.Row}
   */
  getRow:function(n) {
    return this._rows[n];
  },
  
  
  /** 
   * Returns a list of all the rows in the table. 
   * @return {array: DivUI.Table.Row}
   */
  getRows: function() {
    var result = [];
    
    for(var i=0; i < this._rows.length; i++) {
      result.push(this._rows[i]);
    }
    
    return result;
  },
  
  
  /** 
   * Returns the index of a row in this table, or -1 if it isn't found. 
   * @param {DivUI.Table.Row}
   * @return {int}
   */
  indexOfRow: function(row) {
    return this._rows.indexOf(row);
  },
  
  
  /** 
   * Returns the number of rows present in the table. 
   * @return {uint}
   */
  getRowCount:function() {
    return this._rows.length;
  },
  
  
  /** 
   * Removes the nth row from the table.
   * @param {uint} n
   * @return {DivUI.Table.Row}
   */
  removeRow: function(n) {
    var row = this._rows[n];
    this._body.removeChild(row.getTR());
    this._rows.splice(n, 1);
  },
  
  
  /**  
   * Removes all rows from the table.
   * @return {array:DivUI.Table.Row} The list of rows removed from the table.
   */
  removeAllRows:function() {
    var result = this.getRows();
    
    while(this.getRowCount() > 0) {
      this.removeRow(0);
    }
    
    return result;
  },
  
  
  
  //////// Sorting
  
  
  /** 
   * Sorts all the rows in the table by their values in some column. 
   * @param {string} columnID
   */
  sortByColumn:function(columnID) {
    var column = this.getColumn(columnID);
    var sorter = column.sorter();
    
    if(sorter) {
      var rows = this.getRows();
      rows.sort(sorter);
      
      this._body.innerHTML = "";
      for(var i=0; i<rows.length; i++) {
        this._body.appendChild(rows[i].getTR());
      }
      this._rows = rows;
    }
  }
};


Util.Inheritance.inherit(DivUI.Table, DivUI.Component);



