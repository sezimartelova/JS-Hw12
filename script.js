function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

function UI() {}

UI.prototype.addBook = function (book) {
  const list = document.getElementById("book-list");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${book.title}
    <td>${book.author}
    <td>${book.isbn}
    <td><a href="#" class="delete">X</a></td>`;

  list.appendChild(row);
};

UI.prototype.alert = function (msg, className) {
  const div = document.createElement("div");
  div.className = `alert ${className}`;

  div.appendChild(document.createTextNode(msg));
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  container.insertBefore(div, form);

  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 7000);
};

UI.prototype.clear = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

document.getElementById("book-form").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);
  const ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.alert("Заполните все поля!", "error");
  } else {
    const book = new Book(title, author, isbn);
    const ui = new UI();
    ui.addBook(book);
    ui.alert("Книга добавлена!", "success");
    ui.clear();
  }
  e.preventDefault();

  UI.prototype.delete = function (tr) {
    if (tr.className === "delete") {
      tr.parentElement.parentElement.remove();
    }
  };

  document.querySelector("#book-list").addEventListener("click", function (e) {
    const ui = new UI();
    ui.delete(e.target);
  });
});
