$.ajax({
    url: '/api/v1/user?page=1&limit=5',
    type: 'get'
}).then(data => {
    $('#listuser').html('');
    data.data.forEach(item => {
        const items = $(`
                     <tr>
                        <th>
                            ${item.id}
                        </th>
                        <td>
                            ${item.name}
                        </td>
                        <td>
                            ${item.email}
                        </td>
                        <td>
                            ${item.password}
                        </td>
                        <td>images</td>
                        <td>    
                            <button type="button" 
                                class="btn btn-primary" 
                                data-bs-toggle="modal" 
                                data-bs-target="#exampleModal"
                                onclick="handleEdit(${item.id})"
                            >
                                Edit
                            </button>
                        </td>
                    </tr>
    `)
        $('#listuser').append(items);
    });


});

//page
var page = 1;
$.ajax({
    url: `/api/v1/user?page=1&limit=5`,
    type: 'get'
}).then(data => {
    for (let i = 1; i <= data.totalpage; i++) {
        const items = $(`
                <a class="page-link" onclick="handlepage(${i})" href="#">${i}</a>
            `)
        $('#pages').append(items);
    }
}).catch(error => {
    console.log(error)
})
//handlepage
function listsUsser(data) {
    $('#listuser').html('');
    data.data.forEach((item, index) => {
        const lists = $(`
    <tr >
        <th>
            ${item.id}
        </th>
        <td>
            ${item.name}
        </td>
        <td>
            ${item.email}
        </td>
        <td>
            ${item.password}
        </td>
        <td>images</td>
        <td>    
            <button type="button" 
                class="btn btn-primary" 
                data-bs-toggle="modal" 
                data-bs-target="#exampleModal"
                onclick="handleEdit(${item.id})"
            >
                Edit
            </button>
        </td>
    </tr>
        `)
        $('#listuser').append(lists);
    })
}
function handlepage(page) {
    $.ajax({
        url: `/api/v1/user?page=${page}&limit=5`,
        type: 'get'
    }).then(data => {
        listsUsser(data)
    })
}
//Previous
function handlePrevious(page) {
    page--;
    if (page < 1) {
        page = 1;
    }
    $.ajax({
        url: `/api/v1/user?page=${page}&limit=5`,
        type: 'get'
    }).then(data => {
        listsUsser(data);
    })
}
//Nexxt
function handleNext(page) {
    page++;
    $.ajax({
        url: `/api/v1/user?page=${page}&limit=5`,
        type: 'get'
    }).then(data => {
        listsUsser(data);
    })
}

