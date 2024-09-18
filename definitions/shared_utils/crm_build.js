const pipelines = [
    { pipeline: '0201', idnum_prefix_filter: 'C', min_date: '20230309', source: '0201__crm_master_MAIN', destination:'1st_layer___0201__customer_master'},
     { pipeline: '0202', idnum_prefix_filter: 'C', min_date: '20230309', source: '0202__crm_master_ID', destination:'1st_layer___0202__customer_mapping_master'}
]


pipelines.forEach(({pipeline, idnum_prefix_filter, min_date, source, destination, backfill}) => {


  publish(destination, {
    type: "incremental",
    tags: ['1st_layer', 'crm_build'],
    description: crm_config.descriptions[pipeline],
    bigquery: {
      labels: {
        responsible: "u5037967",
        usage: "prod",
        source_system: "sap_p60",
        source_system__object: "tbd",
        monitoring__key_id__field_name: "tbd",
        monitoring__date__field_name: "posting_date",
        monitoring__date__field_granularity: "day",
        monitoring__activated: "true",
        ingestion__tool: "tbd",
        ingestion__tool__pipeline_reference: "tbd",
        ingestion__tool__pipeline_activation_type: "tbd",
        preparation__tool: "dataform",
        preparation__tool__pipeline_reference: destination,
        preparation__tool__pipeline_activation_type: "scheduled",
        update_frequency: "24h",
        manual_status: "ok"
      },
      partitionBy: 'source_file_extraction_date'
    },
    columns: crm_config.makeFieldDefinitions(pipeline)
  })



  .preOps(ctx => `
    DECLARE last_filename DEFAULT (
      ${ctx.when(ctx.incremental(),
      //`SELECT max(source_file_path) FROM ${ctx.self()}`,
      `SELECT ''`,
      `SELECT ''`)}
    );
    DECLARE last_extraction_timestamp DEFAULT (
    ${ctx.when(ctx.incremental(),
   // `SELECT max(extraction_timestamp) FROM ${ctx.self()}`,
    `SELECT cast('2020-01-01' as timestamp)`,
    `SELECT cast('2020-01-01' as timestamp)`
    )}
  );
  `)




  .query(ctx => `
    SELECT 
      _FILE_NAME AS source_file_path,
      PARSE_TIMESTAMP('%Y%m%d %H%M%S',
        CONCAT(
          REGEXP_EXTRACT(_FILE_NAME, r'(\\d{8})__\\d{9}.csv'),  -- Extract date (YYYYMMDD)
          ' ',
          SUBSTR(REGEXP_EXTRACT(_FILE_NAME, r'\\d{8}__(\\d{6})'), 1, 6)  -- Extract time (HHMMSS)
        )
      ) AS extraction_timestamp,
      PARSE_DATE('%Y%m%d', REGEXP_EXTRACT(_FILE_NAME, r'(\\d{8})__\\d{9}.csv')) AS source_file_extraction_date,
      ${crm_config.makeSelectStatement(pipeline)}
    FROM ${ctx.ref(source)}
    WHERE left(idnum, 1) = '${idnum_prefix_filter}'
      AND _FILE_NAME > last_filename
      AND REGEXP_EXTRACT(_FILE_NAME, r'(\\d{8})__\\d{9}.csv') > '${min_date}'

    ${backfill ? 
    `
      union all

      SELECT  
      # TO DO: ensure all the fields are there in same order
      *
      FROM ${ctx.ref(backfill)}
      WHERE extraction_date <= PARSE_DATE('%Y%m%d','${min_date}')
      and extraction_timestamp >  last_extraction_timestamp
    `
    :
    ''
    }
  `);


})