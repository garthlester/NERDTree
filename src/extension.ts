import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    try {
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
    } catch (error) {
        vscode.commands.executeCommand('vscode.window.showErrorMessage', `${error}`);
    }
}

//Just to reduce boilerplate
export function nerdTreeCommand(context: vscode.ExtensionContext, name: string, f: Function) {
    context.subscriptions.push(vscode.commands.registerCommand(name, () => f()));
}

export async function nerdTreeNotImplemented() {
    if (!vscode.workspace.getConfiguration().get('nerdtree.suppressNotImplementedErrors')) {
        await vscode.commands.executeCommand('vscode.window.showErrorMessage', 'NERDTree: function not implemented');
    }
}

export async function nerdTreeMenuAdd() {
    await vscode.commands.executeCommand('workbench.files.action.createFileFromExplorer');
}

export async function nerdTreeMenuMove() {
    const original = await getPathOfExplorerSelection();
    const opts =
    {
        title: "New path",
        value: original.fsPath,
        placeHolder: "Enter a path",
        prompt: "Enter the new path",
        password: false,
        ignoreFocusOut: false
    };
    vscode.window.showInputBox(opts)
        .then(name => {
            if (name) {
                vscode.workspace.fs.rename(original, vscode.Uri.file(name))
            }
        });
}

export async function nerdTreeMenuDelete() {
    //TODO: will this work for folders too?
    //TODO: use a workspace edit for more fine-grained control
    //var edit = new vscode.WorkspaceEdit();
    //edit.deleteFile(
    await vscode.commands.executeCommand('moveFileToTrash');
}

export async function nerdTreeMenuReveal() {
    //TODO: there should be a built-in reveal command. Look at default keybinding for Ctrl+Alt+R
    await nerdTreeNotImplemented();
}

export async function nerdTreeMenuOpen() {
    //TODO: look into vscode.env.openExternal
    await nerdTreeNotImplemented();
}

export async function nerdTreeMenuCopy() {
    //TODO: use an input box to get destimation so we don't need a separate paste command
    await vscode.commands.executeCommand('filesExplorer.copy');
}

export async function nerdTreeMenuCut() {
    //TODO: remove once move is working
    await vscode.commands.executeCommand('filesExplorer.cut');
}

export async function nerdTreeMenuPaste() {
    //TODO: remove once move is working
    await vscode.commands.executeCommand('filesExplorer.paste');
}

export async function nerdTreeMenuCopyPath() {
    await vscode.commands.executeCommand('copyFilePath');
}

export async function nerdTreeMenuList() { nerdTreeNotImplemented(); }

export async function nerdTreeMenuChangePermissions() { nerdTreeNotImplemented(); }

export async function nerdTreeMenuRunSystemCommand() { nerdTreeNotImplemented(); }

export async function getPathOfExplorerSelection(): Promise<vscode.Uri> {
    //You'd think this would be simple, but it turns out getting the currently
    //selected item in file explorer has been a thorn in developer's collective
    //sides for a while now:
    //https://github.com/Microsoft/vscode/issues/3553

    //This is the insane workaround that we have to deal with for now:

    //We need to use the clipboard, but we don't want to interfere with
    //whatever the user has copied, so first, lets cache the clipboard contents
    const clipboardCache = await vscode.env.clipboard.readText();

    //Now the 'copyFilePath' command will copy the path of whatever we have selected
    await vscode.commands.executeCommand('copyFilePath');
    const path = await vscode.env.clipboard.readText();

    //Then we swap the cached value back into the clipboard before anyone notices
    await vscode.env.clipboard.writeText(clipboardCache);

    return vscode.Uri.file(path);
}

export async function nerdTreeOpenFile() {
    await vscode.commands.executeCommand('explorer.openAndPassFocus');
}

export async function nerdTreePreviewFile() {
    await vscode.commands.executeCommand('filesExplorer.openFilePreserveFocus');
}

export async function nerdTreeOpenVSplit() {
    await vscode.commands.executeCommand('explorer.openToSide');
}

export async function nerdTreePreviewVSplit() {
    await vscode.commands.executeCommand('explorer.openToSide');
    await vscode.commands.executeCommand('workbench.files.action.focusFilesExplorer');
}

export async function nerdTreeToggleNode() {
    await vscode.commands.executeCommand('list.select');
}

export async function nerdTreeRecursivelyOpenNode() { nerdTreeNotImplemented(); }

export async function nerdTreeCloseParentOfNode() {
    await vscode.commands.executeCommand('workbench.files.action.collapseExplorerFolders');
}

export async function nerdTreeCloseChildNodesRecursively() { nerdTreeNotImplemented(); }

export async function nerdTreeToggleHiddenFiles() { nerdTreeNotImplemented(); }

export async function nerdTreeClose() {
    if (vscode.workspace.getConfiguration().get('nerdtree.alwaysShowSidebar')) {
        await vscode.commands.executeCommand('workbench.action.focusActiveEditorGroup');
    } else {
        await vscode.commands.executeCommand('workbench.action.toggleSidebarVisibility');
    }
}

export async function nerdTreeZoom() { await nerdTreeNotImplemented(); }

export async function nerdTreeHelp() { await nerdTreeNotImplemented(); }

export function nerdTreeDeactivate() { }
