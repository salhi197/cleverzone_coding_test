const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://cleverzone:JKG7nlSFJiZxr1kZ@cluster0.iwan8.mongodb.net/cleverzone?retryWrites=true&w=majority',
{useNewUrlParser:true,useUnifiedTopology:true},
    err => {
        if (!err)
            console.log('Mongodb connection succeeded.')
        else
            console.log('Error while connecting MongoDB : ' + JSON.stringify(err, undefined, 2))
    })