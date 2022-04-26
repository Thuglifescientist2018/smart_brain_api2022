const handleSignIn = (db, bcrypt) => (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json("incorrect sign in form submission")
    }
    db.select('email', 'hash').from('login')
    .where("email", "=", email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if(isValid) {
            db.select("*").from("users").where("email", "=", req.body.email)
            .then(user => {
                console.log(user);
                res.json(user[0])
            })
            .catch(err => req.status(400).json("unable to get user"))
        }
        else {
            throw Error("Wrong credentials")
        }
        console.log("isValid: " + isValid)
    })
    .catch(err => res.status(400).json('username or password is incorrect'))
   
}

module.exports = {
    handleSignIn: handleSignIn
}