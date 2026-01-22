import { Router } from "express";
const router = Router();
router.get('/', (req, res) => {
    res.json({
        "title": "FlashLearn API v1.0",
        "links": {
            "users": "/api/users",
            "products": "/api/set",
            "orders": "/api/v1/orders"
        },
        "documentation": "https://api.example.com/docs"
    });
});
// handle 404
router.use('*', (req, res, next) => {
    return next();
});
export default router;
//# sourceMappingURL=info-route.js.map