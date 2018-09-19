function doGet(e)
{
    var output = JSON.stringify({
        status: "success",
        message: "it worked!"
    });

    return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON);
}