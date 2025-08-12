const whitelist = [
    'http://localhost:5174',
    'http://localhost:5173',
    'http://localhost:4000'
]

const corsOptions = {
    origin: function (origin, callback) {
        if(!origin || whitelist.indexOf(origin) !== -1){
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200,
    credentials: true
}

export default corsOptions
