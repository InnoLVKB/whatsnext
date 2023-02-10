import jwt from 'jsonwebtoken'

export const auth = (req) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return { userId: decoded.user_id }
    }

    if (token === null) {
        return { userId: 'Not Authorized' }
    }
}