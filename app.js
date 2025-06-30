document.addEventListener("DOMContentLoaded", () => {
  // Load name and avatar
  const userName = localStorage.getItem("name");
  if (!userName) {
    window.location.href = "index.html";
    return;
  }

  document.getElementById("welcome").innerText = `${userName}`;
  document.getElementById(
    "avatar"
  ).src = `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(
    userName
  )}`;

  // Sign out
  document.getElementById("signOut").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const todoList = document.getElementById("todoList");
  const completedList = document.getElementById("completedList");
  const archivedList = document.getElementById("archivedList");

  const todoCount = document.getElementById("todoCount");
  const completedCount = document.getElementById("completedCount");
  const archivedCount = document.getElementById("archivedCount");

  function updateCounts() {
    todoCount.innerText = tasks.filter((t) => t.stage === "todo").length;
    completedCount.innerText = tasks.filter(
      (t) => t.stage === "completed"
    ).length;
    archivedCount.innerText = tasks.filter(
      (t) => t.stage === "archived"
    ).length;
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    todoList.innerHTML = "";
    completedList.innerHTML = "";
    archivedList.innerHTML = "";
  
    tasks.forEach((task) => {
      const li = document.createElement("li");
  
      
      const textTimeContainer = document.createElement("div");
      textTimeContainer.classList.add("text_time_container");
  
      const textDiv = document.createElement("div");
      textDiv.innerText = task.text;
  
      const timeUpdate = document.createElement("div");
      timeUpdate.innerText = `Last modified at:\n ${task.updatedAt})`;
      timeUpdate.classList.add("text_container")
     
      textTimeContainer.appendChild(textDiv);
      textTimeContainer.appendChild(timeUpdate);
  
     
      li.appendChild(textTimeContainer);
  
      const btnContainer = document.createElement("div");
      btnContainer.classList.add("div_button");
  
      const completeBtn = document.createElement("button");
      const archiveBtn = document.createElement("button");
  
      if (task.stage === "todo") {
        completeBtn.innerText = "Mark as completed";
        completeBtn.classList.add("task_complete_button");
        completeBtn.addEventListener("click", () => {
          task.stage = "completed";
          task.updatedAt = new Date().toLocaleString();
          saveTasks();
          renderTasks();
        });
  
        archiveBtn.innerText = "Archive";
        archiveBtn.classList.add("task_archive_button");
        archiveBtn.addEventListener("click", () => {
          task.stage = "archived";
          task.updatedAt = new Date().toLocaleString();
          saveTasks();
          renderTasks();
        });
  
        btnContainer.appendChild(completeBtn);
        btnContainer.appendChild(archiveBtn);
  
        li.appendChild(btnContainer);
        todoList.appendChild(li);
      } else if (task.stage === "completed") {
        archiveBtn.innerText = "Archive";
        archiveBtn.addEventListener("click", () => {
          task.stage = "archived";
          task.updatedAt = new Date().toLocaleString();
          saveTasks();
          renderTasks();
        });
  
        btnContainer.appendChild(archiveBtn);
  
        li.appendChild(btnContainer);
        completedList.appendChild(li);
      } else if (task.stage === "archived") {
        archivedList.appendChild(li);
      }
    });
  
    updateCounts();
  }
  
  

  document.getElementById("addTask").addEventListener("click", () => {
    const newTaskInput = document.getElementById("newTask");
    const text = newTaskInput.value.trim();
    if (!text) {
      alert("Please enter a task");
      return;
    }

    const newTask = {
      text,
      stage: "todo",
      updatedAt: new Date().toLocaleString(),
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    newTaskInput.value = "";
  });

  renderTasks();

  const todo = document.getElementById("todoSection");
  todo.style.display = "block";
  const todoDiv = document.querySelector('.task_choose[data-type="todo"]');
  todoDiv.classList.add("active");

  document.querySelectorAll(".task_choose").forEach((button) => {
    button.addEventListener("click", () => {
      document
        .querySelectorAll(".task_choose")
        .forEach((el) => el.classList.remove("active"));
      button.classList.add("active");
      document.getElementById("todoSection").style.display = "none";
      document.getElementById("completedSection").style.display = "none";
      document.getElementById("archivedSection").style.display = "none";

      // Get clicked type
      const type = button.getAttribute("data-type");

      // Show selected section
      if (type === "todo") {
        document.getElementById("todoSection").style.display = "block";
      } else if (type === "completed") {
        document.getElementById("completedSection").style.display = "block";
      } else if (type === "archived") {
        document.getElementById("archivedSection").style.display = "block";
      }
    });
  });
});
