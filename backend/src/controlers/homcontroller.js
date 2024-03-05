const multer = require('multer');
const upload = require('../middleware/upload');
const pool = require('../configs/database');
const home = (req, res) => {
    return res.render('home.ejs');
}
//upload file image

const handleuploadFile = (req, res) => {
    let uploads = upload.single('profile_pic');
    uploads(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    })
}
// upload multiple files image
const handlemultipleImage = (req, res) => {
    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len = files.length;
    // Loop through all the uploaded images and display them on frontend
    for (index = 0; index < len; ++index) {
        result += `<img src="image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);
}
//show database
const handlevalue = async (req, res) => {
    try {
        const [result, fields] = await pool.execute('select * from Acount');
        res.render('tablediem.ejs', { uservalues: result });
    } catch (error) {
        return res.send(error);
    }

}
//show
const handleshow = (req, res) => {
    return res.render('tablediem.ejs');

}
// insert value
const handleaddValue = async (req, res) => {
    const sql = "insert into Acount(name,email,password) values(?,?,?)";
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    if (user.name != '' && user.email != '' && user != '') {
        try {
            const [result, fields] = await pool.execute(sql, [user.name, user.email, user.password]);
            return res.redirect('/table');
        } catch (error) {
            return res.send(error);
        }
    } else {
        return res.redirect('/table');
    }

}
//edit user
const handleEdit = async (req, res) => {
    let id = req.params.userid;
    let sql = 'select * from Acount where id = ?';
    let data = [];
    const [rows, fields] = await pool.execute(sql, [id]);
    rows.map((item) => {
        data.push({
            id: item.id,
            name: item.name,
            email: item.email,
            password: item.password
        })
        return res.render('edituser.ejs', { valuesUser: data[0] });
    })

}
const handledataEdit = async (req, res) => {
    const { userid, name, email, password } = req.body;
    let sql = 'update Acount set name = ?,email = ?,password = ? where id = ?'
    if (userid != '' && name != '' && email != '' && password != '') {
        await pool.execute(sql, [name, email, password, userid]);
        return res.redirect('/table');
    } else {
        res.send('input không được để trống');
    }

}
//handledele user
const handleDeleteuser = async (req, res) => {
    let id = req.params.userid;
    let sql = 'delete from Acount where id = ?';
    const [rows, fields] = await pool.execute(sql, [id]);
    return res.redirect('/table');
}
module.exports = {
    home,
    handleuploadFile,
    handlemultipleImage,
    handlevalue,
    handleaddValue,
    handleEdit,
    handleDeleteuser,
    handledataEdit
}