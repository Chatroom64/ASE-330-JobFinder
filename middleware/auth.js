import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
    console.log('Auth middleware hit for', req.method, req.path, req.headers);
    const authHeader = req.headers.authorization;
    // Let preflight OPTIONS requests pass 
    if (req.method === "OPTIONS") return res.sendStatus(200);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // userId, email, etc.
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
