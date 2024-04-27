const response = (statusCode, data, messege,res) => {
    res.send(statusCode, [
        {
            payload: data,
            messege,       
            metadata: {
                prev: "",
                next: "",
                current: "",
            },
        },
    ])
}

module.exports = response