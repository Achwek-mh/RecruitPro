const mongoose = require('mongoose') ;
const Intern = mongoose.model('Intern');
const _ =require('lodash');

module.exports.savee = (req, res, next) => {
    var intern = new Intern();


   intern.Name = req.body.Name;
   intern.Email = req.body.Email;
   intern.Post = req.body.Post ;
   intern.Scheduled_date = req.body.Scheduled_date;
   intern.state = req.body.state;
   intern.Manager_Concerned = req.body.Manager_Concerned ;
   intern.Result = req.body.Result;
   intern.impression = req.body.impression;
   intern.Date2 = req.body.Date2;
   intern.Time = req.body.Time;

   intern.save((err, doc) => {
        if (!err)
            res.send(doc);
             else {
              if (err.code == 11000)
                  res.status(422).send([' email address founddd.']);
      } 
        

    });
}
module.exports.internProfile = (req, res, next) =>{
   Intern.find().exec((err,intern)=>{
    if(!err){
        res.json(intern)
        
    }
   })
        
}
module.exports.findIntern = (req, res) =>{

    const id = req.params.id;
   Intern.findById(id)
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

 module.exports.Count = (req, res, next) =>{
  Intern.countDocuments().then((count_documents) => {
    res.json(count_documents)

})
.catch((err) => {
    console.log(err.Message);
})  
    
}
module.exports.Delete = (req, res) => {
    const id = req.params.id;
    Intern.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete intern with id=${id}. `
          });
        } else {
          res.send({
            message: "intern was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete intern with id=" + id
        });
      });
  };
  module.exports.Update = (req,res)=>{
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      const id = req.params.id;
      Intern.findByIdAndUpdate(id, req.body)
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update candidat with id=${id}. Maybe candidat was not found!`
            });
          } else res.send({ message: "candidat was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating candidat with id=" + id
          });
        });
    };
