const startDate = dataform.projectConfig.vars.startDate
const query = "SELECT '" + startDate + "' as test"

publish("example")
    .query(query)
    .type("view");
