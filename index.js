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
let response1 = await fetch('http://localhost:1113/profile/details',{
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


const getProfile = async()=>{
  let profileId =document.getElementById('profile-id').value;
  
  let response3 =await fetch(`http://localhost:1113/profile/getProfile/${profileId}`,{
    method:'GET',
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
  });
  let data= await response3.text();
  try {
    let jsonData = JSON.parse(data);
    modalBodyGetProfile.textContent = Object.values(jsonData).join(', ');
  } catch (error) {
    modalBodyGetProfile.textContent = data;
  }
  getProfileSubmit.classList.add('hide');
  getProfileCloseSymbol.classList.add('hide');
};

getProfileSubmit.addEventListener('click',getProfile);

getProfileClose.addEventListener('click',()=>{
  location.reload();
});