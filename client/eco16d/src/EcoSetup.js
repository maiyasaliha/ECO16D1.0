let year = 2023;
let quarter = 4;
let newPage = false;

function getYear() {
    return year;
}

function getQuarter() {
    return quarter;
}

function getNewPage() {
    return newPage;
}

function setYear(newYear) {
    year = newYear;
}

function setQuarter(newQuarter) {
    quarter = newQuarter;
}

function setNewPage(newpage) {
    newPage = newpage;
}

export { getQuarter, getYear, getNewPage, setQuarter, setYear, setNewPage };