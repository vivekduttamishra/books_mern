
const fs= require('fs');
const path = require('path');
const {NotFoundError,ValidationError}=require('../../utils/errors');

//console.log('process.cwd()',process.cwd());
//console.log('require.main.filename',require.main.filename);


class JsonRepository{
    constructor(repositoryPath){
        //console.log('process.env.ROOT_PATH',process.env.ROOT_PATH);
        
        this.path=path.join(process.cwd() , repositoryPath);
        this.data=[]; 
        this._load();
    }
    _load(){
        try{
            let str= fs.readFileSync(this.path)
            this.data=JSON.parse(str);
        }catch(e){
            //file does't exist
            //it is acceptable
            //it will be auto created later.
            console.log(`No ${this.path} found. empty repository intialized`)
        }
    }

     _save(){
        fs.writeFileSync(this.path, JSON.stringify(this.data));
    }

    async getAll(){
        return this.data;
    }

    async search(matcher){
        return this.data.filter(matcher);
    }

    async getById(id){
        let result = this.data.find(book=>book.id===id);
        if(result)
            return result;
        else
            throw new NotFoundError(`Invalid ID`,id);
    }

    async create(item){
        this.data.push(item);
        await this._save();
        return item;
    }

    async update(id, updater){
    
        let existing = await this.getById(id);
        let updated = updater(existing);
        this.data = this.data.map(d=> id===d.id ? updated: existing);
        this._save();
        return updated;
    }

    async delete(id){
        let existing = await this.getById(id);
        this.data = this.data.filter(d=> id!==d.id);
        this._save();
    }
}

module.exports=JsonRepository;