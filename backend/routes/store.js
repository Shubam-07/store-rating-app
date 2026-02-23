const router = require("express").Router();
const db = require("../db");
const {auth} = require("../middleware/auth");


// List all stores
router.get("/",auth,(req,res)=>{
  db.query(
    `SELECT s.*, AVG(r.rating) as avgRating
     FROM stores s
     LEFT JOIN ratings r ON s.id=r.store_id
     GROUP BY s.id`,
    (err,data)=>{
      if(err) return res.send(err);
      res.send(data);
    }
  );
});


// Search store
router.get("/search",auth,(req,res)=>{
  const {q} = req.query;

  db.query(
    "SELECT * FROM stores WHERE name LIKE ? OR address LIKE ?",
    [`%${q}%`,`%${q}%`],
    (err,data)=>{
      if(err) return res.send(err);
      res.send(data);
    }
  );
});

module.exports = router;
