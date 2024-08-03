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
}

export function nerdTreeCommand(context: vscode.ExtensionContext, name: string, func: Function) {
    context.subscriptions.push(vscode.commands.registerCommand(name, func));
}
export function nerdTreeNotImplemented() {
    vscode.commands.executeCommand('vscode.window.showErrorMessage', 'NERDTree: function not implemented');
}
export function nerdTreeOpenFile(){
    vscode.commands.executeCommand('explorer.openAndPassFocus');
    if (vscode.workspace.getConfiguration().get('nerdtree.hideSidebarWhenOpenFile')) {
        vscode.commands.executeCommand('workbench.action.toggleSidebarVisibility');
    }
}
export function nerdTreePreviewFile() {
    nerdTreeNotImplemented();
}
export function nerdTreeOpenVSplit() {
    nerdTreeNotImplemented();
}
export function nerdTreePreviewVSplit() {
    nerdTreeNotImplemented();
}
export function nerdTreeToggleNode() {
    vscode.commands.executeCommand('list.select');
}
export function nerdTreeRecursivelyOpenNode() {
    nerdTreeNotImplemented();
}
export function nerdTreeCloseParentOfNode() {
    nerdTreeNotImplemented();
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

export function nerdTreeDeactivate() {}
