# Alfred workflow for Obsidian

This very simple [Alfred](https://www.alfredapp.com/) workflow uses [Obsidian](https://obsidian.md/)'s URL scheme (available in Obsidian 0.8.15 and above) and bash scripts to open notes in their vaults.

This workflow has been tested with Obsidian 0.9.0.

## Features

**Open a vault**: To open one of your many Obsidian vaults, type `ov your_vault_name`. You can change the keyword input subtext to remind yourself of the names of your vaults (default is set to "Available vaults: notes, journal").

**Open daily note** (only if you have enabled the Daily notes plugin): Type `od`  or use the hotkey Ctrl+Shift+D (feel free to change it). 
- NOTE: You will have to edit the bash script for this feature to work. Notes and comments are provided in the workflow/script. Briefly, you need to specify your daily note date format (step 1 in script) and the vault name (step 2 in script).

**Search Obsidian vaults with Alfred File Filters**. For the search with file filter feature to work, you'll have to edit the Scope of each File Filter (`os`, `or`, and `ot`) to tell Alfred where to search for files on your computer. You can also change other settings via Basic Setup, Scope, Fields, Limit and Sort tabs.
- To search for all files with the term `xyz`, type `os xyz`.
- To search for recent files (last 3 days) with the term `xyz`, type `or xyz`.
- To search for files modified today, `xyz`, type `ot xyz`.

## Known bugs

If the Obsidian app isn't already opened, this workflow will always open the last recently opened vault. This bug is a known issue with Electron apps on MacOS. See [discussion on Obsidian's Discord](https://discordapp.com/channels/686053708261228577/716028884885307432/755203478413902036).