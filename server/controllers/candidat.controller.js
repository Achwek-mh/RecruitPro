const mongoose = require('mongoose') ;
const Candidat = mongoose.model('Candidat');
const _ =require('lodash');


module.exports.count = (req, res, next) =>{
  Candidat.countDocuments().then((count_documents) => {
    res.json(count_documents)
 
})
.catch((err) => {
    console.log(err.Message);
})  
    
}

module.exports.savee = (req, res, next) => {
    var candidat = new Candidat();
 
   candidat.Name = req.body.Name;
   candidat.Email = req.body.Email
   candidat.Post = req.body.Post ;
   candidat.Scheduled_date = req.body.Scheduled_date;
   candidat.state = req.body.state;
   candidat.Manager_Concerned = req.body.Manager_Concerned ;
   candidat.Result = req.body.Result;
   candidat.Date2 = req.body.Date2;
candidat.Time=req.body.Time

   candidat.save((err, doc) => {
        if (!err)
            res.send(doc);
            
            else {
              if (err.code == 11000)
                  res.status(422).send([' email address foundd.']);
          
        

}});
}

module.exports.candProfile = (req, res, next) =>{
   Candidat.find().exec((err,candidat)=>{
    if(!err){
        res.json(candidat)
        
    }
   })
        
}
 module.exports.delete = (req, res) => {
    const id = req.params.id;
    Candidat.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete candidat with id=${id}. `
          });
        } else {
          res.send({
            message: "Candidat was deleted successfully!"
          
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Candidat with id=" + id
        });
      });
  };

module.exports.findOne = (req, res) =>{

   const id = req.params.id;
  Candidat.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found candidat with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving candidat with id=" + id });
    });
};
module.exports.findByName = (req, res) =>{

 Candidat.find({_Name :req.body.Name},(err,data)=>{
  if(err){
    console.log(err)  ;
  }
  else{
    console.log(data)
  }
 })
   
};
module.exports.update = (req,res)=>{
    
      const id = req.params.id;
      Candidat.findByIdAndUpdate(id, req.body)  .then(data => {
        if (!req.body) {
          return res.status(400).send(
             ['Data to update can not be empty!']
          );
        }
        if (!data) {
          res.status(404).send({
            message: `Cannot update candidat with id=${id}. Maybe candidat was not found!`
          });
        } else res.send({ message: "candidat was updated successfully." });
      })
      .catch(err => {
        if (err.code == 11000)
                res.status(422).send([' email address found.']);
                else
                return next(err);
      
      });
  };



    