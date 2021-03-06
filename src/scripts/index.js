const addButton = document.querySelector('.add-btn');
const bookList = document.querySelector('.books-ul');
const storage = window.localStorage;
const navLinks = document.querySelectorAll('.nav-ul a');
const list = document.querySelector('section#list');
const form = document.querySelector('section#form');
const contact = document.querySelector('section#contact');

class BookHandler {
  constructor() {
    this.book = '';
    this.books = [];
    this.newBook = {
      name: '',
      title: '',
    };
  }

  addBook = () => {
    const bookName = document.querySelector('.bookname').value;
    const bookTitle = document.querySelector('.author').value;

    this.newBook = {
      name: bookName,
      title: bookTitle,
    };
    this.books.push(this.newBook);
    storage.setItem('books', JSON.stringify(this.books));
  };

  showBooks = () => {
    if (this.books.length === 0) {
      bookList.innerHTML = '<p>Sorry you have no book left. Kindly add some</p>';
    } else {
      this.book = '';
      this.books.forEach((bookObj, ind) => {
        this.book += `<li class="book-li">
    <span>${bookObj.name} ${bookObj.title}</span>
    <input type="button" class="btn rmv" data-target=${ind} value="Remove" />
  </li>`;
        bookList.innerHTML = this.book;
      });
    }
  };

  rmvBook = (e) => {
    this.books = this.books.filter(
      (book, index) => index !== Number(e.target.attributes[2].value),
    );
  };

  loadBooks = () => {
    const storedBooks = JSON.parse(localStorage.getItem('books'));
    if (storedBooks?.length) {
      this.books = [...storedBooks];
    }
  };
}

const displaySection = (arg) => {
  if (arg === '#form') {
    form.classList.add('show');
    list.classList.remove('show');
    contact.classList.remove('show');
  } else if (arg === '#contact') {
    contact.classList.add('show');
    form.classList.remove('show');
    list.classList.remove('show');
  } else {
    list.classList.add('show');
    contact.classList.remove('show');
    form.classList.remove('show');
  }
};

const getDateAndTime = () => {
  /* eslint-disable */
  const { DateTime } = luxon;
  this.today = DateTime.now();
  document.getElementById("time").innerHTML = this.today.toLocaleString(
    DateTime.DATETIME_MED
  );
  /* eslint-enable */
};

const HandlingBook = new BookHandler();
const load = () => {
  getDateAndTime();
  HandlingBook.loadBooks();
  HandlingBook.showBooks();
  list.classList.add('show');
};

window.onload = load;

bookList.addEventListener('click', (e) => {
  if (e.target.classList.contains('rmv')) {
    HandlingBook.rmvBook(e);
    storage.setItem('books', JSON.stringify(HandlingBook.books));
    HandlingBook.showBooks();
  }
});

addButton.addEventListener('click', () => {
  HandlingBook.addBook();
  HandlingBook.showBooks();
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    displaySection(link.getAttribute('href'));
  });
});
