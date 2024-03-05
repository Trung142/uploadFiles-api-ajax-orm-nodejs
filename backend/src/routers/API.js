const express = require('express');
const { AlldataUser, creatUser, APIupdate, APIdelete } = require('../controlers/apicontroller');
const pagenation = require('../controlers/pagenation');
const router = express.Router();

const APIRouter = (req, res) => {
    router.get('/user', AlldataUser);
    router.post('/create-database', creatUser);
    router.put('/update-user', APIupdate);
    router.delete('/delete-user', APIdelete);
    router.get('/users', pagenation);
    return req.use('/api/v1/', router);
}
module.exports = APIRouter;