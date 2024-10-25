const tableGroups = config.tableGroups

tableGroups.forEach(group => {
    group.tables.forEach(table => {
        publish(`${table}_v`)
            .type("view")
            .config({
                schema: "normalised",
                columns : {
                    customer_code : "customer_id"
                }
            })
            .query(ctx => `
      select * from ${ctx.ref(table)}
    `);
    })
});