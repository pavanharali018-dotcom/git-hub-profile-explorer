const searchForm =document.querySelector("#search-form");
const usernameInput=document.querySelector("#username-input");
const profileContainer =document.querySelector("#profile-container");
const profileAvatar =document.querySelector("#profile-avatar");
const profileName =document.querySelector("#profile-name");
const profileBio =document.querySelector("#profile-bio");
const profileLink =document.querySelector("#profile-link");
const selector=document.querySelectorAll(".stat-value");
const loadingMessage=document.querySelector("#loading-message");
const errorMessage=document.querySelector("#error-message");
const searchButton=document.querySelector("#search-btn");
const repositoriesContainer=document.querySelector("#repositories-container");

loadingMessage.style.display = "none";

searchForm.addEventListener("submit",(event)=>{
 event.preventDefault();
 const username =usernameInput.value.trim();
 if(username.length===0){
   errorMessage.innerText="Please enter a GitHub username!";
   errorMessage.style.display="block";
    return ;
 }
  errorMessage.innerText ="";
  errorMessage.style.display = "none";
  searchButton.disabled=true;
 const apiUrl = `https://api.github.com/users/${username}`;
  async function getusername(){
     try{
        const gitusername = await fetch(apiUrl);
        
         if(!gitusername.ok){
            throw new Error(`User not found. Please check the username.`);
        }
        loadingMessage.style.display="none";
        errorMessage.innerText="";
        errorMessage.style.display = "none";
        profileContainer.style.display="block";
        const data = await gitusername.json();
        //todays push
        profileName.innerText=data.name;
        profileAvatar.src=data.avatar_url;
        profileBio.innerText=data.bio||"No bio available";
        selector[0].innerText=data.public_repos;
        selector[1].innerText=data.followers;
        selector[2].innerText=data.following;
        profileLink.href=data.html_url;
        searchButton.disabled = false;
        const reposResponse = await fetch(reposUrl);
        const reposData = await reposResponse.json();
        console.log(reposData);
     }
     catch(error){
        loadingMessage.style.display = "none";
        profileContainer.style.display="none";
        errorMessage.style.display="block";
        errorMessage.innerText=error.message;
        searchButton.disabled = false;
       
     }
     
  }
  
  loadingMessage.style.display = "block";
  getusername();
  const reposUrl= `https://api.github.com/users/${username}/repos`;

});

