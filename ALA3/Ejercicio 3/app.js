const { rl } = require("./rl");
const { ListaTareas } = require("./tareas");
const { MenuTareas } = require("./menus");

new MenuTareas(rl, new ListaTareas()).menuPrincipal();