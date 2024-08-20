$(document).ready(()=>{
    const Url = "http://localhost:5055/api/v1/"
    const token = JSON.parse(localStorage.getItem('x-token'))
    afficher(Url)
    registerProject(Url,token)

});
async function afficher(url){
    filmsAll(url);
    // realisateurAll(url);
    projectAll(url)
    .then(films => {
         films.forEach(ele =>{
            const {films} = ele;
            const content = `
                <tr>
                    <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">${films.titre}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">${ele.salle}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">${ele.date} à ${ele.lieu}</td>
                </tr>
            `

            $("#contentProj").append(content)
         })
    })
    .catch(error => {
        console.error('Error:', error);  // Handle any errors
    });
}
async function projectAll(url) {
    let user = [];
    try {
        const response = await $.ajax({
            url: `${url}projection/getAll`,
            type: 'GET', // added data type
            contentType: 'application/json'
        });
        
        const {projection} = response;
        return projection;

    } catch (error) {
        console.log('Error:', error);
        return null;
    }
    
    
    
}

async function registerProject(url,token) {
    
    $("#projectForm").on('click',(e)=>{
        e.preventDefault();
    });

    $("#btnProject").on("click", ()=>{

        loading ();
        const jour = $("#jour").val();
        const date = $("#date").val();
        const lieu = $("#lieu").val();
        const salle = $("#salle").val();
        const filmsOption = $("#filmsOption").val();

        if(jour == "" || date === " " || lieu === " " || salle === " " || filmsOption ===" " ){
            closed('Veuillez remplir les champs',"bg-red-600")
            setTimeout(()=>{
                window.location.reload()
            },3000)
        }

        const data = {
            jour,
            date,
            lieu,
            salle,
            filmsId: filmsOption
        }
        $.ajax({
            url: url+"projection/create",
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
    $("#btnProject").removeClass("bg-blue-400")
    $("#btnProject").addClass(color)
}

async function filmsAll(url) {
    let user = [];
    try {
         $.ajax({ 
            url: `${url}films/getAll`,
            type: 'GET', // added data type
            contentType: 'application/json',
            success:(data)=>{
                const {Filmss} = data
                Filmss.forEach(ele=>{
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