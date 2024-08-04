import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    try {
        register(context, 'nerdtree.notImplemented', notImplemented);
        register(context, 'nerdtree.openFile', openFile);
        register(context, 'nerdtree.previewFile', previewFile);
        register(context, 'nerdtree.openVSplit', openVSplit);
        register(context, 'nerdtree.previewVSplit', previewVSplit);
        register(context, 'nerdtree.toggleNode', toggleNode);
        register(context, 'nerdtree.recursivelyOpenNode', recursivelyOpenNode);
        register(context, 'nerdtree.closeParentOfNode', closeParentOfNode);
        register(context, 'nerdtree.recursivelyCloseChildren', closeChildNodesRecursively);
        register(context, 'nerdtree.toggleHiddenFiles', toggleHiddenFiles);
        register(context, 'nerdtree.close', close);
        register(context, 'nerdtree.zoom', zoom);
        register(context, 'nerdtree.help', help);
        register(context, 'nerdtree.menu.add', menuAdd);
        register(context, 'nerdtree.menu.move', menuMove);
        register(context, 'nerdtree.menu.delete', menuDelete);
        register(context, 'nerdtree.menu.reveal', menuReveal);
        register(context, 'nerdtree.menu.open', menuOpen);
        register(context, 'nerdtree.menu.copy', menuCopy);
        register(context, 'nerdtree.menu.copyPath', menuCopyPath);
        register(context, 'nerdtree.menu.list', menuList);
        register(context, 'nerdtree.menu.changePermissions', menuChangePermissions);
        register(context, 'nerdtree.menu.runSystemCommand', menuRunSystemCommand);
    } catch (error) {
        vscode.commands.executeCommand('vscode.window.showErrorMessage', `${error}`);
    }
}

//Just to reduce boilerplate
function register(context: vscode.ExtensionContext, name: string, f: Function) {
    context.subscriptions.push(vscode.commands.registerCommand(name, () => f()));
}

async function notImplemented() {
    if (!vscode.workspace.getConfiguration().get('nerdtree.suppressNotImplementedErrors')) {
        await vscode.commands.executeCommand('vscode.window.showErrorMessage', 'NERDTree: function not implemented');
    }
}

async function menuAdd() {
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

async function menuMove() {
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

async function menuDelete() {
    const path = await getPathOfExplorerSelection();
    const opts =
    {
        title: "Delete:",
        placeHolder: "yN",
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

async function menuReveal() {
    await vscode.commands.executeCommand('revealFileInOS');
}

async function menuOpen() {
    const path = await getPathOfExplorerSelection();
    vscode.env.openExternal(path);
}

async function menuCopy() {
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

async function menuCopyPath() {
    await vscode.commands.executeCommand('copyFilePath');
}

async function menuList() { notImplemented(); }

async function menuChangePermissions() { notImplemented(); }

async function menuRunSystemCommand() {
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

async function getPathOfExplorerSelection(): Promise<vscode.Uri> {
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

async function getFolder(uri: vscode.Uri): Promise<vscode.Uri> {
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

async function openFile() {
    await vscode.commands.executeCommand('explorer.openAndPassFocus');
}

async function previewFile() {
    await vscode.commands.executeCommand('filesExplorer.openFilePreserveFocus');
}

async function openVSplit() {
    await vscode.commands.executeCommand('explorer.openToSide');
}

async function previewVSplit() {
    await vscode.commands.executeCommand('explorer.openToSide');
    await vscode.commands.executeCommand('workbench.files.action.focusFilesExplorer');
}

async function toggleNode() {
    await vscode.commands.executeCommand('list.select');
}

async function recursivelyOpenNode() { notImplemented(); }

async function closeParentOfNode() {
    await vscode.commands.executeCommand('workbench.files.action.collapseExplorerFolders');
}

async function closeChildNodesRecursively() { notImplemented(); }

async function toggleHiddenFiles() { notImplemented(); }

async function close() {
    if (vscode.workspace.getConfiguration().get('nerdtree.alwaysShowSidebar')) {
        await vscode.commands.executeCommand('workbench.action.focusActiveEditorGroup');
    } else {
        await vscode.commands.executeCommand('workbench.action.toggleSidebarVisibility');
    }
}

async function zoom() { await notImplemented(); }

async function help() { await notImplemented(); }

export function deactivate() { }
