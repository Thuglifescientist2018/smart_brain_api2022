const Clarifai  = require('clarifai');
const app = new Clarifai.App({
    apiKey:process.env.CLARIFAI_SECRET,
  });

const handleAPICall = (req, res) => {
    console.log("input: " + req.body.input)
    app.models.
    predict(Clarifai.FACE_DETECT_MODEL,
       req.body.input)
       .then(data => {
           
           res.json(data)
       })
       .catch(() => res.status(400).json("unable to detect the face!"))
    
}
const handleImageCount = (req, res, db) => {
    
        const {id} = req.body;
        db('users')
      .where('id', '=', id)
      .increment('entries', 1)
      .returning('entries')
      .then(entries =>  {
         
          res.json(entries[0].entries)
      })
      .catch(err => res.status(400).json("unable to get count"))
    
    
}

module.exports =  {
    handleImageCount: handleImageCount,
    handleAPICall: handleAPICall
}