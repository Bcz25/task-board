// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));
let newTask = {
    id: generateTaskId(),
    name: $('#task-title').val(),
    description: $('#new-task').val(),
    dueDate: $('#due-date').val()
};
// Todo: create a function to generate a unique task id
function generateTaskId() {
    let randomNumber = Math.floor(Math.random() * 1000000);
    let timestamp = Date.now().toString();
    let taskId = timestamp + randomNumber;
    return taskId;
}

// Todo: create a function to create a task card
function createTaskCard(newTask) {
    let $taskCard = $("<div>").addClass("task-card").attr("id", "task-" + generateTaskId());
    let $taskTitle =$("<h3>").addClass("task-title").text(newTask.name);
    let $taskContent = $("<div>").addClass("task-Content").text(newTask.description);
    let $taskDate = $("<div>").addClass("task-date").text(newTask.dueDate); 
    let $deleteButton = $("<button>").addClass("delete-button").text("Delete").click(handleDeleteTask);
    $taskCard.append($taskTitle, $taskContent, $taskDate, $deleteButton);
    return $taskCard;
}


// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    if (Array.isArray(newTask))
        
        newTask.forEach(function(newTask) {
            $(".task-list").append(createTaskCard(newTask));
    });
}


// Todo: create a function to handle adding a new task
function handleAddTask(event){
    taskList.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    $(".task-list").append(createTaskCard(newTask));
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    $(".task-card").remove()
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

$('#add-task').on('click', function() {
    $('#taskModal').modal('show');
  });
  
  $('#datepicker').datepicker( {
      format: 'yyyy-mm-dd',
      autoclose: true
  });
  
  $('#close-btn').on('click', function() {
      $('#taskModal').modal('hide');
  });
  
  $('#x-btn').on('click', function() {
      $('#taskModal').modal('hide');
  });
  
  $('#create-btn').on('click', function() {
    handleAddTask();
  });

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();
});
