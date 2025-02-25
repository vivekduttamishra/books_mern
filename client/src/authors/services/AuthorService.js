import http from '../../utils/http';
import delay from '../../utils/delay';
const  baseUrl= '/api/authors';

export default class AuthorService{
    
    getAll=async()=>{
        await delay(2000);
        let authors = await http.get(baseUrl)
      //  console.log('AuthorService.getAll',authors.data);
        return authors.data;
    }

    async getById(id){
        await delay(2000); 
        let response = await http.get(`${baseUrl}/${id}`)
        let author = response.data;
        return author;
    }
    async removeById(id){
        await delay(2000);
        let response = await http.delete(`${baseUrl}/${id}`)
    }

    async addAuthor(author){
        await delay(2000);
        let response = await http.post(baseUrl,author)
        return response.data;
    }
}

