const router=require('express').Router();
const {addCategory}=require('../controllers/categoryCon');

//Add a category
router.post('/addcategory',addCategory);

module.exports=router;