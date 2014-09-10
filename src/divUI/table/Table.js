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
 * Constructs a dynamically-updatable table out of div elements.
 * The table is appended to some container div element.
 * 
 * To create a table, first create the DivUI.Table object, then add the Columns 
 * for the table. After the columns have been created, rows can be added, 
 * removed, and updated from the table at any time.
 * @constructor
 */
DivUI.Table = function() {
  DivUI.Container.call(this);
  
  this.getDiv().style.cssText = "border-style:solid; border-width:2; display:table;";
  
  this._header = new DivUI.Container();
  this._header.getDiv().style.cssText = "display:table-row;";
  this.add(this._header);
  
  this._columns = {};
  this._columnIDs = [];
  
  this._rows = [];
  
  this._columnHeaderStyle = "display:table-cell; border:solid; border-width:2; padding-right:10px;";
  this._cellStyle = "display:table-cell; border:solid; border-width:1; padding-right:10px;";
};

DivUI.Table.prototype = {
  
  constructor: DivUI.Table,
  
  isaTable: true,
  
  //////// Columns
  
  /** 
   * Adds a column to the table. 
   * @param {string} id   A unique identifier for the column in this table.
   * @param {string} label  The content used as the label for the column in the header row.
   * @return {DivUI.Table.Column}
   */
  addColumn:function(id, label) {
    var column = new DivUI.Table.Column(id, label);
    column.setStyle(this._columnHeaderStyle);
    
    this._header.add(column);
    
    this._columns[id] = column;
    this._columnIDs.push(id);
    
    var self = this;
    column.getDiv().onclick = function(event) {
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
    row.setStyle(this._cellStyle);
    
    // Append the row.
    this.add(row);
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
    
    // Remove the header temporarily.
    var header = this.removeFirst();
    
    // Prepend the row
    this.addFirst(row);
    this._rows.unshift(row);
    
    // Prepend the header back on.
    this.addFirst(header);
    
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
   * Returns the number of rows present in the table. 
   * @return {uint}
   */
  getRowCount:function() {
    return this._rows.length;
  },
  
  
  /**  
   * Removes all rows from the table.
   * @return {array:DivUI.Table.Row} The list of rows removed from the table.
   */
  removeAllRows:function() {
    var result = this._rows;
    
    this.removeAll();
    this.add(this._header);
    this._rows = [];
    
    return result;
  },
  
  
  
  //////// Sorting
  
  
  /** 
   * Sorts all the rows in the table by their values in some column. 
   */
  sortByColumn:function(columnID) {
    var column = this.getColumn(columnID);
    var sorter = column.getSorter();
    
    if(sorter) {
      var rows = this.removeAllRows();
      rows.sort(sorter);
      
      for(var i in rows) {
        this.add(rows[i]);
      }
      this._rows = rows;

    }
  },
  
  
  
  
  //////// Metrics
  
  
  /** 
   * Returns the total inner width of the header row.
   * @return {uint}
   */
  getHeaderWidth:function() {
    var width = 0;
    for(var id in this._columns) {
      width += this._columns[id].getWidth();
    }
    return width;
  },
  
  
  /** 
   * Returns the inner height of the header row.
   * @return {uint}
   */
  getHeaderHeight:function() {
    var height = 0;
    for(var id in this._columns) {
      var h = this._columns[id].getHeaderHeight();
      if(h > height) {
        height = h;
      }
    }
    return height;
  },
  
  
  
  /** 
   * Resizes the table's columns to fit the contents. 
   */
  resizeToFitContents:function() {
    var totalWidth = this.getHeaderWidth();
    this._header.getDiv().style.width = totalWidth;
    this.getDiv().style.width = totalWidth;
    
    var headerHeight = this.getHeaderHeight();
    this._header.getDiv().style.height = headerHeight;
    this.getDiv().style.height = headerHeight;
  },
  
  
  
  //////// Look & Feel
  
  /** 
   * Returns the CSS style for the table's div element. 
   * @return {string}
   */
  getStyle:function() {
    return this.getDiv().style.cssText;
  },
  
  /** 
   * Sets the CSS style for the table's div element. 
   * @param {string} style
   */
  setStyle:function(style) {
    if(style.search("display:table;") == -1) {
      style = "display:table; " + style;
    }
    this.getDiv().style.cssText = style;
  },
  
  /**
   * Returns the CSS style for the table's header row.
   * @return {string}
   */
  getHeaderStyle:function() {
    return this._columnHeaderStyle;
  },
  
  /** 
   * Sets the CSS style for the table's header row.
   * @param {string} style
   */
  setHeaderStyle:function(style) {
    if(style.search("display:table-cell;") == -1) {
      style = "display:table-cell; " + style;
    }
    for(var id in this._columns) {
      this._columns[id].setStyle(style);
    }
    this._columnHeaderStyle = style;
  },
  
  
  /** 
   * Returns the general CSS style used for the table's cells. 
   * @return {string}
   */
  getCellStyle:function() {
    return this._cellStyle;
  },
  
  
  /** 
   * Sets the CSS style for the table's cells. 
   * All cells will have the display property "table-cell".
   * @param {string} style
   */
  setCellStyle:function(style) {
    if(style.search("display:table-cell;") == -1) {
      style = "display:table-cell; " + style;
    }
	
    for(var i in this._rows) {
      this._rows[i].setStyle(style);
    }
    this._cellStyle = style;
  }
  
};


Util.Inheritance.inherit(DivUI.Table, DivUI.Container);



