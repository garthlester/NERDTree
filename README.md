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

Below are the default keybindings and functions of the original NERDTree and their current state in this plugin

### File Node Mappings

| Command | Default Keybinding | Description | Status |
|---|---|---|---|
| nerdtree.openFile | o | open in prev window | working |
| nerdtree.previewFile | go | preview | working |
| nerdtree.notImplemented | t | open in new tab | not planned ⁎ |
| nerdtree.notImplemented | T | open in new tab silenty | not planned ⁎ |
| nerdtree.notImplemented | i | open split | not planned ‡ |
| nerdtree.notImplemented | gi | preview split | not planned ‡ |
| nerdtree.openVSplit | s | open vsplit | working |
| nerdtree.previewVSplit | gs | preview vsplit | working |
| nerdtree.openFile | enter | custom open | working |

### Directory Node Mappings

| Command | Default Keybinding | Description | Status |
|---|---|---|---|
| nerdtree.toggleNode | o | open or close node | planned |
| nerdtree.recursivelyOpenNode | O | recursively open node | planned |
| nerdtree.notImplemented | t | open in new tab | not planned ⁎ |
| nerdtree.notImplemented | T | open in new tab silently | not planned ⁎ |
| nerdtree.toggleNode | enter | custom open | working |
| nerdtree.closeParentOfNode | x | close parent of node | working |
| nerdtree.recursivelyCloseChildren | X | close all child nodes of current node recursively | planned |
| nerdtree.notImplemented | e | explore selected dir | not planned |

### Bookmark Table Mappings

| Command | Default Keybinding | Description | Status |
|---|---|---|---|
| nerdtree.notImplemented | o | open bookmark | not planned † |
| nerdtree.notImplemented | go | preview file | not planned † |
| nerdtree.notImplemented | go | find dir in new tree | not planned † |
| nerdtree.notImplemented | t | open in new tab | not planned ⁎ |
| nerdtree.notImplemented | T | open in new tab silently | not planned ⁎ |
| nerdtree.notImplemented | i | open split | not planned †‡ |
| nerdtree.notImplemented | gi | preview split | not planned †‡ |
| nerdtree.notImplemented | s | open vsplit | not planned † |
| nerdtree.notImplemented | gs | preview vsplit | not planned † |
| nerdtree.notImplemented | enter | custom open | not planned † |
| nerdtree.notImplemented | D | delete bookmark | not planned † |

### Tree navigation mappings

| Command | Default Keybinding | Description | Status |
|---|---|---|---|
| nerdtree.notImplemented | C | change root tree node to selected dir | not planned |
| nerdtree.notImplemented | u | move tree root up a directory | not planned |
| nerdtree.notImplemented | U | move tree root up a directory but leave old root open | not planned |
| nerdtree.notImplemented | r | refresh cursor dir | not planned |
| nerdtree.notImplemented | R | refresh current root | not planned |
| nerdtree.notImplemented | m | show menu | planned |
| nerdtree.notImplemented | cd | change the CWD to the selected dir | not planned |
| nerdtree.notImplemented | CD | change tree root to CWD | not planned |

**Menu Sub-Commands**

I'm not currently aware of how to spawn an interactive menu in VSCode, so I went back to Llam4u's approach of implementing them as chords.

| Command| Default Keybinding | Description | Status |
|---|---|---|---|
| nerdtree.menu.add | a | add a child node | working |
| nerdtree.menu.move | m | move the current node | working |
| nerdtree.menu.delete | d | delete the current node | working |
| nerdtree.menu.reveal | r | reveal the current node in file manager | working |
| nerdtree.menu.open | o | open the current node with system editor | working |
| nerdtree.menu.copy | c | copy the current node | working |
| nerdtree.menu.copyPath | p | copy path to the clipboard | working |
| nerdtree.menu.list | l | list the current node | not planned |
| nerdtree.menu.changePermissions | C | Change node permissions | not planned |
| nerdtree.menu.runSystemCommand | s | Run system command in this directory | working |

### Tree filtering mappings

| Command | Default Keybinding | Description (default value) | Status |
|---|---|---|---|
| nerdtree.toggleHiddenFiles | I | hidden files (off) | planned |
| nerdtree.notImplemented | f | file filters (on) | not planned |
| nerdtree.notImplemented | F | files (on) | not planned |
| nerdtree.notImplemented | B | bookmarks (off) | not planned |
| nerdtree.notImplemented | FL | file lines (off) | not planned |

### Other mappings

| Command | Default Keybinding | Description (default value) | Status |
|---|---|---|---|
| nerdtree.close | q | close the NERDTree window | planned |
| nerdtree.zoom | A | Zoom the NERDTree window | not planned |
| nerdtree.help | ? | toggle help | planned |

⁎ VSCode tabs more or less correspond to vim buffers. VSCode does not have a corresponding feature to vim tabs, so NERDTree features related to vim tabs cannot be implemented.

† I'm not sure if the VSCode explorer has anything like NERDTree bookmarks. I may come back to these and investigate when the rest is functional

‡ To my knowledge, VSCode does not allow horizontal splits, so related features are not planned.
