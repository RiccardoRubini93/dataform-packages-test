const tableNames = clones.TABLES


tableNames.forEach(({
    name,
    author
}) => {

    const dataset = clones.TARGET_DATASETS.find((dataset) => name.indexOf(dataset.prefix) === 0)

    if (dataset && (dataform.projectConfig.vars.executionSetting === 'prod' || dataform.projectConfig.vars.executionSetting === 'test')) {

        const projectId = 'jit-training-dma-devops'
        const dataset_name = dataset.target
        const table_name = name.replace(dataset.prefix, '')

        operate('clone_' + name).queries(ctx => `

        /*
             ############  Description:

             - This scripts takes care of cloning tables based on their final name within Dataform PROD environment. It will loop on them and given certain criteria it will clone these tables in the right dataset for usage (based on prefix)
             - Please check: 

             ############  Author: 
             - ${author} (Contact Information) 
             - Date Created: [24/07/2024]


             ############  Labels (for usage tracking, debugging, cost monitoring, cost attribution)
             [Start] Internal Label [Start] 
             Project | GCP Dataform Process 
             Priority | High
             Team | DATA-DE
             User | ${author}
             Functionality | Cloning 
             [End] Internal Label [End]

        */


        CREATE OR REPLACE TABLE ${projectId}.${dataset_name}.${table_name}${dataform.projectConfig.vars.executionSetting === 'test' ? '__v_dataform_test' : ''}
        CLONE ${ctx.ref(name)}; `);
    } else if (dataset && dataform.projectConfig.vars.executionSetting === 'dev') {
        
        const projectId = 'jit-training-dma-devops'
        const dataset_name = dataset.target
        const table_name = name.replace(dataset.prefix, '')
        
        operate('dummy_clone_' + name).queries(ctx => `
            
            SELECT "this is a dummy operation for dev env to replace the colne operation done in test/prod. When in prod it will be cloned to ${projectId}.${dataset_name}.${table_name}. When in test it will be cloned to ${projectId}.${dataset_name}.${table_name}__v_dataform_test" FROM ${ctx.ref(name)}; 
        `);
    }
});