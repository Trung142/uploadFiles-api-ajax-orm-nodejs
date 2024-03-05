const pool = require("../configs/database");

const pagenation = async (req, res, next) => {
    try {
        let sql = "select * from Acount";
        const [rows, files] = await pool.execute(sql);
        if (req.query.page && req.query.limit) {
            let page = req.query.page;//so page hiện thị
            let limit = req.query.limit;// tong so phan tu
            let offset = (page - 1) * limit;//so phan tu bo qua
            let acount = rows.length;// tong so phan tu
            let totalpagen = Math.ceil(acount / limit);//tong so trang
            if (page < 1) {
                page = 1;
            }
            const [rows2, files] = await pool.execute('select * from Acount limit ? offset ?', [limit, offset]);
            let data = {
                totalrows: acount,
                totalpage: totalpagen,
                user: rows2
            }
            return res.status(200).json({
                message: 'ok',
                data: data
            })
        } else {
            return res.status(200).json({
                message: 'ok',
                data: rows
            })
        }
    } catch (error) {
        return res.status(500).json("error server !");
    }
}
module.exports = pagenation