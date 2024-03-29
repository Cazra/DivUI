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



Util.DOM = {
  
  /** 
   * Gets the absolute position of a DOM element in the document. 
   * @param {DOM element}
   * @return {length-2 array} The XY coordinates.
   */
  getAbsolutePosition: function(element) {
    // get the absolute position of the canvas element in the document.
    var obj = element;
    var offX = 0;
    var offY = 0;
    while( obj.nodeName != "BODY") {
      offX += obj.offsetLeft;
      offY += obj.offsetTop;
      
      obj = obj.parentNode;
    }
    
    return [offX, offY];
  },
  
  
  /** Returns the string for a DOM script element's text content. */
  extractScriptText:function(scriptID) {
    var shaderScript = document.getElementById(scriptID);
    if(!shaderScript) {
      throw new Error("Script ID " + scriptID + " doesn't exist in the document.");
    }
    
    // Extract the shader source code from the DOM script element.
    var str = "";
    var k = shaderScript.firstChild;
    console.log(shaderScript);
    while(k) {
      if(k.nodeType == Node.TEXT_NODE) {
        str += k.textContent;
      }
      k = k.nextSibling;
    }
    
    return str;
  },
  
  
  /** 
   * Shortcut for creating and appending a new element to an existing element.
   * @param {element} parent
   * @param {string}  childType
   * @param {element} The new child element.
   */
  appendNew: function(parent, childType) {
    var child = document.createElement(childType);
    parent.appendChild(child);
    return child;
  }
};