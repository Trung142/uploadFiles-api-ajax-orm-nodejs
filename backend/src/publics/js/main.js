
var parenpage = 1;
//so trang
$.ajax({
    url: '/api/v1/user?page=1&limit=2',
    type: 'get'
})
    .then(data => {
        $('#page').html('');
        for (let i = 1; i <= data.data.totalpage; i++) {
            const items = $(`
                <a class="page-link" href="#" onclick="pagination(${i})">${i}</a>
            `)
            $('#page').append(items);
        }

    })
    .catch(error => {
        console.log('loi server ')
    })
//page = 1
function valuseUse(data) {
    $('#content').html('');
    for (let i = 0; i < data.data.totalrow; i++) {
        const element = data.data.data[i];
        const items = $(`
        <tr>
            <th>
                ${element.id}
            </th>
            <td>
                ${element.name}
            </td>
            <td>
                ${element.email}
            </td>
            <td>
                ${element.password}
            </td>
            <td>
                ${element.img}
            </td>
            <td>    
                <button type="button" 
                    class="btn btn-primary" 
                    data-bs-toggle="modal" 
                    data-bs-target="#exampleModal"
                    onclick="handleEdit(${element.id})"
                >
                    Edit
                </button>
            </td>
        </tr>
        `)
        $('#content').append(items);
    }
}
$.ajax({
    url: '/api/v1/user?page=' + parenpage + '&limit=2',
    type: 'get'
})
    .then(data => {
        valuseUse(data);
    })
    .catch(error => {
        console.log('loi server ')
    })
//totalpage
function pagination(page) {
    parenpage = page;
    $.ajax({
        url: '/api/v1/user?page=' + parenpage + '&limit=2',
        type: 'get'
    })
        .then(data => {
            valuseUse(data);
        })
        .catch(error => {
            console.log('loi server ')
        })
}
//Previoud
function pagePrevious() {
    parenpage--;
    if (parenpage < 1) {
        parenpage = 1;
    }
    $.ajax({
        url: '/api/v1/user?page=' + parenpage + '&limit=2',
        type: 'get'
    })
        .then(data => {
            valuseUse(data);
        })
        .catch(error => {
            console.log('loi server ')
        })
}
//next
const totalpage = () => {
    parenpage++;
    $.ajax({
        url: '/api/v1/user?page=' + parenpage + '&limit=2',
        type: 'get'
    }).then(data => {
        if (parenpage >= data.data.totalpage) {
            parenpage = data.data.totalpage - 1;
        }

    })
}
//next page
function pageNext() {
    totalpage();
    $.ajax({
        url: '/api/v1/user?page=' + parenpage + '&limit=2',
        type: 'get'
    })
        .then(data => {
            valuseUse(data);
        })
        .catch(error => {
            console.log('loi server ', error)
        })
}
// edit
const handleEdit = (id) => {
    console.log(id);
}