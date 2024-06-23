function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

const myLibrary = [];

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);

  myLibrary.push(newBook);
  displayBooks();
  clearForm();
}

function displayBooks() {
  const booksDisplay = document.getElementById("books-display");
  booksDisplay.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.className = "book-card";
    bookCard.innerHTML = `<h3>Title:${book.title}</h3>
      <p>Author:${book.author}</p>
      <p>Pages:${book.pages}</p>
      <p>Status:${book.read ? "read" : "Not read yet"}</p>
      <button onclick="removeBook(${index})">Remove</button>
      <button onclick="toggleReadStatus(${index})">Toggle Read Status </button>

  `;
    booksDisplay.appendChild(bookCard);
  });
}
function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

function showLogin() {
  document.getElementById("register-container").classList.add("hidden");
  document.getElementById("login-container").classList.remove("hidden");
}

function ShowRegister() {
  document.getElementById("login-container").classList.add("hidden");
  document.getElementById("register-container").classList.remove("hidden");
}
document
  .getElementById("book-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;
    addBookToLibrary(title, author, pages, read);
  });

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").checked = "false ";
}
function saveUser(username, password) {
  let users = JSON.parse(localStorage.getItem("users")) || {};
  users[username] = password;
  localStorage.setItem("users", JSON.stringify(users));
}

function checkUser(username, password) {
  let users = JSON.parse(localStorage.getItem("users")) || {};
  return users[username] && users[username] === password;
}

document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (checkUser(username, password)) {
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome to the library.",
      }).then(() => {
        document.getElementById("auth-container").classList.add("hidden");
        document.getElementById("library-container").style.display = "flex";
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid username or password",
      });
    }
  });

document
  .getElementById("register-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    saveUser(username, password);
    Swal.fire({
      icon: "success",
      title: "Registration Successful!",
      text: "Please log in.",
    }).then(() => {
      showLogin();
    });
  });
