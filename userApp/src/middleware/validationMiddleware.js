exports.validateTask = (req, res, next) => {

    const { title } = req.body;

    if (!title || title.trim() === "") {
        return res.send("Task title is required");
    }

    next();
};