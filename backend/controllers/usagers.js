exports.signup = (req, res, next) => {

};

exports.login = (req, res, next) => {
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    error: 'Usagère ou usagé non trouvé.e'
                });

            }
                    })
};