$(document).ready(()=>{
    const Url = "http://localhost:5055/api/v1/"
    const token = JSON.parse(localStorage.getItem('x-token'))
    afficher(Url)
    registerNote(Url,token)

});
async function afficher(url){
    filmsAll(url)
    // realisateurAll(url);
    noteAll(url)
    .then(data => {
         data.forEach(ele =>{
            console.log(ele)
            // const {films} = ele;
            // const content = `
            //     <tr>
            //         <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">${films.titre}</td>
            //         <td class="whitespace-nowrap px-4 py-2 text-gray-700">${ele.salle}</td>
            //         <td class="whitespace-nowrap px-4 py-2 text-gray-700">${ele.date} à ${ele.lieu}</td>
            //     </tr>
            // `

            $("#contentNote").append(content)
         })
    })
    .catch(error => {
        console.error('Error:', error);  // Handle any errors
    });
}
async function noteAll(url) {
    let user = [];
    try {
        const response = await $.ajax({
            url: `${url}note/getAll`,
            type: 'GET', // added data type
            contentType: 'application/json'
        });
        console.log(response)
        const {note} = response;
        return note;

    } catch (error) {
        console.log('Error:', error);
        return null;
    }
    
    
    
}

async function registerNote(url,token) {
    
    $("#noteForm").on('click',(e)=>{
        e.preventDefault();
    });

    $("#btnNote").on("click", ()=>{

        loading ();
        const note = $("#noteValue").val();
        const filmsOption = $("#filmsOption").val();
        console.log($("#noteValue").val())
        if(note === "" || filmsOption ==="" ){
            closed('Veuillez remplir les champs',"bg-red-600")
            setTimeout(()=>{
                window.location.reload()
            },3000)
        }

        const data = {
            note,
            filmsId: filmsOption
        }
        $.ajax({
            url: url+"note/create",
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
    $("#btnNote").removeClass("bg-blue-400")
    $("#btnNote").addClass(color)
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