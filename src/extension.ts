import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    nerdTreeCommand(context, 'nerdtree.notImplemented', nerdTreeNotImplemented);
    nerdTreeCommand(context, 'nerdtree.openFile', nerdTreeOpenFile);
    nerdTreeCommand(context, 'nerdtree.previewFile', nerdTreePreviewFile);
    nerdTreeCommand(context, 'nerdtree.openVSplit', nerdTreeOpenVSplit);
    nerdTreeCommand(context, 'nerdtree.previewVSplit', nerdTreePreviewVSplit);
    nerdTreeCommand(context, 'nerdtree.toggleNode', nerdTreeToggleNode);
    nerdTreeCommand(context, 'nerdtree.recursivelyOpenNode', nerdTreeRecursivelyOpenNode);
    nerdTreeCommand(context, 'nerdtree.closeParentOfNode', nerdTreeCloseParentOfNode);
    nerdTreeCommand(context, 'nerdtree.recursivelyCloseChildren', nerdTreeCloseChildNodesRecursively);
    nerdTreeCommand(context, 'nerdtree.toggleHiddenFiles', nerdTreeToggleHiddenFiles);
    nerdTreeCommand(context, 'nerdtree.close', nerdTreeClose);
    nerdTreeCommand(context, 'nerdtree.zoom', nerdTreeZoom);
    nerdTreeCommand(context, 'nerdtree.help', nerdTreeHelp);

    nerdTreeCommand(context, 'nerdtree.menu.add', nerdTreeMenuAdd);
    nerdTreeCommand(context, 'nerdtree.menu.move', nerdTreeMenuMove);
    nerdTreeCommand(context, 'nerdtree.menu.delete', nerdTreeMenuDelete);
    nerdTreeCommand(context, 'nerdtree.menu.reveal', nerdTreeMenuReveal);
    nerdTreeCommand(context, 'nerdtree.menu.open', nerdTreeMenuOpen);
    nerdTreeCommand(context, 'nerdtree.menu.copy', nerdTreeMenuCopy);
    nerdTreeCommand(context, 'nerdtree.menu.cut', nerdTreeMenuCut);
    nerdTreeCommand(context, 'nerdtree.menu.paste', nerdTreeMenuPaste);
    nerdTreeCommand(context, 'nerdtree.menu.copyPath', nerdTreeMenuCopyPath);
    nerdTreeCommand(context, 'nerdtree.menu.list', nerdTreeMenuList);
    nerdTreeCommand(context, 'nerdtree.menu.changePermissions', nerdTreeMenuChangePermissions);
    nerdTreeCommand(context, 'nerdtree.menu.runSystemCommand', nerdTreeMenuRunSystemCommand);
}

export function nerdTreeMenuAdd() {
    vscode.commands.executeCommand('workbench.files.action.createFileFromExplorer');
}
export function nerdTreeMenuMove() {
    vscode.commands.executeCommand('renameFile');
}
export function nerdTreeMenuDelete() {
    //TODO: will this work for folders too?
    vscode.commands.executeCommand('moveFileToTrash');
}
export function nerdTreeMenuReveal() {
    nerdTreeNotImplemented();
}
export function nerdTreeMenuOpen() {
    nerdTreeNotImplemented();
}
export function nerdTreeMenuCopy() {
    vscode.commands.executeCommand('filesExplorer.copy');
}
export function nerdTreeMenuCut() {
    vscode.commands.executeCommand('filesExplorer.cut');
}
export function nerdTreeMenuPaste() {
    vscode.commands.executeCommand('filesExplorer.paste');
}
export function nerdTreeMenuCopyPath() {
    nerdTreeNotImplemented();
}
export function nerdTreeMenuList() {
    nerdTreeNotImplemented();
}
export function nerdTreeMenuChangePermissions() {
    nerdTreeNotImplemented();
}
export function nerdTreeMenuRunSystemCommand() {
    nerdTreeNotImplemented();
}

export function nerdTreeCommand(context: vscode.ExtensionContext, name: string, f: Function) {
    context.subscriptions.push(vscode.commands.registerCommand(name, () => f()));
}
export function nerdTreeNotImplemented() {
    if (vscode.workspace.getConfiguration().get('nerdtree.suppressNotImplementedErrors')) {
        //Do nothing
    } else {
        vscode.commands.executeCommand('vscode.window.showErrorMessage', 'NERDTree: function not implemented');
    }
}
export function nerdTreeOpenFile() {
    vscode.commands.executeCommand('explorer.openAndPassFocus');
}
export function nerdTreePreviewFile() {
    vscode.commands.executeCommand('filesExplorer.openFilePreserveFocus');
}
export function nerdTreeOpenVSplit() {
    vscode.commands.executeCommand('explorer.openToSide');
}
export function nerdTreePreviewVSplit() {
    vscode.commands.executeCommand('explorer.openToSide');
    vscode.commands.executeCommand('workbench.files.action.focusFilesExplorer');
}
export function nerdTreeToggleNode() {
    vscode.commands.executeCommand('list.select');
}
export function nerdTreeRecursivelyOpenNode() {
    nerdTreeNotImplemented();
}
export function nerdTreeCloseParentOfNode() {
    vscode.commands.executeCommand('workbench.files.action.collapseExplorerFolders');
}
export function nerdTreeCloseChildNodesRecursively() {
    nerdTreeNotImplemented();
}
export function nerdTreeToggleHiddenFiles() {
    nerdTreeNotImplemented();
}
export function nerdTreeClose() {
    if (vscode.workspace.getConfiguration().get('nerdtree.alwaysShowSidebar')) {
        vscode.commands.executeCommand('workbench.action.focusActiveEditorGroup');
    } else {
        vscode.commands.executeCommand('workbench.action.toggleSidebarVisibility');
    }
}
export function nerdTreeZoom() {
    nerdTreeNotImplemented();
}
export function nerdTreeHelp() {
    nerdTreeNotImplemented();
}

export function nerdTreeDeactivate() { }
