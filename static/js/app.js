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
    let collapsible = dropdown.find('.collapsible')
    let content = dropdown.find('.content')

    collapsible.text(company.CompanyName)

    // Add job status
    if (company.HiringStatus === 'hiring') {
        console.log('HIRING')
        collapsible.append('<span class="job-status hiring">Hiring</span>')
    } else if (company.HiringStatus === 'hiring freeze') {
        collapsible.append('<span class="job-status freeze">Hiring Frozen</span>')
    }

    dropdown.find('.collapsible').click(function () {
        dropdown.toggleClass('active')
        content.slideToggle()
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
