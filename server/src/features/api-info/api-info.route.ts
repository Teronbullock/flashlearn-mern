import { Router } from "express"; 

const router = Router();

router.get('/', (req, res)=> {
  res.json({
  "title": "FlashLearn API v1.0",
  "links": {
    "users": "/api/users",
    "products": "/api/set",
    "orders": "/api/v1/orders"
  },
  "documentation": "https://api.example.com/docs"
})
});


export default router;