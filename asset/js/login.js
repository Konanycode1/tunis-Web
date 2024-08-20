$(document).ready(function(){
    
    const urlDev = "http://localhost:3000"
    const url = "http://localhost:5055/api/v1/"
    const token = JSON.parse(localStorage.getItem('x-token'));
    console.log(token)
    if(token !== null){
        window.location.href = "./accueil.html"
    }
    else{
        $("#formLogin").on('click',(e)=>{
            
            e.preventDefault();
        });
    
        $("#btnLogin").on("click", ()=>{
    
            loading ();
            const userName = $("#username").val();
            const password = $("#password").val();

            if(userName == "" ||userName === " " || password ==="" || password === " "){
                closed('Veuillez remplir les champs',"bg-red-600")
            }
    
            const data = {
                code:userName,
                password
            }
            console.log(data)
            $.ajax({
                url: url+"user/login",
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(res) {
                    console.log(res)
                    const {message,token} = res
                    if(message === "Connexion successful"){
                        closed(message,"bg-green-400")
                        localStorage.setItem('x-token',JSON.stringify(token))
                        setTimeout(()=>{
                            window.location.href = "./accueil.html"
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
                    alert('Error: ' + error);
                }
            });
    
        })
    }
   


});

function loading (){
    $('#textBtn').addClass("hidden")
    $(".load").removeClass('hidden')
}

function closed(message, color){
    $('#textBtn').removeClass("hidden");
    $(".load").addClass('hidden')
    $('#textBtn').text(message)
    $("#btnLogin").removeClass("bg-blue-400")
    $("#btnLogin").addClass(color)
}