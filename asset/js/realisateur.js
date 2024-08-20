$(document).ready(()=>{
    const Url = "http://localhost:5055/api/v1/"
    const token = JSON.parse(localStorage.getItem('x-token'))
    afficher(Url)
    registerReal(Url,token)

});
async function afficher(url){
    // realisateurAll(url);
    realisateurAll(url)
    .then(data => {
         data.forEach(ele =>{
            const content = `
                <tr>
                    <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">${ele.code}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">${ele.nom}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">${ele.prenom}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">${ele.dateNaissance}</td>
                </tr>
            `

            $("#contentReal").append(content)
         })
    })
    .catch(error => {
        console.error('Error:', error);  // Handle any errors
    });
}
async function realisateurAll(url) {
    let user = [];
    try {
        const response = await $.ajax({
            url: `${url}realisateur/getAll`,
            type: 'GET', // added data type
            contentType: 'application/json'
        });
        
        const {realisateur} = response;
        return realisateur;

    } catch (error) {
        console.log('Error:', error);
        return null;
    }
    
    
    
}

async function registerReal(url,token) {
    
    $("#realForm").on('click',(e)=>{
        e.preventDefault();
    });

    $("#btnReal").on("click", ()=>{

        loading ();
        const code = $("#code").val();
        const nom = $("#nom").val();
        const prenom = $("#prenom").val();
        const dateNaissance = $("#dateNaissance").val();

        if(code == "" || nom === " " || prenom === " " || dateNaissance === " " ){
            closed('Veuillez remplir les champs',"bg-red-600")
            setTimeout(()=>{
                window.location.reload()
            },3000)
        }

        const data = {
            code,
            nom,
            prenom,
            dateNaissance
        }
        $.ajax({
            url: url+"realisateur/create",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            headers:{
                'Authorization':`bearer ${token}`
            },
            success: function(res) {
                console.log(res)
                const {message} = res
                if(message === "Réalisateur ajouter avec succès"){
                    closed(message,"bg-green-400")
                    setTimeout(()=>{
                        window.location.reload()
                    },3000)
                }
                else{
                    closed(message,"bg-red-700")
                    setTimeout(()=>{
                        window.location.reload()
                    },3000)
                }
            },
            error: function(xhr, status, error) {
                console.log('Error:', error);
            }
        });

    })
}
function loading (){
    $('#textBtn').addClass("hidden")
    $(".load").removeClass('hidden')
}

function closed(message, color){
    $('#textBtn').removeClass("hidden");
    $(".load").addClass('hidden')
    $('#textBtn').text(message)
    $("#btnReal").removeClass("bg-blue-400")
    $("#btnReal").addClass(color)
}

async function All(url) {
    let user = [];
    try {
         $.ajax({ 
            url: `${url}realisateur/getAll`,
            type: 'GET', // added data type
            contentType: 'application/json',
            success:(data)=>{
                const {realisateur} = data
                realisateur.forEach(ele=>{
                    const option = `
                       <option value="${ele.id}">${ele.titre}</option> 
                    `
                    $("#filmsOption").append(option)
                })
            }
        })
    } catch (error) {
        console.log('Error:', error);
        return null;
    } 
}