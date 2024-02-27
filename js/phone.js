const loadData = async (searchText, isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}
// forEach used for load the all phone of phones
const displayPhones = (phones, isShowAll)=>{
    // create phonecard for ui
    // step-1
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent='';

    // display show all button if there are more than 12 phones

    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    // display only 1st 12 phones if not show all
    if (!isShowAll) {
        
        phones=phones.slice(0,12);
    }

    phones.forEach(phone=>{
        // console.log(phone);
        // step 2 create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 bg-gray-100 p-4 m-4 shadow-xl`;
        // step 3 set innerHtml
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p></p>
        <div class="card-actions justify-center">
         <button onclick="handleShowDetails('${phone.slug}') " class="btn btn-primary">Show details</button>
        </div>
        </div> 
        `;
        // step 4 appendChild
        phoneContainer.appendChild(phoneCard);
        // toggle or loading off if data show
        toggleLoadingSpinner(false);

    })
}

// show details about phone by clicking button show details
const handleShowDetails = async(id)=>{
    // console.log(id)
    // load single phone data
    const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    
    // call the modal show function
    showPhoneDetails(phone)

}

// show the modal
const showPhoneDetails = (phone)=>{
    console.log(phone);
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.name;
    const showDetailContainer = document.getElementById('show-detail-con');
    showDetailContainer.innerHTML =`
    <img src="${phone.image}"  alt="" /> 
    <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>   
    <p><span>GPS:</span>${phone?.others?.GPS || 'No GPS available'}</p>
    `
    show_details_modal.showModal()
}


// handle search button
const handleSearch =(isShowAll)=>{
    toggleLoadingSpinner(true);
    const inputContainer = document.getElementById('search-input');
    // here i named this as search text because the provided parameter is ${searchText} in  url formate.
    const searchText = inputContainer.value;
    // console.log(searchText)
    loadData(searchText, isShowAll);
}
// loading spinner function
const toggleLoadingSpinner = (isLoading)=>{
   
const loadingSpinner = document.getElementById('loading-spinner');
if (isLoading) {
    loadingSpinner.classList.remove('hidden');
    
}
else{
    loadingSpinner.classList.add('hidden');
}
}
// handle show all button
const handleShowAll = () => {
    handleSearch(true);
}
// call the function
// loadData();