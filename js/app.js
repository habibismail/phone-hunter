const loadPhones = (search, limitNum) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data, limitNum))
}

const displayPhones = (phones, limitNum) => {
    const phoneContainer = document.getElementById('phone-Container')
    phoneContainer.textContent = ''
    // Show all button 
    const showAllContainer = document.getElementById('showAll-container')
    if (limitNum && phones.length > 10) {
        // display 12 phone
        phones = phones.slice(0, 10)
        showAllContainer.classList.remove('d-none')
    }
    else {
        showAllContainer.classList.add('d-none')
    }

    // display no found Text
    const noPhones = document.getElementById('noFoundPhone')
    if (phones.length === 0) {
        noPhones.classList.remove('d-none')
    }
    else {
        noPhones.classList.add('d-none')
    }
    // display all phone
    phones.forEach(phone => {
        // console.log(phone)
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card ">
            <img src="${phone.image}" class="card-img-top p-4" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.</p>
            <button onClick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneDiv)

    });
    toggleSpinners(false)
}
// search processing
const processingSearch = (limitNum) => {
    toggleSpinners(true)
    const searchFeild = document.getElementById('search-feild')
    const searchText = searchFeild.value
    loadPhones(searchText, limitNum)
}
// search button 
document.getElementById('search-btn').addEventListener('click', function () {
    processingSearch(10)
})

document.getElementById('search-feild').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        processingSearch(10)
    }
})

// Loader or spinner

const toggleSpinners = isLoading => {
    const loaderSection = document.getElementById('loader')
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}

// show all button 
document.getElementById('showAll-btn').addEventListener('click', function () {
    processingSearch()
})

const loadPhoneDetail = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhoneDetail(data.data)
}

const displayPhoneDetail = phone => {
    console.log(phone)
    const phoneTitle = document.getElementById('exampleModalLabel')
    phoneTitle.innerText = phone.name
    const phoneDetails = document.getElementById('phoneDetails')
    phoneDetails.innerHTML = `
    <p class="text-center text-primary">Feature </p>
    <p>Chipset : ${phone.mainFeatures.chipSet} </p>
    <p>Display Size : ${phone.mainFeatures.displaySize} </p>
    <p>Memory : ${phone.mainFeatures.memory} </p>
    <p>Release Date : ${phone.releaseDate} </p>
    <p>Brand : ${phone.brand} </p>
    `
}


// loadPhones('apple')