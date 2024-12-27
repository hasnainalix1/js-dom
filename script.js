const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("change", (e) => {
    document.body.classList.toggle("dark-mode", e.target.checked);
});

let inputs = document.getElementById("input");
let taskCards = document.querySelector(".task-cards");

function Add() {
    if (inputs.value === "") {
        Swal.fire({
            title: "Soory!",
            text: "You need to add something! Your text cannot be empty.?",
            icon: "question",
            showClass: {
                popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `
              },
              hideClass: {
                popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `
              }
          });
    } else {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <div class="card-header">
                <h3 class="task-title">${inputs.value}</h3>
            </div>
            <div class="card-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
            <div class="card-list">
                <input type="text" class="list-input" placeholder="Add a subtask" />
                <button class="add-subtask-btn">Add Subtask</button>
                <ul class="subtask-list"></ul>
            </div>
        `;
        
        taskCards.appendChild(card);
        inputs.value = "";

        card.querySelector(".edit-btn").addEventListener("click", () => {
            let newTask = prompt("Edit your task:", card.querySelector(".task-title").innerText);
            if (newTask !== null && newTask !== "") {
                card.querySelector(".task-title").innerText = newTask;
            }
        });

        card.querySelector(".delete-btn").addEventListener("click", () => {
            Swal.fire({
                title: 'Are you sure?',
                text: "This task will be deleted!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    card.remove();
                    Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
                }
            });
        });

        card.querySelector(".add-subtask-btn").addEventListener("click", () => {
            let subtaskInput = card.querySelector(".list-input");
            let subtaskText = subtaskInput.value.trim();
            if (subtaskText === "") {
                Swal.fire({
                    title: "Soory!",
                    text: "You need to add something! Your subtask cannot be empty.?",
                    icon: "info",
                    showClass: {
                        popup: `
                          animate__animated
                          animate__fadeInUp
                          animate__faster
                        `
                      },
                      hideClass: {
                        popup: `
                          animate__animated
                          animate__fadeOutDown
                          animate__faster
                        `
                      }
                  });
            } else {
                let subtask = document.createElement("li");
                subtask.innerHTML = `${subtaskText} <i class="fa-solid fa-xmark"></i>`;
                card.querySelector(".subtask-list").appendChild(subtask);
                subtaskInput.value = "";

                subtask.querySelector("i").addEventListener("click", () => {
                    subtask.remove();
                });
            }
        });

        card.querySelector(".list-input").addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                let subtaskInput = card.querySelector(".list-input");
                let subtaskText = subtaskInput.value.trim();
                if (subtaskText === "") {
                    alert("Subtask cannot be empty!");
                } else {
                    let subtask = document.createElement("li");
                    subtask.innerHTML = `${subtaskText} <i class="fa-solid fa-xmark"></i>`;
                    card.querySelector(".subtask-list").appendChild(subtask);
                    subtaskInput.value = "";

                    subtask.querySelector("i").addEventListener("click", () => {
                        subtask.remove();
                    });
                }
            }
        });
    }
}

inputs.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        Add(); 
    }
});
