const loadPhones = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch (url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phone-container')
    phonesContainer.innerText = '';

    const showAll = document.getElementById('show-all');

    if(dataLimit && phones.length > 10){
        phones = phones.slice(0, 10);       // display only 10 phones.
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }

    // display no phones found. 
    const noPhone = document.getElementById('no-found-message');
    if (phones.length === 0){
        noPhone.classList.remove('d-none'); 
    }
    else{
        noPhone.classList.add('d-none');
    }

    // display all phones. 
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="col">
                    <div class="card">
                        <img src="${phone.image}" class="card-img-top" alt="">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                                to additional content. This content is a little bit longer.</p>
                                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                        </div>
                    </div>
                </div>`;
        phonesContainer.appendChild(phoneDiv);
    });
    toggleSpinner(false);      // stop loader.
}

const processSearch = (dataLimit) => {
    toggleSpinner(true);        // start loader. 
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}
// Search button click.  
document.getElementById('btn-search').addEventListener('click', function(){
    processSearch(10);
})

// search input field enter key handler.
document.getElementById('search-field').addEventListener('keypress', function(e){
    if (e.key === 'Enter'){
        processSearch(10); 
    }
});


const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
});

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    console.log(phoneDetails);
    phoneDetails.innerHTML = `
    <p> Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
    <p> Storage: ${phone.mainFeatures ? phone.mainFeatures.storage: 'No storage Information'}</p>
    <p> Others: ${phone.others ? phone.others.Bluetooth: 'No Bluetooth Information'} </p>`
}


loadPhones('apple');

