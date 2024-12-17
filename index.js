const submit=document.querySelector('#submit-signup');
const resultElement = document.querySelector('#result');
const modalBodySignup=document.querySelector('#signup-body');
const signUp=document.querySelector('#signUp');
const closeButton=document.querySelector('#close-signup');
const retry= document.querySelector('#retry');
const closeSymbol=document.querySelector('#signup-close-symbol');

// getprofile by id 
const getProfileSubmit= document.querySelector('#submit-getProfile');
const modalBodyGetProfile=document.querySelector('#getProfileById-body');
const getProfileClose = document.querySelector('#close-getProfile');
const getProfileCloseSymbol=document.querySelector('#getProfile-close-symbol');

const saveProfile= async()=>{
    let profileName = document.getElementById('recipient-name').value;
    let profileMobileNumber= document.getElementById('mobile-number').value;
    let profileCountry=document.getElementById('country').value;


// let response = await fetch('http://localhost:1113/profile/getProfiles');
// console.log(response);
let response1 = await fetch('https://localhost:1113/profile/details',{
    method:'POST',
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name:profileName,
        mobileNumber:profileMobileNumber,
        country:profileCountry
    })
});

let data= await response1.text();
try {
    let jsonData = JSON.parse(data);
    modalBodySignup.textContent = Object.values(jsonData);
  } catch (error) {
    modalBodySignup.textContent = data;
  }
submit.classList.add('hide');
closeButton.classList.add('hide');
  // if (data!="Submitted Successfully"){
  //   retry.classList.remove('retry');
  //   closeSymbol.classList.add('hide');
  // }
  retry.classList.remove('retry');
  closeSymbol.classList.add('hide');

};


submit.addEventListener('click', saveProfile);
retry.addEventListener('click', () => {
    location.reload()
}
);


const getProfile = async () => {
  let profileId = document.getElementById('profile-id').value;

  // Ensure the URL is correct by fixing the string interpolation
  let response3 = await fetch(`https://helpful-commitment-production.up.railway.app/profile-app/api/profile/${profileId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  });

  let data = await response3.text();

  try {
    let jsonData = JSON.parse(data);

    // Extract the address information
    const address = jsonData.addressResponse
      ? `Address: ${jsonData.addressResponse.lane1}, ${jsonData.addressResponse.lane2}, ${jsonData.addressResponse.city}, ${jsonData.addressResponse.state}`
      : 'Address: N/A';

    // Format the output as desired with <br> tags for line breaks
    const profileDetails = `
      Name: ${jsonData.name} <br>
      Mobile Number: ${jsonData.mobileNumber} <br>
      Country: ${jsonData.country} <br>
      ${address}
    `;

    // Display the formatted result in the modal
    modalBodyGetProfile.innerHTML = profileDetails; // Use innerHTML instead of textContent to render HTML tags
  } catch (error) {
    modalBodyGetProfile.textContent = `Error: ${error.message}`;
  }

  getProfileSubmit.classList.add('hide');
  getProfileCloseSymbol.classList.add('hide');
};

getProfileSubmit.addEventListener('click',getProfile);

getProfileClose.addEventListener('click',()=>{
  location.reload();
});