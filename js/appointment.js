const form = document.getElementById("appointmentForm");
const success = document.getElementById("successMessage");

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const data = {

        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        service: document.getElementById("service").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        message: document.getElementById("message").value

    };

    const response = await fetch("/book-appointment", {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(data)

    });

    const result = await response.json();

    if(result.success){

        success.classList.add("show");

        form.reset();

        setTimeout(() => {

            success.classList.remove("show");

        },3000);

    }

});