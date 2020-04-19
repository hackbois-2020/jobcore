function listCompanies (length, offset) {
    if (offset === undefined) offset = 0

    return $.get('/api/companies/' + length + '/' + offset)
}

function listCompanyJobs (company) {
    return $.get('/api/jobs/' + encodeURI(company))
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

// An example on how to use the API to get jobs.
function testListJobs () {
    listCompanyJobs('Skipfire')
        .done(function (data) {
            console.log('Success!')
            console.log(data)
        })
        .fail(function () {
            console.error('Error!')
        })
}

function makeJobListing (job) {
    let listing = $('#job-template > :first-child').clone()
    listing.find('.job-position').text(job.JobTitle)
    listing.find('.job-description').text(job.JobResponsibilities)

    if (job.Link === null || job.Link === '' || job.Link === '_' || job.Link === '	') {
        listing.find('.job-apply').remove()
    } else {
        listing.find('.job-apply').attr('href', job.Link)
    }

    return listing
}

function populateCompany (content) {
    if (content.children().length > 0) return
    let name = content.data('name')

    listCompanyJobs(name)
        .done(function (jobs) {
            console.log(jobs)
            let njobs = 0
            for (let job of jobs) {
                njobs++
                if (njobs > 1) {
                    content.append('<hr>')
                }
                makeJobListing(job).appendTo(content)
            }
        })
        .fail(function () {
            console.error('Request failed for company "' + name + '"')
        })
}

function makeCompanyDropdown (company) {
    let dropdown = $('#company-dropdown-template > :first-child').clone()
    let collapsible = dropdown.find('.collapsible')
    let content = dropdown.find('.content')

    content.data('name', company.CompanyName)
    collapsible.text(company.CompanyName)

    // Add job status
    if (company.HiringStatus === 'hiring') {
        collapsible.append('<span class="tag hiring">Hiring</span>')
    } else if (company.HiringStatus === 'hiring freeze') {
        collapsible.append('<span class="tag freeze">Hiring Frozen</span>')
    }

    dropdown.find('.collapsible').click(function () {
        dropdown.toggleClass('active')
        populateCompany(content)
        content.slideToggle()
    })

    return dropdown
}

$(document).ready(function () {
    let table = $('#job-table')
    let dropdownList = $('#company-dropdowns')

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
