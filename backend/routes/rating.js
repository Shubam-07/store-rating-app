const router = require("express").Router();
const db = require("../db");
const {auth} = require("../middleware/auth");


// Submit or update rating
router.post("/",auth,(req,res)=>{
  const {store_id,rating} = req.body;

  db.query(
   `INSERT INTO ratings(user_id,store_id,rating)
    VALUES(?,?,?)
    ON DUPLICATE KEY UPDATE rating=?`,
    [req.user.id,store_id,rating,rating],
    err=>{
      if(err) return res.send(err);
      res.send("Rating submitted");
    }
  );
});


// Store owner view ratings
router.get("/owner/:storeId",auth,(req,res)=>{
  db.query(
    `SELECT u.name,r.rating
     FROM ratings r
     JOIN users u ON r.user_id=u.id
     WHERE r.store_id=?`,
    [req.params.storeId],
    (err,data)=>{
      if(err) return res.send(err);
      res.send(data);
    }
  );
});

module.exports = router;
