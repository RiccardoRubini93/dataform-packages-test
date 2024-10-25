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

/**
 * Applies a retention policy to a given timestamp field.
 * 
 * @param {string} target_field - The timestamp field to apply the retention policy to.
 * @param {number} retention - The number of years to retain the data.
 * @returns {string} - SQL expression to enforce retention policy by comparing the field with the current date.
 */
function applyPolicyRetention(target_field, retention) {
    return `
    TIMESTAMP(${target_field}) > TIMESTAMP(DATE_SUB(CURRENT_DATE(), INTERVAL ${retention} YEAR))
  `;
}

/**
 * Applies a time filter to a specified field within a time interval.
 * 
 * @param {string} target_field - The field to filter based on time.
 * @param {number} delta - The interval (in days) to filter records by.
 * @returns {string} - SQL expression to filter records based on the time range from the current date.
 */
function applyTimeFilter(target_field, delta) {
    return `
    ${target_field} BETWEEN CURRENT_DATE()-${delta} AND CURRENT_DATE()
  `;
}

/**
 * Builds a SQL UNION query to combine multiple tables from the same schema.
 * 
 * @param {string} db - The database name.
 * @param {string} schema - The schema name.
 * @param {Array<string>} tables - A list of table names to include in the UNION.
 * @param {Array<string>} fields_select - A list of fields to select from each table.
 * @param {string} time_filter_col - The column used for filtering records based on time.
 * @param {number} time_interval - The time interval (in days) used for filtering.
 * @returns {string} - SQL UNION query combining the selected tables with optional time filters.
 */
function buildUnionQuery(db, schema, tables, fields_select, time_filter_col, time_interval) {
    // Initialize an empty array to hold the individual SELECT statements
    let selectStatements = [];
    let fieldsToSelect = fields_select.join(", ");
    // Loop through the table names and build each SELECT statement
    for (let i = 0; i < tables.length; i++) {
        let table = tables[i];
        let selectStatement = `SELECT ${fieldsToSelect} FROM ${db}.${schema}.${table} WHERE `;

        // Apply the time filter if timeColumn, startTime, and endTime are provided
        if (time_filter_col && time_interval) {
            selectStatement += `${applyTimeFilter(time_filter_col,time_interval)}`;
        }

        selectStatements.push(selectStatement);

    }

    // Join all SELECT statements with UNION ALL
    let unionQuery = selectStatements.join(" UNION ALL\n");

    return unionQuery;
}

/**
 * Generates a SQL CASE statement to categorize age into intervals.
 * 
 * @param {string} age_field - The field representing age.
 * @param {Array<number>} intervals - An array of age intervals.
 * @returns {string} - SQL CASE statement categorizing the age field into the provided intervals.
 */
function generateAgeCaseStatement(age_field, intervals) {
    let sqlCaseStatement = "CASE\n";

    for (let i = 0; i < intervals.length - 1; i++) {
        const minAge = intervals[i];
        const maxAge = intervals[i + 1] - 1;
        sqlCaseStatement += `  WHEN ${age_field} BETWEEN ${minAge} AND ${maxAge} THEN '[${minAge}-${maxAge}]'\n`;
    }

    // For the last interval 
    const lastMinAge = intervals[intervals.length - 1];
    sqlCaseStatement += `  ELSE '[${lastMinAge}+]'`;

    sqlCaseStatement += "\nEND";
    return sqlCaseStatement;
}

/**
 * Generates a SQL CASE statement to categorize client tenure in years.
 * 
 * @param {string} subr_date - The field representing the subscription start date.
 * @param {Array<number>} intervals - An array of tenure intervals (in years).
 * @returns {string} - SQL CASE statement categorizing the client tenure into the provided intervals.
 */
function getClientTenure(subr_date, intervals) {

    let sqlCaseStatement = "CASE\n";

    for (let i = 0; i < intervals.length - 1; i++) {
        const min = intervals[i];
        const max = intervals[i + 1] - 1;
        sqlCaseStatement += `  WHEN DATE_DIFF(CURRENT_DATE(),${subr_date},YEAR) = ${max} THEN '${intervals[i]}'\n`;
    }

    // For the last interval 
    const last = intervals[intervals.length - 1];
    sqlCaseStatement += `  ELSE '${last}+'`;

    sqlCaseStatement += "\nEND";
    return sqlCaseStatement;

}

/**
 * Generates a SQL CASE statement to map a field to a platform based on a predefined list.
 * 
 * @param {string} field - The field to be mapped.
 * @param {Array<Object>} mappingList - A list of objects containing platform mappings.
 *   Each object should have a 'list' of possible values and a 'value' representing the platform.
 * @returns {string} - SQL CASE statement mapping the field to the platform values.
 */
function getPlatformMapping(field, mappingList) {
    let sqlCaseStatement = "CASE\n";

    // Loop through each mapping object
    for (let i = 0; i < mappingList.length; i++) {
        const {
            list,
            value
        } = mappingList[i];
        const values = list.map(item => `'${item}'`).join(', '); // Convert the list to SQL format
        sqlCaseStatement += `  WHEN ${field} IN (${values}) THEN '${value}'\n`;
    }

    // Default ELSE case
    sqlCaseStatement += "  ELSE 'not_specified'\n";

    sqlCaseStatement += "END";

    return sqlCaseStatement

}


module.exports = {
    manage_bool_in_SAP,
    removeLeadingZeros,
    generateColumns,
    convertColumnsListToString,
    getColumnDescriptionObject,
    generateInsertColumnsString,
    generateInsertColumnsStringWithAlias,
    applyPolicyRetention,
    applyTimeFilter,
    buildUnionQuery,
    generateAgeCaseStatement,
    getClientTenure,
    getPlatformMapping
    }