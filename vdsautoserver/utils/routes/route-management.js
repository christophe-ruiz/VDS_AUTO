const manageAllErrors = (res, err) => {
    if (err.name === 'NotFoundError') {
        res.status(404).end()
    } else if (err.name === 'ValidationError') {
        res.status(400).json(err.extra)
    } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
        res.status(400).send("Too many files to upload.");
    } else {
        res.status(500).json(err)
    }
}

module.exports = manageAllErrors
