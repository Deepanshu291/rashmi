const scriptURL = 'https://script.google.com/macros/s/AKfycbyPcGCo4eOI9_Ui-VM_xsjSIPsbxk8UFtjWZ_HXEV2p06NVAXY/exec'
     const form = document.forms['google-sheet']

        //   Fetch Api
         
        form.addEventListener('submit',async e => {
              e.preventDefault()
              const sheet = await fetch(scriptURL, { method: 'POST', body: new  FormData(form)})
            //   sheet.then(response => alertf("Thanks for Contacting us..! We Will Contact You Soon..."))
            //     .catch(error => console.error('Error!', error.message))
        })

    function alertf() {
                 alert("Thanks for Contacting us..! We Will Contact You Soon...");
                 window.location.reload();         
     }

// $(document).ready(function() {

//     // process the form
//     $('form').submit(function(event) {

//         // get the form data
//         // there are many ways to get this data using jQuery (you can use the class or id also)
//         var formData = {
//             'name'              : $('input[name=name]').val(),
//             'email'             : $('input[name=email]').val(),
//             'phone'             : $('input[name=phone]').val(),
//             'message'    : $('input[name=Message]').val()
//         };

//         // process the form
//         $.ajax({
//             type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
//             url         : 'https://script.google.com/macros/s/AKfycby1tpFrTz8ER-_zs3IuX3ukVs2txcGyco9CQYWVqqx9bQI1acpd/exec', // the url where we want to POST
//             data        : formData, // our data object
//             dataType    : 'json', // what type of data do we expect back from the server
//             encode          : true
//         })
//             // using the done promise callback
//             .done(function(data) {

//                 // log data to the console so we can see
//                 console.log(data);

//                 // here we will handle errors and validation messages
//             });

//         // stop the form from submitting the normal way and refreshing the page
//         event.preventDefault();
//     });

// });

