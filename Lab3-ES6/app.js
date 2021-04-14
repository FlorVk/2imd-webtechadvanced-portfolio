class Note {
    constructor(title) {
      this.title = title;
      // HINT🤩 this.element = this.createElement(title);
      this.element = this.createElement(title);
    }
  
    createElement(title) {
      let newNote = document.createElement("li");
  
      // HINT🤩 newNote.addEventListener('click', this.remove.bind(newNote));
      newNote.innerHTML = title;
      newNote.addEventListener('click', this.remove.bind(newNote));
      return newNote;
      
    }
  
    add() {
      // HINT🤩
      // this function should append the note to the screen somehow
      document.querySelector('#taskList').appendChild(this.element).innerHTML = this.title;
    }
  
    saveToStorage() {
      // HINT🤩
      // localStorage only supports strings, not arrays
      // if you want to store arrays, look at JSON.parse and JSON.stringify
      if(localStorage.getItem("input") === null){
        let input = [];
        input.push(this.title);
        localStorage.setItem("input", JSON.stringify(input));
      }
      else {
        let input = JSON.parse(localStorage.getItem("input"));
        input.push(this.title);
        localStorage.setItem ("input", JSON.stringify(input));
      }
    }
  
    remove() {
      // HINT🤩 the meaning of 'this' was set by bind() in the createElement function
      // in this function, 'this' will refer to the current note element
      // .removeChild(this)
      // remove the item from screen and from localstorage

      document.querySelector("#taskList").removeChild(this);
      let note = JSON.parse(localStorage.getItem("input"));
      let index = note.indexOf(this.innerHTML);
      note.splice(index, 1);
      localStorage.setItem("input", JSON.stringify(note));
    }
  }
  
  class App {
    constructor() {
      console.log("👊🏼 The Constructor!");

      this.txtTodo = document.querySelector("#taskInput");
      this.txtTodo.addEventListener("keypress", this.createNote.bind(this));
      this.loadNotesFromStorage();
  
      // HINT🤩
      // pressing the enter key in the text field triggers the createNote function
      // this.txtTodo = ???
      // this.txtTodo.addEventListener("keypress", this.createNote.bind(this));
      // read up on .bind() -> we need to pass the current meaning of this to the eventListener
      // when the app loads, we can show previously saved noted from localstorage
      // this.loadNotesFromStorage();
    }
  
    loadNotesFromStorage() {
      // HINT🤩
      // load all notes from storage here and add them to the screen
      let loadList = JSON.parse(localStorage.getItem("input"));

      if (loadList !== null)
      for (let i = 0;i < loadList.length; i++){
        let loadNote = new Note(loadList[i]);
        loadNote.add();
      }
    }
  
    createNote(e) {
      // this function should create a new note by using the Note() class
      // HINT🤩
      // note.add();
      // note.saveToStorage();
      // clear the text field with .reset in this class
      // if (e.key === "Enter")

      if (e.keyCode === 13){
        let note = new Note(this.txtTodo.value);
        note.add();
        note.saveToStorage();
        this.reset();
        e.preventDefault();
      }
    }
  
    reset() {
      // this function should reset the form / clear the text field
      this.txtTodo.value = "";
    }
  }
  
  let app = new App();
  