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
       
        repositoriesContainer.innerHTML = "";
        if(reposData.length===0){
             repositoriesContainer.innerHTML = "No public repositories found!";
         }

         else{
           reposData.forEach((repo)=>{
         
         const repoCard = document.createElement("div");
         repoCard.className = "repo-card";
         const repoName = document.createElement("h3");
         const repoDescription=document.createElement("p");
         const repoLanguage = document.createElement("span");
         repoName.textContent=repo.name;
         repoDescription.textContent = repo.description || "No description available";
         repoCard.appendChild(repoName);
         repoCard.appendChild(repoDescription);
         repoLanguage.textContent = repo.language || "Language not specified";
         repoCard.appendChild(repoLanguage);
         const repoLink = document.createElement("a");
         repoLink.textContent = "View Repository";
         repoLink.href = repo.html_url; 
         repoLink.target = "_blank";
         repoCard.appendChild(repoLink);
         const repoStars = document.createElement("span");
         repoStars.textContent="⭐"+repo.stargazers_count;
         const repoForks = document.createElement("span");
         repoForks.textContent="🍴"+repo.forks_count;
         repoCard.appendChild(repoForks);
         repoCard.appendChild(repoStars);
         repositoriesContainer.appendChild(repoCard);
        });
         }
        
        console.log(reposData);
        let repo=reposData[0];
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
 
