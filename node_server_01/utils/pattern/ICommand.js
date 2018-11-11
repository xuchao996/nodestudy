/**
 * @description 命令模式：通过构造函数去实现命令以及命令的撤销
 * @functions
 * @keywords Undo Redo
 */

function ICommand () {
	
}

function AddNode (list, index, item) {
	this.parent = list
	this.index = index
	this.new_item = item
	this.execute = function () {
		this.parent.splice(index, 0, this.new_item)
		G.UndoStack.push(this)
	}
	this.unExecute = function () {
		this.parent.splice(index, 1)
		G.RedoStack.push(this)
	}
}

function DeleteNode (list, index) {
	
}

var G = null
try{
// 	if (window) {
// 		G = window
// 	}
	if (global) {
		G = global
	}
	G.UndoStack = []
	G.RedoStack = []
}catch(e){
	//TODO handle the exception
	console.log(e)
}




function Editor () {
	this.redo = function () {
		G.UndoStack = []
		var cmd = G.UndoStack.pop()
		cmd && cmd.execute()
	}
	this.undo = function () {
		var cmd = G.UndoStack.pop()
		cmd && cmd.execute()
	}
	this.add = function (list, index, item) {
		var cmd = new AddNode(list, index, item);
		if (cmd) cmd.execute()
	}
}

exports.Editor = Editor;

