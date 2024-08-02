let year = 2023;
let quarter = 4;
let add = 0;

const API_URL = 'http://192.168.1.168';

function getYear() {
    return year;
}

function getQuarter() {
    return quarter;
}

function getAdd() {
    return add;
}

function setYear(newYear) {
    year = newYear;
}

function setQuarter(newQuarter) {
    quarter = newQuarter;
}

function setAdd() {
    add++;
}

export { API_URL, getQuarter, getYear, getAdd, setQuarter, setYear, setAdd };