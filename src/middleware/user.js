export const validateRegister = (req, res, next) => {
    const requiredFields = ['name', 'age', 'gender', 'dob', 'password'];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ error: `${field} is required` });
        }
    }

    next();
};