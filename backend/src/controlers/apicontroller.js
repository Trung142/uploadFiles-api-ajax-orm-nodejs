const pool = require("../configs/database");
const db = require("../models");
const AlldataUser = async (req, res) => {
    try {
        // const [row, files] = await pool.execute("select * from Acount");
        if (req.query.page && req.query.limit) {
            let page = req.query.page;//so page
            let limit = req.query.limit;//so user trong mot page
            // const [rows, files] = await pool.execute('select * from Acount LIMIT ? OFFSET ?', [limit, offset]);
            if (page < 1) {
                page = 1;
            }
            let offset = (page - 1) * limit;
            const { count, rows } = await db.Acount.findAndCountAll({
                offset: +offset,
                limit: +limit
            });
            let totalpage = Math.ceil(count / limit);
            const data = {
                per_page: limit,
                page: page,
                totalrow: count,
                totalpage: totalpage,
                data: rows
            }
            return res.status(200).json({
                message: 'ok',
                data: data
            })

        }
        const user = await db.Acount.findAll();
        return res.status(200).json({
            message: 'ok',
            data: user
        })
    } catch (error) {
        res.status(500).json({
            message: "loi server",
            error: error
        });
    }
}
//create add user
const creatUser = async (req, res) => {
    try {
        // let sql = "insert into Acount(name,password,email) values(?,?,?)";
        let { name, password, email } = req.body;
        if (!name || !password || !email) {
            return res.status(200).json({
                message: 'not missi query '
            })
        }
        // const [rows, fiels] = await pool.execute(sql, [name, password, email]);
        const user = await db.Acount.create({
            name: name,
            email: email,
            password: password,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        return res.status(200).json({
            message: 'ok',
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            message: 'error server !',
            error: error
        });
    }

}
//update user
const APIupdate = async (req, res) => {
    // let sql = 'update Acount set name = ?,password = ?,email = ? where id = ?';
    try {
        let { name, password, email, userid } = req.body
        if (!name || !password || !email || !userid) {
            return res.status(200).json({
                message: 'missing requery params body'
            })
        }
        const user = await db.Acount.update(
            {
                name: name,
                email: email,
                password: password
            },
            {
                where: {
                    id: userid
                }
            }
        )
        return res.status(200).json({
            message: 'ok',
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            message: 'error server !',
            error: error
        });
    }

}
//delete
const APIdelete = async (req, res) => {
    try {
        let userid = req.query.id;
        if (!userid) {
            return res.status(200).json({
                message: 'missing requery params '
            })
        }
        const user = await db.Acount.destroy({
            where: {
                id: userid
            }
        })
        if (user == 0) {
            return res.status(200).json({
                message: "Delete error",
                data: user
            })
        }
        return res.status(200).json({
            message: "Delete succsse",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            message: 'error server',
            error: error
        })
    }

}
module.exports = {
    AlldataUser,
    creatUser,
    APIupdate,
    APIdelete
}