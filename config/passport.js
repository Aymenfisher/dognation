const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const helper = require("../helpers/helper");

// Set up the Passport strategy:
passport.use( new LocalStrategy((username,password,done) => {
        helper.findByUsername(username,async (err,user) =>{
        if(err){return done(err);};
        if(!user){return done(null,false);};
        const foundMatch = await bcrypt.compare(password,user.password);
        if(!foundMatch){
            return done(null,false)
        }
        return done(null,user.id)
    })
}))
// Serialize a user
passport.serializeUser((id,done) =>{
    return done(null,id)
})

// Deserialize a user
passport.deserializeUser((id,done) =>{
    helper.findById(id,(err,user) =>{
        if(err){return done(err)}
        return done(null,user)
    })
})