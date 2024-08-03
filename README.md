# NERDTree Improved

The goal of this project is to mimic the functionality of <TODO: find link> as closely as possible.

This project was originally forked from <TODO: find link>, but this ended up being nearly a full rewrite due to the original functionality deviating significantly from that of the NERDTree for vim.

## Installation

### From Marketplace

You can install NERDTree for VSCode via <TODO: find link>

### From Source

TODO

### VSCodeVim Compatibility

If you want to use the default keybinding (Ctrl + n) to open NERDTree, you will need to add the following to your settings.json file:

```json
{
	...
	"vim.handleKeys": {
		"<C-n>": false,
	}
}
```

## Usage

You can start using NERDTree after installation. Below are the default keybindings and their current state.

*State Key:*
1: Fully implemented.
2: Planned.
3: Not planned.
3t: VSCode tabs correspond to vim buffers. VSCode does not have a corresponding feature to vim tabs, so NERDTree features related to vim tabs cannot be implemented.
3b: I'm not sure if the VSCode explorer has anything like NERDTree bookmarks. May come back to these and investigate when the rest is functional
3s: To my knowledge, VSCode does not allow horizontal splits, so related features are not planned.

###File Node Mappings

| Command | Default Keybinding | Description | Status |
|---|---|---|---|
| nerdtree.openFile | o | open in prev window | 1 |
| nerdtree.previewFile | go | preview | 1 |
| nerdtree.notImplemented | t | open in new tab | 3t |
| nerdtree.notImplemented | T | open in new tab silenty | 3t |
| nerdtree. | i | open split | 4s |
| nerdtree. | gi | preview split | 4s |
| nerdtree. | s | open vsplit | 1 |
| nerdtree. | gs | preview vsplit | 2 |
| nerdtree.openFile | <CR> | custom open | 1 |

###Directory Node Mappings

| Command | Default Keybinding | Description | Status |
|---|---|---|---|
| nerdtree. | o | open or close node | 2 |
| nerdtree. | O | recursively open node | 2 |
| nerdtree. | t | open in new tab | 3t |
| nerdtree. | T | open in new tab silently | 3t |
| nerdtree. | <CR> | custom open | 2 |
| nerdtree. | x | close parent of node | 1 |
| nerdtree. | X | close all child nodes of current node recursively | 2 |
| nerdtree. | e | explore selected dir | 3 |

###Bookmark Table Mappings

| Command | Default Keybinding | Description | Status |
|---|---|---|---|
| nerdtree. | o | open bookmark | 3b |
| nerdtree. | go | preview file | 3b |
| nerdtree. | go | find dir in new tree | 3b |
| nerdtree. | t | open in new tab | 3t |
| nerdtree. | T | open in new tab silently | 3t |
| nerdtree. | i | open split | 3b |
| nerdtree. | gi | preview split | 3b |
| nerdtree. | s | open vsplit | 3b |
| nerdtree. | gs | preview vsplit | 3b |
| nerdtree. | <CR> | custom open | 3b |
| nerdtree. | D | delete bookmark | 3b |

###Tree navigation mappings

| Command | Default Keybinding | Description | Status |
|---|---|---|---|
| nerdtree. | C | change root tree node to selected dir | 3 |
| nerdtree. | u | move tree root up a directory | 3 |
| nerdtree. | U | move tree root up a directory but leave old root open | 3 |
| nerdtree. | r | refresh cursor dir | 3 |
| nerdtree. | R | refresh current root | 3 |
| nerdtree. | m | show menu | 2 |
| nerdtree. | cd | change the CWD to the selected dir | 3 |
| nerdtree. | CD | change tree root to CWD | 3 |

###Tree filtering mappings

| Command | Default Keybinding | Description (default value) | Status |
|---|---|---|---|
| nerdtree. | I | hidden files (off) | 2 |
| nerdtree. | f | file filters (on) | 2 |
| nerdtree. | F | files (on) | 2 |
| nerdtree. | B | bookmarks (off) | 2 |
| nerdtree. | FL | file lines (off) | 3 |

###Other mappings

| Command | Default Keybinding | Description (default value) | Status |
|---|---|---|---|
| nerdtree. | q | close the NERDTree window | 2 |
| nerdtree. | A | Zoom the NERDTree window | 2 |
| nerdtree. | ? | toggle help | 2 |

### Configuration

These are all NERDTree settings that you can change.

| **Setting** | **Description** | **Type** | **Default** |
|:---:|:---:|:---:|:---:|
| nerdtree.hideSidebarWhenOpenFile | If this option is checked `true` ✅, the sidebar will be hidden, after you open a file from the Explorer view with `NERDTree` key ⌨️ `t` or `Enter`. Otherwise ❌, nothing will happend. | `boolean` | `true` |
| nerdtree.alwaysShowSidebar | If this option is checked `true` ✅, the sidebar will be shown everytime you switch between editor and file explorer with `NERDTree` shortcut ⌨️ `CTRL + N`. Otherwise ❌, sidebar will be toggled instead.  | `boolean` | `false` |
