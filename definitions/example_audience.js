const isAudienceEnabled = dataform.projectConfig.vars.isAudienceEnabled;

if (isAudienceEnabled !== "") {
    publish("example")
        .type("incremental")
        .query(ctx => `
            SELECT 
                '${exampleValue}' AS example_value,
                '${author}' AS author,
                CURRENT_DATETIME AS insert_on
            UNION ALL
            SELECT
                example_value,
                author,
                insert_on
            FROM ${ctx.self()}
            WHERE insert_on > (
                SELECT MAX(insert_on)
                FROM ${ctx.self()}
            )`
        )
        .preOps(ctx => `
            CREATE TABLE IF NOT EXISTS ${ctx.self()} (
                example_value STRING,
                author STRING,
                insert_on DATETIME
            )
            PARTITION BY DATETIME_TRUNC(insert_on, HOUR);
        `)
        .tags(["orchestrator_audience"]);
}