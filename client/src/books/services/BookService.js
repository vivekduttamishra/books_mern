import http from './util/http';

const  baseUrl= 'https://localhost:4000/api/books';

export class BookService{
    async getAllBooks(){
        let books = await http.get(baseUrl)
      //  console.log('BookService.getAllBooks',books);
        return books;
    }
}

