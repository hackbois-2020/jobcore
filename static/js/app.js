function listCompanies (length, offset) {
    if (offset === undefined) offset = 0

    return $.get('/api/companies/' + length + '/' + offset)
}

// An example on how to use the API to get companies.
function testListCompanies () {
    listCompanies(100) // offset is an optional argument.
        .done(function (data) {
            // Server returns status code 200 OK, and we get our JSON data.
            console.log('Success!')
            console.log(data)
        })
        .fail(function () {
            // Server returns some non-OK code, and we fail :(
            console.error('Error!')
        })
}

$(document).ready(function () {
	let table = $('#job-table')

	console.log(table)
	console.log(table.DataTable)
	table.DataTable()
})
