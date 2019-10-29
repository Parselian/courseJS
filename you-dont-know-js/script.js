let body = document.querySelector('body'),
    books = document.querySelector('.books'),
    book = document.querySelectorAll('.book'),
    bookTitles = document.querySelectorAll('.book > h2 > a'),
    ads = document.querySelector('.adv'),
    chapterList = book[0].querySelector('.book > ul'),
    chapterList2 = book[5].querySelector('.book > ul'),
    chapterList3 = book[2].querySelector('.book > ul'),
    chapter = chapterList.querySelectorAll('.book > ul > li'),
    chapter2 = chapterList2.querySelectorAll('.book > ul > li'),
    chapter3 = chapterList3.querySelectorAll('.book > ul > li');



function manageBooksAndBg() {
  body.style.backgroundImage = "url('image/you-dont-know-js.jpg')";

  books.insertBefore(book[1], book[0]);
  books.insertBefore(book[4], book[2]);
  books.insertBefore(book[3], book[2]);
  books.insertBefore(book[2], null);

  bookTitles[4].textContent = 'Книга 3. this и Прототипы Объектов';

  body.removeChild(ads);
}

function manageChapters() {

  /* Меняем заголовки во второй книге */
  chapterList.insertBefore(chapter[2], chapter[10]);
  chapterList.insertBefore(chapter[7], chapter[9]);
  chapterList.insertBefore(chapter[5], chapter[7]);
  chapterList.insertBefore(chapter[4], chapter[5]);

  /* Меняем заголовки в 6-й книге */
  chapterList2.insertBefore(chapter2[8], chapter2[10]);
  chapterList2.insertBefore(chapter2[5], chapter2[8]);
  chapterList2.insertBefore(chapter2[7], chapter2[5]);
  chapterList2.insertBefore(chapter2[6], chapter2[7]);
  chapterList2.insertBefore(chapter2[2], chapter2[6]);
  chapterList2.insertBefore(chapter2[4], chapter2[2]);
  chapterList2.insertBefore(chapter2[3], chapter2[4]);

  /* Добавляем восьмую главу в шестую книгу */
  let newChapter = document.createElement('li');
  newChapter.innerHTML = '<li>Глава 8: За пределами ES6</li>';
  chapterList3.insertBefore(newChapter, chapter3[9]);

}

manageBooksAndBg();
manageChapters();