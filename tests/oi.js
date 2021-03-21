ObjC.import('stdlib');
console.log('Running script: oi')

// get the current app to access the standard additions
app = Application.currentApplication();
app.includeStandardAdditions = true;

// get home path
homepath = app.pathTo('home folder')
console.log(homepath)

// get inbox note path
var inbox_md = $.getenv('inbox_md');
inbox_md = inbox_md.replace('~', homepath)

// escape " 
var query = "{query}";
query = query.replaceAll('"', '\"');

// split paragraphs into separate bullet points
query = query.split("@NEWLISTITEM@")
console.log("query: " + query)

// function to read utf
// https://github.com/JXA-Cookbook/JXA-Cookbook/issues/25
ObjC.import('Foundation')
const readFile = function (path, encoding) {
    !encoding && (encoding = $.NSUTF8StringEncoding)
    const fm = $.NSFileManager.defaultManager
    const data = fm.contentsAtPath(path)
    const str = $.NSString.alloc.initWithDataEncoding(data, encoding)
    return ObjC.unwrap(str)
}

// read file to append to it
var filetext = readFile(inbox_md);

// remove newline characters
while (filetext.endsWith("\n")) {
    filetext = filetext.slice(0, filetext.length - 1);
}
if (filetext == "") {
    console.log("EMPTY NOTE!")
} else {
    filetext += "\n"; // leave one newline character
}

console.log("CURRENT TEXT (string)");
console.log(filetext)

// loop through each paragraph and append as separate bullet point
var formatted_text = ''; 
for (i = 0; i < query.length; i++) {

    var text2append = query[i];
    
    // parse string to remove extra spaces 
    text2append = text2append.split(" ")
    text2append = text2append.filter(i => i.length > 0).join(" ")

    // add bullet point
    if (!query[i].startsWith("- ")) {
        text2append = "- " + text2append;
    }
    if (text2append == "- ") {
        continue;
    }

    if (!text2append.endsWith("\n")) {
        text2append += "\n";
    }
    console.log("TEXT TO APPEND " + (i + 1));
    console.log(text2append);
    formatted_text += text2append;    
}

var final_text = filetext + formatted_text; 
console.log("FINAL TEXT")
console.log(final_text)

// write file
str2write = $.NSString.alloc.initWithUTF8String(final_text);
str2write.writeToFileAtomicallyEncodingError(inbox_md, true, $.NSUTF8StringEncoding, null);

// notification
var oinotify = $.getenv('oinotify');
if (oinotify == "on") {    
    // https://developer.apple.com/library/archive/documentation/LanguagesUtilities/Conceptual/MacAutomationScriptingGuide/DisplayNotifications.html
    app.displayNotification("Added text to inbox", { withTitle: 'Obsidian Alfred workfow' })
}
