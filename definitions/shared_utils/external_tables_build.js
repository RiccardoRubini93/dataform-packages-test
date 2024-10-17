const tableGroups = config.tableGroups

tableGroups.forEach(group => {
  group.tables.forEach(table => {
    declare({
      database: group.database,
      schema: group.schema,
      name: table,
    });
  });
});