function manage_bool_in_SAP(field) {
    return  `CASE
            WHEN ${field} = 'X' then True ELSE False END
     `
}

/**
 * Returns SQL expression to remove leading zero from string containing only numbers 
 * 
 *  @param {column} String - Column:
 *  @returns {string} -> SQL expression to remove leading zeros
 */
function removeLeadingZeros(column) {
    return `
        CASE
             WHEN SAFE_CAST(${column} AS INT64) IS NOT NULL THEN
                    LTRIM(${column},"0") 
             ELSE ${column} END
    `
}

/*list of functions used to automatically generate queries from config*/

/**
 * Convert List of columns name to string with comma and new line separator
 * 
 *  @param {Object} columns -> JS Object with column_name, 
 *  @returns {String} -> String with column names separated by comma and new line
 */
function generateInsertColumnsString(columns) {
    return columns.map(ctx => ctx.column_name).join(",\n\t\t");
}



/**
 * Convert List of columns name to string with comma and new line separator along with the alias
 * 
 *  @param {Object} columns -> JS Object with column_name, 
 *  @returns {String} -> String with column names separated by comma and new line
 */
function generateInsertColumnsStringWithAlias(columns) {

    return columns.map(ctx => {
      if (ctx.hasOwnProperty("alias")) {
        // Use the alias for the column name
        return `${ctx.column_name} AS ${ctx.alias}`;
      } else {
        // Use the column name as is
        return ctx.column_name;
      }
    }).join(",\n\t\t");
  }

/**
 * Creates an object with column name as key and colum_description as value
 * 
 *  @param {columns_object} Object - Javascript object with below keys:
 *     -- columns_object.column_name  -> Name of the column
 *     -- columns_object.description  -> Description of the column
 *  @returns {object} -> Object with keys as column_name and value as description
 */
function getColumnDescriptionObject(columns_object) {
    const columns_key_value = {}
    columns_object.forEach(el => {
        columns_key_value[el.column_name + ""] = el.description !== null ? el.description : ""
    });
    return columns_key_value;
}

/**
 * Converts a list of columns into a string with comma separated column names
 *   @param {colummns_list} - List of columns
 *   @returns {string} - 'Comma separated column names"
 */
function convertColumnsListToString(columns_list) {
    return columns_list.join(", ")
}

/**
 * Converts the input schema into an object with column names as keys and descriptions as values.
 * @param {Array<Object>} inputSchema - An array representing the input schema with column details.
 * @returns {Object} - An object with column names as keys and descriptions as values.
 */

function generateColumns(inputSchema) {
    return inputSchema.reduce((outputObject, column) => {
        outputObject[column.name] = column.description;
      return outputObject;
    }, {});
}


module.exports = {
    manage_bool_in_SAP,
    removeLeadingZeros,
    generateColumns,
    convertColumnsListToString,
    getColumnDescriptionObject,
    generateInsertColumnsString,
    generateInsertColumnsStringWithAlias
    }