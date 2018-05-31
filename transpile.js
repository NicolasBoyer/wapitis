#!/usr/bin/env node

"use strict";

const files = require("./lib/files");
const tools = require("./lib/tools");

files.remove("./library");
tools.runCommand("tsc");
files.copy("./src/icons.svg", "./library/icons.svg");