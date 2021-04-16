module.exports = (req, res, next)=>{
    if(req.session.isloggedin){
        next()
    }else{
        res.redirect('/')
    }

};