try {
    // var filetext = app.read(path)
    var filetext = readFile(inbox_md)
    // console.log(filetext)

    if (!filetext.endsWith("\n") && !filetext.endsWith("- ") && !filetext.endsWith("-")) {
        console.log("does not end with newline character")
        text2append = "\n" + text2append
        app.write(text2append, { to: openedFile, startingAt: app.getEof(openedFile) + 1 })
    } else if (filetext.endsWith("\n")) {
        console.log("ends with newline character")
        console.log('remove newlines')
        while (filetext.endsWith("\n")) {
            filetext = filetext.slice(0, filetext.length - 1) // remove newline characters
        }
        filetext += ("\n" + text2append)
        console.log(filetext)
        app.write(filetext, { to: openedFile, startingAt: 0 })
    } else if (filetext.endsWith("- ")) {
        console.log("ends with hyphen")
        text2append = text2append.slice(2)
        console.log(text2append)
        app.write(text2append, { to: openedFile, startingAt: app.getEof(openedFile) + 1 })
    } else if (filetext.endsWith("-")) {
        console.log("ends with hyphen")
        text2append = text2append.slice(1)
        console.log(text2append)
        app.write(text2append, { to: openedFile, startingAt: app.getEof(openedFile) + 1 })
    }
    app.closeAccess(openedFile)
    done = 1
}
catch (error) {  // empty file without any characters
    app.write(text2append, { to: openedFile })
    app.closeAccess(openedFile)
    done = 1
}










