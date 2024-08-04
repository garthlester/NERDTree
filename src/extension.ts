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
    const original = await getPathOfExplorerSelection();
    const dir = await getFolder(original);

    //fs is flexible enough that we could use / on both windows and linux, but we want to avoid confusing the user
    let dirStr = dir.fsPath;
    if (dirStr.includes("/")) {
        dirStr = dirStr + "/";
    } else {
        dirStr = dirStr + "\\";
    }

    const opts =
    {
        title: "Add:",
        //fs seems ok with / even on windows, so no need to switch between the two slashes on the input side
        //TODO: Still may want to just to avoid confusing the user though
        value: dirStr,
        placeHolder: "Enter a path",
        prompt: "Enter the file name",
        password: false,
        ignoreFocusOut: false
    };
    vscode.window.showInputBox(opts)
        .then(name => {
            if (name) {
                //TODO: Make sure we can't use this to replace an existing file
                vscode.workspace.fs.writeFile(vscode.Uri.file(name), new Uint8Array());
            }
        });
}

export async function nerdTreeMenuMove() {
    const original = await getPathOfExplorerSelection();
    const opts =
    {
        title: "Move:",
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
    const path = await getPathOfExplorerSelection();
    const opts =
    {
        title: "Delete:",
        placeHolder: "Enter a path",
        prompt: "Are you sure you want to delete " + path.fsPath + " yN",
        password: false,
        ignoreFocusOut: false
    };
    vscode.window.showInputBox(opts)
        .then(result => {
            if (result && result == "y") {
                vscode.workspace.fs.delete(path);
            }
        });
}

export async function nerdTreeMenuReveal() {
    await vscode.commands.executeCommand('revealFileInOS');
}

export async function nerdTreeMenuOpen() {
    const path = await getPathOfExplorerSelection();
    vscode.env.openExternal(path);
}

export async function nerdTreeMenuCopy() {
    const original = await getPathOfExplorerSelection();
    const opts =
    {
        title: "Copy:",
        value: original.fsPath,
        placeHolder: "Enter a path",
        prompt: "Enter the new path",
        password: false,
        ignoreFocusOut: false
    };
    vscode.window.showInputBox(opts)
        .then(name => {
            if (name) {
                vscode.workspace.fs.copy(original, vscode.Uri.file(name))
            }
        });
}

export async function nerdTreeMenuCopyPath() {
    await vscode.commands.executeCommand('copyFilePath');
}

export async function nerdTreeMenuList() { nerdTreeNotImplemented(); }

export async function nerdTreeMenuChangePermissions() { nerdTreeNotImplemented(); }

export async function nerdTreeMenuRunSystemCommand() {
    const opts =
    {
        title: "Run:",
        value: "",
        placeHolder: ">",
        prompt: "Enter a command to run",
        password: false,
        ignoreFocusOut: false
    };
    vscode.window.showInputBox(opts)
        .then(cmd => {
            if (cmd) {
                vscode.window.activeTerminal?.sendText(cmd + "\n");
            }
        });
}

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

export async function getFolder(uri: vscode.Uri): Promise<vscode.Uri> {
    //Original might be a file, or it might be a folder.
    //If it's a folder, then great, but if it's a file, we need to get the path
    //for the folder that contains it:
    const stats = await vscode.workspace.fs.stat(uri);
    if (!stats) {
        throw URIError("Could not parse URI " + uri.fsPath);
    }

    if (stats.type == vscode.FileType.File) {
        //TODO: I'm sure there's a more robust way to do this from vscode.workspace.fs
        //TODO: why won't this regex work!?!?
        //const dir = uri.fsPath.match('(.*[\\\/]).*');
        //if (dir) {
        //return vscode.Uri.file(dir[0]);
        //}
        //else {
        //throw URIError("Could not parse URI");
        //}

        let unixEnd = uri.fsPath.lastIndexOf("/");
        if (!unixEnd) { unixEnd = 0; }
        let windEnd = uri.fsPath.lastIndexOf("\\");
        if (!windEnd) { windEnd = 0; }

        const end = Math.max(unixEnd, windEnd);
        return vscode.Uri.file(uri.fsPath.slice(0, end));
    } else {
        return uri;
    }
}

//TODO: do I really need to be exporting all these functions, or just attach/detach?
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
