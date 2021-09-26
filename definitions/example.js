const exampleValue = dataform.projectConfig.vars.exampleValue
const query = "SELECT '" + exampleValue + "' as test"

publish("example")
    .query(query)
    .type("view")
    .tags(["orchestrator_example"]);
