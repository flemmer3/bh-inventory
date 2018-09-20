// GET https://apiurl?key=zns-test&request=review

var API_KEY = "zns-test";
var SPREADSHEET_ID = "1FFNOBq7LXesjj_hnnQAp6JtmnX6NIVpZcU1kkQ13AzA";

function doGet(e)
{
    // if(!isAuthorized(e))
    // {
    //     return buildErrorResponse("unauthorized");
    // }

    var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    var worksheet = spreadsheet.getSheetByName("ZNS");
    var rows = worksheet.getDataRange().getValues();

    var headings = rows[0];
    var entries = rows.slice(1);
    var entriesWithHeadings = addHeadings(entries, headings);
    var incompleteEntries = removeCompleted(entriesWithHeadings);
    Logger.log(incompleteEntries);

    return buildSuccessResponse("authorized");
}

function addHeadings(entries, headings)
{
    return entries.map(function(entryAsArray) {
        var entryAsObj = {};
        headings.forEach(function(heading, i) {
            entryAsObj[heading] = entryAsArray[i];
        });
        return entryAsObj;
    });
}

function removeCompleted(entries, completed)
{
    return entries.filter(function(entry) {
        return entry["isComplete"] != true && entry["isComplete"] != "";
    });
}

function isAuthorized(e)
{
    return "key" in e.parameters && e.parameters["key"][0] == API_KEY;
}

function buildSuccessResponse(message)
{
    var output = JSON.stringify({
        status: "success",
        message: message
    });

    return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON);
}

function buildErrorResponse(message)
{
    var output = JSON.stringify({
        status: "error",
        message: message
    });

    return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON);
}

function getRequestParam(e)
{
    return "request" in e.parameters 
        ? e.parameters["request"][0]
        : "review";
}