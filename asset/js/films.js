$(document).ready(()=>{
    const Url = "http://localhost:5055/api/v1/"
    const token = JSON.parse(localStorage.getItem('x-token'))
    afficher(Url)
    registerFilms(Url,token)

});
async function afficher(url){
    producteurAll(url);
    realisateurAll(url);
    FilmsAll(url)
    .then(films => {
         films.forEach(ele =>{
            const content = `
                <tr>
                    <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">${ele.code}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">${ele.titre}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">${ele.dateCreate}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">${ele.Note !=null?ele.Note.note:'A/N'}</td>
                </tr>
            `

            $("#contentTab").append(content)
         })
    })
    .catch(error => {
        console.error('Error:', error);  // Handle any errors
    });
}
async function FilmsAll(url) {
    let user = [];
    try {
        const response = await $.ajax({
            url: `${url}films/getAll`,
            type: 'GET', // added data type
            contentType: 'application/json'
        });
        const {Filmss } = response;
        return Filmss;
    } catch (error) {
        console.log('Error:', error);
        return null;
    }
    
    
    
}

async function registerFilms(url,token) {

    $("#filmForm").on('click',(e)=>{
        e.preventDefault();
    });

    $("#btnSendFilms").on("click", ()=>{

        loading ();
        const code = $("#code").val();
        const titre = $("#titre").val();
        const sujet = $("#sujet").val();
        const dateCreate = $("#dateCreate").val();

        if(code == "" || titre === " " || dateCreate ==="" || sujet === " "){
            closed('Veuillez remplir les champs',"bg-red-600")
            setTimeout(()=>{
                window.location.reload()
            },3000)
        }

        const data = {
            code,
            titre,
            sujet,
            dateCreate
        }
        $.ajax({
            url: url+"films/create",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            headers:{
                'Authorization':`bearer ${token}`
            },
            success: function(res) {
                console.log(res)
                const {message} = res
                if(message === "Insertion effectuée avec succès !!"){
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
    $("#btnSendFilms").removeClass("bg-blue-400")
    $("#btnSendFilms").addClass(color)
}

async function producteurAll(url) {
    let user = [];
    try {
         $.ajax({ 
            url: `${url}producteur/getAll`,
            type: 'GET', // added data type
            contentType: 'application/json',
            success:(data)=>{
                const {producteur} = data
                producteur.forEach(ele=>{
                    const option = `
                       <option value="${ele.id}">${ele.nom} ${ele.prenom}</option> 
                    `
                    $("#producteur").append(option)
                })
            }
        })
    } catch (error) {
        console.log('Error:', error);
        return null;
    } 
}
async function realisateurAll(url) {
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
                       <option value="${ele.id}">${ele.nom} ${ele.prenom}</option> 
                    `
                    $("#realisateur").append(option)
                })
            }
        })
    } catch (error) {
        console.log('Error:', error);
        return null;
    }
    
    
    
}