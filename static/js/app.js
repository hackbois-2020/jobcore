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

function makeCompanyDropdown (company) {
    let dropdown = $('#company-dropdown-template > :first-child').clone()
    dropdown.find('.collapsible').text(company.CompanyName)
    dropdown.find('.button').text(company.HiringStatus)

    dropdown.find('.collapsible').click(function () {
        this.classList.toggle('active')
        let content = this.nextElementSibling
        if (content.style.maxHeight) {
            content.style.maxHeight = null
        } else {
            content.style.maxHeight = content.scrollHeight + 'px'
        }
    })

    return dropdown
}

$(document).ready(function () {
    let table = $('#job-table')
    let dropdownList = $('#company-dropdowns')

    console.log(table)
    console.log(table.DataTable)
    table.DataTable()

    // List the first 100 companies and populate the webpage
    listCompanies(100)
        .done(function (companies) {
            for (let company of companies) {
                makeCompanyDropdown(company).appendTo(dropdownList)
            }
        })
        .fail(function () {
            console.error('Error!')
        })
})
