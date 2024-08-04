# NERDTree Revamped

The goal of this project is to mimic the functionality of [NERDTree](https://github.com/preservim/nerdtree) for vim as closely as possible.

This project was originally forked from [https://github.com/61130061/NERDTree](https://github.com/61130061/NERDTree), but enough functionality has changed that it didn't seem wise to send a pull request and risk upsetting long-time users if it was accepted.

## Installation

### From Marketplace

TODO: Currently not available in the marketplace

### From VSIX

1. Download the latest VSIX file from [releases](https://github.com/garthlester/NERDTree/releases)
2. Open vscode, press Ctrl+Shift+x to open the extensions panel. Click the '...' button near the top of the panel and select 'Install from VSIX' and navigate to the .VSIX file that was generated in the previous step.

### From Source

1. Clone this repo and cd into it
2. Make sure to have [Node.js](https://nodejs.org) installed
3. Install vsce: `npm install -g @vscode/vsce`
4. Install yarn: `npm install -g yarn`
5. Generate a VSIX file: `vsce package`. If you get errors about other missing dependencies, install them and repeat this step until it succeeds.
6. Open vscode, press Ctrl+Shift+x to open the extensions panel. Click the '...' button near the top of the panel and select 'Install from VSIX' and navigate to the .VSIX file that was generated in the previous step.

### Vim Plugin Compatibility

If you are using the Vim plugin and want to use the default keybinding (Ctrl + n) to open NERDTree, you will need to add the following to your settings.json file:

```json
{
    ...
    "vim.handleKeys": {
    "<C-n>": false
    }
}
```

## Features and Roadmap

Below are the default keybindings and functions of the original NERDTree for vim and their current state in this plugin. If you wish to set your own keybindings, the VSCode command is provided for each.

### File Node Mappings

⁎ VSCode tabs more or less correspond to vim buffers. VSCode does not have a corresponding feature to vim tabs, so NERDTree features related to vim tabs cannot be implemented.

‡ To my knowledge, VSCode does not allow horizontal splits, so related features are not planned.

| Default Keybinding | Description | Status | Command |
|---|---|---|---|
| o | open in prev window | working | nerdtree.openFile |
| go | preview | working | nerdtree.previewFile |
| t | open in new tab | not planned ⁎ | nerdtree.notImplemented |
| T | open in new tab silenty | not planned ⁎ | nerdtree.notImplemented |
| i | open split | not planned ‡ | nerdtree.notImplemented |
| gi | preview split | not planned ‡ | nerdtree.notImplemented |
| s | open vsplit | working | nerdtree.openVSplit |
| gs | preview vsplit | working | nerdtree.previewVSplit |
| enter | custom open | working | nerdtree.openFile |

### Directory Node Mappings

| Default Keybinding | Description | Status | Command |
|---|---|---|---|
| o | open or close node | planned | nerdtree.toggleNode |
| O | recursively open node | planned | nerdtree.recursivelyOpenNode |
| t | open in new tab | not planned ⁎ | nerdtree.notImplemented |
| T | open in new tab silently | not planned ⁎ | nerdtree.notImplemented |
| enter | custom open | working | nerdtree.toggleNode |
| x | close parent of node | working | nerdtree.closeParentOfNode |
| X | close all child nodes of current node recursively | planned | nerdtree.recursivelyCloseChildren |
| e | explore selected dir | not planned | nerdtree.notImplemented |

### Bookmark Table Mappings

† I'm not sure if the VSCode explorer has anything like NERDTree bookmarks. I may come back to these and investigate when the rest is functional, but for now, no bookmark features are officially planned.

| Default Keybinding | Description | Status | VSCode Command |
|---|---|---|---|
| o | open bookmark | not planned † | nerdtree.notImplemented |
| go | preview file | not planned † | nerdtree.notImplemented |
| go | find dir in new tree | not planned † | nerdtree.notImplemented |
| t | open in new tab | not planned ⁎ | nerdtree.notImplemented |
| T | open in new tab silently | not planned ⁎ | nerdtree.notImplemented |
| i | open split | not planned †‡ | nerdtree.notImplemented |
| gi | preview split | not planned †‡ | nerdtree.notImplemented |
| s | open vsplit | not planned † | nerdtree.notImplemented |
| gs | preview vsplit | not planned † | nerdtree.notImplemented |
| enter | custom open | not planned † | nerdtree.notImplemented |
| D | delete bookmark | not planned † | nerdtree.notImplemented |

### Tree navigation mappings

| Default Keybinding | Description | Status | VSCode Command |
|---|---|---|---|
| C | change root tree node to selected dir | planned | nerdtree.notImplemented |
| u | move tree root up a directory | planned | nerdtree.notImplemented |
| U | move tree root up a directory but leave old root open | planned | nerdtree.notImplemented |
| r | refresh cursor dir | not needed | nerdtree.notImplemented |
| R | refresh current root | not needed | nerdtree.notImplemented |
| m | show menu | working | nerdtree.notImplemented |
| cd | change the CWD to the selected dir | planned | nerdtree.notImplemented |
| CD | change tree root to CWD | planned | nerdtree.notImplemented |

**Menu Sub-Commands**

I'm not currently aware of how to spawn an interactive menu using the VSCode API, so I went back to Llam4u's approach of implementing these as chords. Type m followed by the keybinding below to use.

| Default Keybinding | Description | Status | VSCode Command |
|---|---|---|---|
| a | add a child node | working | nerdtree.menu.add |
| m | move the current node | working | nerdtree.menu.move |
| d | delete the current node | working | nerdtree.menu.delete |
| r | reveal the current node in file manager | working | nerdtree.menu.reveal |
| o | open the current node with system editor | working | nerdtree.menu.open |
| c | copy the current node | working | nerdtree.menu.copy |
| p | copy path to the clipboard | working | nerdtree.menu.copyPath |
| l | list the current node | not planned | nerdtree.menu.list |
| C | Change node permissions | not planned | nerdtree.menu.changePermissions |
| s | Run system command in this directory | almost working | nerdtree.menu.runSystemCommand |

### Tree filtering mappings

| Default Keybinding | Description (default value) | Status | VSCode Command |
|---|---|---|---|
| I | hidden files (off) | planned | nerdtree.toggleHiddenFiles |
| f | file filters (on) | not planned | nerdtree.notImplemented |
| F | files (on) | not planned | nerdtree.notImplemented |
| B | bookmarks (off) | not planned † | nerdtree.notImplemented |
| FL | file lines (off) | not planned | nerdtree.notImplemented |

### Other mappings

| Default Keybinding | Description (default value) | Status | VSCode Command |
|---|---|---|---|
| q | close the NERDTree window | planned | nerdtree.close |
| A | Zoom the NERDTree window | not planned | nerdtree.zoom |
| ? | toggle help | planned | nerdtree.help |
