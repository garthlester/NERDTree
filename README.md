# NERDTree Improved

The goal of this project is to mimic the functionality of [NERDTree](https://github.com/preservim/nerdtree) for vim as closely as possible.

This project was originally forked from [https://github.com/61130061/NERDTree](https://github.com/61130061/NERDTree), but this ended up being nearly a full rewrite due to the original functionality deviating significantly from that of the original.

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
| nerdtree.notImplemented | i | open split | not planned ‡ |
| nerdtree.notImplemented | gi | preview split | not planned ‡ |
| nerdtree.openVSplit | s | open vsplit | working |
| nerdtree.previewVSplit | gs | preview vsplit | working |
| nerdtree.openFile | <CR> | custom open | working |

### Directory Node Mappings

| Command | Default Keybinding | Description | Status |
|---|---|---|---|
| nerdtree.toggleNode | o | open or close node | planned |
| nerdtree.recursivelyOpenNode | O | recursively open node | planned |
| nerdtree.notImplemented | t | open in new tab | not planned ⁎ |
| nerdtree.notImplemented | T | open in new tab silently | not planned ⁎ |
| nerdtree.toggleNode | <CR> | custom open | working |
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
| nerdtree.notImplemented | <CR> | custom open | not planned † |
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

There are some additional limitations:

- In the original NERDTree, the copy command did the copying and the pasting, but I don't see a straightforward way to implement that behaviour given the limitations of VSCode. To compensate, I've added a separate paste command.

- The move command on linux fills the role of both rename and cut/paste, however I can't find a way to do that in VSCode. Instead, `m` only renames, but I've added a separate cut command to make up for it.

| Command| Default Keybinding | Description | Status |
|---|---|---|---|
| nerdtree.menu.add | a | add a child node | planned |
| nerdtree.menu.move | m | move the current node | planned |
| nerdtree.menu.delete | d | delete the current node | planned |
| nerdtree.menu.reveal | r | reveal the current node in file manager | planned |
| nerdtree.menu.open | o | open the current node with system editor | not planned |
| nerdtree.menu.copy | c | copy the current node | planned |
| nerdtree.menu.copy | x | cut the current node | planned |
| nerdtree.menu.paste | v | paste | planned |
| nerdtree.menu.copyPath | p | copy path to the clipboard | planned |
| nerdtree.menu.list | l | list the current node | not planned |
| nerdtree.menu.changePermissions | C | Change node permissions | not planned |
| nerdtree.menu.runSystemCommand | s | Run system command in this directory | planned |

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

⁎ VSCode tabs correspond to vim buffers. VSCode does not have a corresponding feature to vim tabs, so NERDTree features related to vim tabs cannot be implemented.

† I'm not sure if the VSCode explorer has anything like NERDTree bookmarks. I may come back to these and investigate when the rest is functional

‡ To my knowledge, VSCode does not allow horizontal splits, so related features are not planned.
