let searchForm =document.querySelector("#search-form");
let usernameInput=document.querySelector("#username-input");
let profileContainer =document.querySelector("#profile-container");
let profileAvatar =document.querySelector("#profile-avatar");
let profileName =document.querySelector("#profile-name");
let profileBio =document.querySelector("#profile-bio");
let profileLink =document.querySelector("#profile-link");
let selector=document.querySelectorAll(".stat-value")

searchForm.addEventListener(submit,(event)=>{
 event.preventDefault();
 const username =usernameInput.value;
 if(username.length===0){
    return ;
 }
});
