
/** 
 * Produces a table of option inputs. Each option can be enabled or disabled
 * with a checkbox and they can optionally have a set of parameters for
 * string input. The json objects in options have the following format:
 * {
 *    name: {string} the name of the option,
 *    description: {string} the description of the option,
 *    params: {string} A comma-delimited list of option parameters,
 *    param_description: {string} A comma-delimited list of descriptions for the params,
 * }
 * @constructor
 * @param {div element} container
 * @param {array:object} options
 */
DivUI.OptionsTable = function(container, options) {
  this._container = container;
  
  this._tableDiv = document.createElement("div");
  this._tableDiv.style.cssText = "border:solid; border-width:1px; border-color:#BBAA88;";
  this._container.appendChild(this._tableDiv);
  
  this._options = {};
  
  for(var i in options) {
    var option = options[i];
    console.log(option);
    
    this.addOption(option);
  }
  
  console.log(this._options);
};

DivUI.OptionsTable.prototype = {

  constructor: DivUI.OptionsTable,
  
  
  /** 
   * Adds an option into the view. 
   * @param {object} option
   */
  addOption:function(option) {
    var row = document.createElement("div");
    row.style.cssText = "display:table-row;";
    this._tableDiv.appendChild(row);
    
    var cell = undefined;
    
    // checkbox cell
    cell = document.createElement("div");
    cell.style.cssText = "display:table-cell; padding-right:10px;"
    row.appendChild(cell);
    
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = false;
    checkbox.value = option.description;
    cell.appendChild(checkbox);
    
    // name cell
    var namecell = cell = document.createElement("div");
    cell.style.cssText = "display:table-cell; padding-right:10px;"
    cell.innerHTML = "<b>" + option.name + "</b>";
    row.appendChild(cell);
    
    // description cell
    cell = document.createElement("div");
    cell.style.cssText = "display:table-cell; padding-right:20px;"
    cell.innerHTML = option.description;
    row.appendChild(cell);
    
    this._options[option.name] = {"checkbox":checkbox, "params":{}};
    
    // Create the hidden div containing the parameters.
    var paramsDiv = this._createParamsDiv(option);
    this._tableDiv.appendChild(paramsDiv);
    checkbox.onchange = function(event) {
      
      if(checkbox.checked) {
        paramsDiv.style.display = "table";
      }
      else {
        paramsDiv.style.display = "none";
      }
    };
  },
  
  /** 
   * Creates a div for an option's parameters that becomes visible when 
   * the option is checked.
   * @param {object} option
   * @return {div element} The parameters div for the option.
   */
  _createParamsDiv:function(option) {
    var result = document.createElement("div");
    result.style.display = "none";
    result.style.paddingLeft = "40px";
    
    if(option.params) {
      var pTokens = option.params.split(",");
      var pDescTokens = option.param_description.split(",");
      
      for(var i in pTokens) {
        var param = pTokens[i];
        var paramDesc = pDescTokens[i];
        
        var paramDiv = document.createElement("div");
        paramDiv.style.display = "table-row";
        result.appendChild(paramDiv);
        
        var cell = undefined;
        
        // label cell
        cell = document.createElement("div");
        cell.style.display = "table-cell";
        paramDiv.appendChild(cell);
        
        cell.innerHTML = param;
        
        // input field cell
        cell = document.createElement("div");
        cell.style.display = "table-cell";
        cell.style.paddingLeft = "20px";
        paramDiv.appendChild(cell);
        
        var paramInput = document.createElement("input");
        paramInput.placeholder = paramDesc;
        paramInput.style.width = (paramDesc.length + 1)*7 + "px";
        cell.appendChild(paramInput);
        
        
        this._options[option.name]["params"][param] = paramInput;
      }
    }
    
    return result;
  },
  
  
  /** 
   * Returns the list of ids for the options in the view. 
   * @return {array:string}
   */
  getOptionIDs:function() {
    var result = [];
    for(var i in this._options) {
      result.push(i);
    }
    return result;
  },
  
  
  /** 
   * Returns true if the option with the specified name is checked. 
   * @param {string} id   The id for the option.
   * @return {boolean}
   */
  isChecked:function(id) {
    if(this._options[id]) {
      return this._options[id]["checkbox"].checked;
    }
    else {
      console.log("Option " + id + " doesn't exist.");
      return false;
    }
  },
  
  
  /** 
   * Checks or unchecks an option.
   * @param {string} id   The option's ID.
   * @param {boolean} checked   Whether the option is being checked.
   */
  setChecked:function(id, checked) {
    if(this._options[id]) {
      this._options[id]["checkbox"].checked = checked;
    }
    else {
      console.log("Option " + id + " doesn't exist.");
    }
  },
  
  
  /** 
   * Returns a list of the IDs for an option's parameters. 
   * @return {array:string}
   */
  getParameterIDs:function(optionID) {
    var option = this._options[optionID];
    
    if(option) {
      var result = [];
      for(var i in option["params"]) {
        result.push(i);
      }
      return result;
    }
    else {
      console.log("Option " + id + " doesn't exist.");
      return [];
    }
  },  
  
  
  /** 
   * Returns the value provided for an option parameter. 
   * @param {string} id   The option's id.
   * @param {string} param    The parameter's id.
   * @return {string}
   */
  getParamValue:function(id, param) {
    var option = this._options[id];
    if(option) {
      if(option.params[param]) {
        return option.params[param].value;
      }
      else {
        console.log("Parameter " + param + " doesn't exist for option " + id + ".");
        return "";
      }
    }
    else {
      console.log("Option " + id + " doesn't exist.");
      return "";
    }
  },
  
  
  /**  
   * Sets the value for some option parameter.
   * @param {string} id   The option's ID.
   * @param {string} param  The parameter's ID.
   * @param {string} value  The new value for the parameter.
   */
  setParamValue:function(id, param, value) {
    var option = this._options[id];
    if(option) {
      if(option.params[param]) {
        option.params[param].value = value;
      }
      else {
        console.log("Parameter " + param + " doesn't exist for option " + id + ".");
      }
    }
    else {
      console.log("Option " + id + " doesn't exist.");
    }
  },
  
  
  /** 
   * Produces a JSON object representing the new settings for the options. 
   * @return {object}
   */
  toJSON:function() {
    var result = {};
    
    var opIDs = this.getOptionIDs();
    for(var i in opIDs) {
      var opID = opIDs[i];
      console.log(opID);
      
      result[opID] = {};
      
      result[opID]["checked"] = this.isChecked(opID);
      result[opID]["params"] = {};
      
      var paramIDs = this.getParameterIDs(opID);
      for(var j in paramIDs) {
        var paramID = paramIDs[j];
        result[opID]["params"][paramID] = this.getParamValue(opID, paramID);
      }
    }
    
    return result;
  }
};


DivUI.OptionsTable.makeMockupOptions = function() {
  
  return [
    {
      name: "somebody set us up the bomb",
      description: "We get signal. Main screen turn on.",
      params: "timer,width,height",
      param_description: "Bomb's countdown,width of main screen,height of main screen"
    },
    {
      name: "take off every zig",
      description: "for great justice",
      params: "zigs,justice",
      param_description: "# of zigs moved, amount of justice used"
    },
    {
      name: "all your base are belong to us",
      description: "you have no chance to survive make your time",
      params: "time,bases",
      param_description: "amount of time,# bases belonging to us"
    }
  ];
};



