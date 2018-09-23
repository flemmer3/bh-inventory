// GET https://apiurl?key=zns-test&request=review&user=zuk

var API_KEY = "zns-test";
var TASK_SPREADSHEET_ID = "1FFNOBq7LXesjj_hnnQAp6JtmnX6NIVpZcU1kkQ13AzA";
var MEGASHEET_ID = "1sGBfKDG61EQmIzW11Wfm51kzMcdH8F1HluENkfrFNBI";

function doGet(e)
{
    // if(!isAuthorized(e))
    // {
    //     return buildErrorResponse("unauthorized");
    // }
    task = getIncompleteTask();

    //error handle if device not found
    deviceInfo = getOldDeviceInfo(task["task"]["device"] + task["task"]["newDeviceID"]);

    edits = suggestedEdits(deviceInfo,task);
    Logger.log(edits);

    return buildSuccessResponse("authorized");
}

function getIncompleteTask()
{
    var spreadsheet = SpreadsheetApp.openById(TASK_SPREADSHEET_ID);
    var worksheet = spreadsheet.getSheetByName("ZNS");
    var rows = worksheet.getDataRange().getValues();

    var headings = rows[0];
    var entries = rows.slice(1);
    var entriesWithHeadings = addHeadings(entries, headings);
    for(var i = 0; i < entriesWithHeadings.length; i++)
    {
        if(entriesWithHeadings[i]["isComplete"] !== true)
        {
            return {"task": entriesWithHeadings[i], "row": i+2};
        }
    }
}

function getOldDeviceInfo(deviceNumber)
{
    var spreadsheet = SpreadsheetApp.openById(MEGASHEET_ID);
    var worksheet = spreadsheet.getSheetByName("Inventory");
    var rows = worksheet.getDataRange().getValues();
    var headings = rows[0];
    var entries = rows.slice(1);
    var entriesWithHeadings = addHeadings(entries, headings);
    for(var i = 0; i < entriesWithHeadings.length; i++)
    {
        if(entriesWithHeadings[i]["deviceID"].toLowerCase() === deviceNumber.toLowerCase())
        {
            return {"info": entriesWithHeadings[i], "row": i+2};
        }
    }
}

function suggestedEdits(deviceInfo, taskInfo)
{
    var newInfo = {};
    if(taskInfo["task"]["status"] !== "")
    {
        newInfo["Code"] = parseInt(taskInfo["task"]["status"]);
    }
    
    if(taskInfo["task"]["notes"] !== "" || taskInfo["task"]["newNotes"] !== "")
    {
        var today = new Date();
        var today = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear().toString().substr(-2);
        var newText = deviceInfo["info"]["Notes"] === "" 
            ? deviceInfo["info"]["Notes"]
            : deviceInfo["info"]["Notes"] + "\n";
        newText += today + ", " + taskInfo["task"]["notes"] + taskInfo["task"]["newNotes"];
        newInfo["Notes"] = newText;
    }

    if(taskInfo["task"]["description"] !== "")
    {
        var newText = deviceInfo["info"]["Description"] === "" 
            ? taskInfo["task"]["description"]
            : deviceInfo["info"]["Description"] + "\n" + taskInfo["task"]["description"];
        newInfo["Description"] = newText;
    }

    if(taskInfo["task"]["price"] !== "")
    {
        newInfo["price"] = deviceInfo["info"]["price"];
    }

    return newInfo
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

// function removeCompleted(entries, completed)
// {
//     return entries.filter(function(entry) {
//         return entry["isComplete"] !== true && entry["isComplete"] !== "";
//     });
// }

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