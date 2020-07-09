var request=require('request')
var verifyCaptcha = (req, res, next) => {
    bodydata = req.body

    if (!bodydata['recaptcha']) {
        return res.json({
            status: false
        });
    }

    const token = bodydata['recaptcha'] || req.query['recaptcha'];
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRETKEY}&response=${token}&remoteip=${req.connection.remoteAddress}`;

    request(verificationUrl, (error, response, body) => {
        body = JSON.parse(body);
        if (body.success !== undefined && !body.success) {
            console.log(body)
            return res.status(401).json({
                status: false
            });
        
        }
        console.log('abcd')
        next();
    });
};

module.exports=verifyCaptcha