$(document).ready( function(){
     const Url = "http://localhost:5055/api/v1/"
    const token = JSON.parse(localStorage.getItem('x-token'))
    if(token != null){
        $('#films').on('click',()=>{
            window.location.href="./accueil.html"
        })
        $('#projection').on('click',()=>{
            window.location.href="./projection.html"
        })
        $('#prod').on('click',()=>{
            window.location.href="./producteur.html"
        })
        $('#real').on('click',()=>{
            window.location.href="./realisateur.html"
        })
        $('#note').on('click',()=>{
            window.location.href="./note.html"
        })
        UserAuth(Url,token)
        .then(user => {
            //console.log(user);  // Handle the resolved value
        })
        .catch(error => {
            console.error('Error:', error);  // Handle any errors
        });
    }
    else{
        window.location.href = "./login.html"
    }

});

async function UserAuth(url,token) {
    headerParams = {'Authorization':`bearer ${token}`};
    let user = [];
    try {
        const response = await $.ajax({
            url: `${url}user/get/`,
            type: 'GET', // added data type
            contentType: 'application/json',
            headers:{
                'Authorization':`bearer ${token}`
            }
        });
        const { utilisateur } = response;
        return utilisateur;
    } catch (error) {
        console.log('Error:', error);
        return null;
    }
    
    
    
}