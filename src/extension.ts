// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import fs = require("fs");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
const changeTerminal = (name: string) => {
  const FILE = "C:/Users/akuma/AppData/Roaming/Code/User/settings.json";
  fs.readFile(FILE, "utf8", (err: any, data: string) => {
    if (err) {
      vscode.window.showInformationMessage("Cannot change terminal");
      return;
    }
    const dataJson: any = JSON.parse(data);
    dataJson["terminal.integrated.defaultProfile.windows"] = name;
    fs.writeFile(FILE, JSON.stringify(dataJson, null, 2), (err: any) => {
      if (err) {
        vscode.window.showInformationMessage("Cannot change terminal");
        return;
      }
      vscode.window.showInformationMessage(`Changed terminal to ${name}`);
    });
  });
};

export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "terminal-switcher" is now active!'
  );

  const currentlyOpenTabfilePath =
    vscode.window.activeTextEditor?.document.fileName;

  if (currentlyOpenTabfilePath?.endsWith(".cpp")) {
    changeTerminal("Powershell");
  } else {
    changeTerminal("Git Bash");
  }
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
}

// this method is called when your extension is deactivated
export function deactivate() {}
