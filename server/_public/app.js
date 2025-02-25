

const app = (function(){

    const url = 'https://localhost:8000/api/books';

    const screens ={
     "home":   document.getElementById('home_container'),        
     "books":   document.getElementById('books_container'),
     "book_details": document.getElementById('book_details_container'),
    }

    function activate(currentScreen){
        for(let screen in screens){
            screens[screen].style.display= (screen===currentScreen) ? 'block' :'none';
        }
    }

    function set(id, value){
        document.getElementById(id).innerHTML=value;

    }


    async function getAllBooks(){
        activate('books');
        let response = await fetch(url);
        let books = await response.json();
        //console.log('books',books);
        showBooks(books);       
    }

    async function selectBook(bookId){
        activate('book_details');
        let response = await fetch(`${url}/${bookId}`);
        let book = await response.json();
        //console.log('book',book);
        showBookDetails(book);
    }

    function showBookDetails(book){
        set('book_title', book.title);
        set('book_price', book.price||"Free");
        set('book_author',book.author)
        set('book_details', book.description);
        document.getElementById('book_cover_big').src=book.cover;
    }

    function showBooks(books){
        let bookList = document.getElementById('books');
        let rows= books.map(book=>`
            <tr onclick="app.selectBook('${book.id}')">
                <td>
                    <img height="100" src="${book.cover}" alt="${book.title}" />
                </td>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.price}</td>
            </tr>
        `).join('');


        bookList.innerHTML = rows;
       
    }

    //getAllBooks();

    activate('home');

    return {
        getAllBooks,
        selectBook
    }


})();