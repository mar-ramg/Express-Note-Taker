var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
var activeNote = {};

// A function for getting all notes from the db
var getNotes = function () {
    return $.ajax({
      url: "/api/notes",
      method: "GET"
    });
  };

// A function for saving a note to the db
var saveNote = function (note) {
    return $.ajax({
      url: "/api/notes",
      data: note,
      method: "POST"
    });
  };
  
  // A function for deleting a note from the db
  var deleteNote = function (id) {
    return $.ajax({
      url: "api/notes/" + id,
      method: "DELETE"
    });
  };

// If there is an activeNote, display it, otherwise render empty inputs
var renderActiveNote = function () {
    $saveNoteBtn.hide();
  
    if (activeNote.id) {
      $noteTitle.attr("readonly", true);
      $noteText.attr("readonly", true);
      $noteTitle.val(activeNote.title);
      $noteText.val(activeNote.text);
    } else {
      $noteTitle.attr("readonly", false);
      $noteText.attr("readonly", false);
      $noteTitle.val("");
      $noteText.val("");
    }
  };

// Get the note data from the inputs, save it to the db and update the view
var handleNoteSave = function () {
    var newNote = {
      title: $noteTitle.val(),
      text: $noteText.val()
    };
  
    saveNote(newNote).then(function (data) {
      getAndRenderNotes();
      renderActiveNote();
    });
  };

// Delete the clicked note
var handleNoteDelete = function (event) {
    // prevents the click listener for the list from being called when the button inside of it is clicked
    event.stopPropagation();
  
    var note = $(this)
      .parent(".list-group-item")
      .data();
  
    if (activeNote.id === note.id) {
      activeNote = {};
    }
  
    deleteNote(note.id).then(function () {
      getAndRenderNotes();
      renderActiveNote();
    });
  };

