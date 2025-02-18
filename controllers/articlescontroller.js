const article = require('../models/articlesmodel');

const  filterarticles = async(req,res) =>{
    try{
        let filter ={}

        if(req.query.tags){
            filter.tags = req.query.tags;
        }

        if(req.query.startdate && req.query.enddate){
            filter.date  = {
                $gte : new Date(req.query.startdate),
                $lte : new Date(req.query.enddate)
            };
        }

        const articles = await article.find(filter).sort({date :-1});
        if(articles){
            return res.status(200).json({articles});
        }
    }
    catch(err){
        return res.status(400).json({error:err.message});
    }
};

const findarticlebyid = async(req,res) =>{
    try{
        const articles = await article.findById(req.params.id);
        if(articles){
            return res.status(200).json({articles});
        }
    }
    catch(err){
        return res.status(400).json({error:err.message});
    }
};

const addarticle = async(req,res) =>{
    try{
        const {title,content,author,tags,date} = req.body;
        if(!title){
            res.send("title is required").status(400);
        }
        if(!content){
            res.send("content is manditory").status(400);
        }
        
        const newarticle = new article({
            title,
            content,
            author : author || "anonomoys",
            tags : tags|| [],
            date : new Date()
        });

        const savedarticle  = await newarticle.save();
        res.status(200).json({savedarticle});
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
};


const deletearticle = async(req,res) =>{
    try{
        const deletedarticle = await article.findByIdAndDelete(req.params.id);
        if(!deletedarticle){
            return res.status(400).json({message :"no article found"});
        }
        res.status(200).json({message :"article has been deleted successfully"});
    }
    catch(err){
        return res.status(400).json({error :err.message});
    }
};

const deletearticlebytitle = async(req,res) =>{
    try{
        const{title} = req.query;
        console.log(title);
        
        if(!title){
            return res.status(400).json({message:"title is required"});
        }

        const deletearticle = await article.deleteMany({title});
        if(deletearticle.deletedCount === 0){
            return res.send("no title in the database");
        };

        res.status(200).json({ message: `${deletearticle.deletedCount} articles deleted successfully` });

    }catch(err){
        return res.status(400).json({message:err.message});
    }
};

const updatearticle = async(req,res) =>{
    try{
        const updatedarticle  = await article.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!updatedarticle){
            res.status(400).json({messge : "no article found"});
        }
        return res.status(200).json({message : "updated data",
            data : updatedarticle
        });

    }
    catch(err){
        res.status(400).json({message : err.message});
    }
};

module.exports = {
    updatearticle,
    deletearticle,
    addarticle,
    findarticlebyid,
    filterarticles,
    deletearticlebytitle
};







