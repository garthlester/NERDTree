# NERDTree Improved

The goal of this project is to mimic the functionality of [NERDTree](https://github.com/preservim/nerdtree) for vim as closely as possible.

This project was originally forked from [https://github.com/61130061/NERDTree](https://github.com/61130061/NERDTree), but this ended up being nearly a full rewrite due to the original functionality deviating significantly from that of the NERDTree for vim.

## Installation

### From Marketplace

TODO: Currently not available in the marketplace

### From Source

1. Clone this repo and cd into it
2. Make sure to have [Node.js](https://nodejs.org) installed
3. Install vsce: `npm install -g @vscode/vsce`
4. Install yarn: `npm install -g yarn`
5. Generate a VSIX file: `vsce package`. If you get errors about other missing dependencies, go install them and repeat this step until it succeeds.
6. Open vscode, press Ctrl+Shift+x to open the extensions panel. Click the '...' button near the top of the panel and select 'Install from VSIX' and navigate to the .VSIX file that was generated in the previous step.

### VSCodeVim Compatibility

If you want to use the default keybinding (Ctrl + n) to open NERDTree, you will need to add the following to your settings.json file:

```json
{
    ...
    "vim.handleKeys": {
    "<C-n>": false
    }
}
```

## Usage

You can start using NERDTree after installation. 

Below are the default keybindings and functions of the original NERDTree and their current state in this plugin


### File Node Mappings

| Command | Default Keybinding | Description | Status |
|---|---|---|---|
| nerdtree.openFile | o | open in prev window | working |
| nerdtree.previewFile | go | preview | working |
| nerdtree.notImplemented | t | open in new tab | not planned ⁎ |
| nerdtree.notImplemented | T | open in new tab silenty | not planned ⁎ |
| nerdtree. | i | open split | not planned ‡ |
| nerdtree. | gi | preview split | not planned ‡ |
| nerdtree. | s | open vsplit | working |
| nerdtree. | gs | preview vsplit | working |
| nerdtree.openFile | <CR> | custom open | working |

### Directory Node Mappings

| Command | Default Keybinding | Description | Status |
|---|---|---|---|
| nerdtree. | o | open or close node | planned |
| nerdtree. | O | recursively open node | planned |
| nerdtree. | t | open in new tab | not planned ⁎ |
| nerdtree. | T | open in new tab silently | not planned ⁎ |
| nerdtree. | <CR> | custom open | working |
| nerdtree. | x | close parent of node | working |
| nerdtree. | X | close all child nodes of current node recursively | planned |
| nerdtree. | e | explore selected dir | not planned |

### Bookmark Table Mappings

| Command | Default Keybinding | Description | Status |
|---|---|---|---|
| nerdtree. | o | open bookmark | not planned † |
| nerdtree. | go | preview file | not planned † |
| nerdtree. | go | find dir in new tree | not planned † |
| nerdtree. | t | open in new tab | not planned ⁎ |
| nerdtree. | T | open in new tab silently | not planned ⁎ |
| nerdtree. | i | open split | not planned †‡ |
| nerdtree. | gi | preview split | not planned †‡ |
| nerdtree. | s | open vsplit | not planned † |
| nerdtree. | gs | preview vsplit | not planned † |
| nerdtree. | <CR> | custom open | not planned † |
| nerdtree. | D | delete bookmark | not planned † |

### Tree navigation mappings

| Command | Default Keybinding | Description | Status |
|---|---|---|---|
| nerdtree. | C | change root tree node to selected dir | not planned |
| nerdtree. | u | move tree root up a directory | not planned |
| nerdtree. | U | move tree root up a directory but leave old root open | not planned |
| nerdtree. | r | refresh cursor dir | not planned |
| nerdtree. | R | refresh current root | not planned |
| nerdtree. | m | show menu | planned |
| nerdtree. | cd | change the CWD to the selected dir | not planned |
| nerdtree. | CD | change tree root to CWD | not planned |

### Tree filtering mappings

| Command | Default Keybinding | Description (default value) | Status |
|---|---|---|---|
| nerdtree. | I | hidden files (off) | planned |
| nerdtree. | f | file filters (on) | not planned |
| nerdtree. | F | files (on) | not planned |
| nerdtree. | B | bookmarks (off) | not planned |
| nerdtree. | FL | file lines (off) | not planned |

### Other mappings

| Command | Default Keybinding | Description (default value) | Status |
|---|---|---|---|
| nerdtree. | q | close the NERDTree window | planned |
| nerdtree. | A | Zoom the NERDTree window | not planned |
| nerdtree. | ? | toggle help | planned |

⁎ VSCode tabs correspond to vim buffers. VSCode does not have a corresponding feature to vim tabs, so NERDTree features related to vim tabs cannot be implemented.

† I'm not sure if the VSCode explorer has anything like NERDTree bookmarks. I may come back to these and investigate when the rest is functional

‡ To my knowledge, VSCode does not allow horizontal splits, so related features are not planned.
