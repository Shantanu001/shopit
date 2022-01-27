class ApiFeatures {
    
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword?{
            name:{
                $regex:this.queryStr.keyword,
                $options:'i'
            }
        }:{};
        console.log(keyword);
        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        let queryCopy = {...this.queryStr};
        console.log(queryCopy);
        
        //Remove keyword and pagination elements from the queryStr
        let toBeRemovedElements = ['keyword','limit','page'];
        toBeRemovedElements.forEach(el => delete queryCopy[el]);

        // Applying filters on category and price
        queryCopy = JSON.stringify(queryCopy);
        queryCopy = queryCopy.replace(/\b(gt|gte|lt|lte)\b/g,match =>`$${match}`); 

        this.query = this.query.find({...JSON.parse(queryCopy)});
        return this;
    }

    pagination(countPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = countPerPage * (currentPage - 1);
        
        this.query = this.query.limit(countPerPage).skip(skip);
        return this;
    }


}
module.exports = ApiFeatures;