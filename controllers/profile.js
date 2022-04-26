const handleProfile = (req, res, db) => {
    const {id} = req.params;
  
    db.select("*").from("users").where({id: id})
    .then(user => {
        if(user.length) {
            res.json(user[0])
        }
        else {
            throw Error("User not found")
          
        }
    })
    .catch(
        () => res.json("Error getting that user")
    )
    // if(!found) {
    //     res.status(404).send("User not found")
    // }
}

module.exports = {
    handleProfile: handleProfile
}