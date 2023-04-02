let arrModels = [];
let html = '';
let dropdown = document.getElementById('modelsDropdown')
let addBtn = document.getElementById('btn')
let modal = document.getElementById('requestModal')
let closeBtn = document.getElementById('requestModalClose')
let submitBtn = document.getElementById('requestSubmit')

fetch('http://87.249.222.54:19191/api/device_models/')
    .then(response => response.json())
    // .then(data => console.log(data))
    .then(function(allModels) {
        allModels.forEach(element => {
            arrModels.push(element);
        });
        console.log(arrModels);
    })

function getNumber(number, data) {
    // console.log(data);
    return data.filter(s => {
        const regex = new RegExp(number, 'g');
        return s.code.match(regex);
    })
}


function outPutData() {
    let res = getNumber(this.value, arrModels);

    const html = res.map(arrModels => {
        return `<li>${arrModels.name}</li>`
    }).join('')
    dropdown.innerHTML = html
    console.log(res.length);

    if (res.length == 0) {
        // console.log('Завести модель')
        addBtn.style.display = "block"
    }



}

let inputSearch = document.getElementById('serialNumber');
inputSearch.addEventListener('input', outPutData);

addBtn.addEventListener('click', () => {
    modal.style.display = "block"
})

closeBtn.addEventListener('click', (event) => {
    const target = event.target
    if (target.classList.contains('overlay') || target.classList.contains('modal__close')) {
        modal.style.display = "none"
    }


})

function onRequestSubmit() {
    const request = document.getElementById('request');
    const description = document.getElementById('description').value;



    request.addEventListener('input', (event) => {
        // console.log(event.target.value)
        console.log(request.value)
        submitBtn.addEventListener('click', () => {
            alert(`Заявка создана с номером ${request.value}`);
            modal.style.display = "none"
                // request.value && description.value == '';

        })

    })


}

onRequestSubmit()






// let table = new DataTable('#dropdown');
// console.log(table);