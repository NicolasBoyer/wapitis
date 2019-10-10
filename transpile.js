#!/usr/bin/env node

"use strict";

const files = require("./tools/files");
const tools = require("./tools/tools");

// Permet de créer la librairie avec l'aide du tsconfig et de ce qui est dans src (avec namespace et export) dans le dossier library
files.remove("./test_lithtml/node_modules/wapitis/library");
tools.runCommand("tsc");
// files.copy("./src/icons.svg", "./test_lithtml/node_modules/wapitis/library/icons.svg");

// A remettre pour prod
// files.remove("./library");
// tools.runCommand("tsc");
// files.copy("./src/icons.svg", "./library/icons.svg");