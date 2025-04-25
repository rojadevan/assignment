document.addEventListener('DOMContentLoaded', function () {
    // Background color transition
    let isFirstColor = true;
    setInterval(() => {
        document.body.style.backgroundColor = isFirstColor ? '#EFEFEF' : '#ECF8FB';
        isFirstColor = !isFirstColor;
    }, 5000);


    const phoneInput = document.getElementById('phoneNumber');
    const form = document.getElementById('detailsForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const submitBtn = document.getElementById('submitBtn');
    //phone masking
    phoneInput.addEventListener('input', function(e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });


    let submitted = false;


    function isValidPhone(value) {
        return value.replace(/\D/g, '').length === 10;
    }
    //valid email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    const inputValues=[phoneInput,nameInput,emailInput];
    inputValues.forEach((input)=>{
        input.addEventListener('input',function(){
            this.classList.remove('error')
        })
    })

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (submitted) return;
        let isValid = true;

        //name validation
        if (nameInput.value.trim().length < 2) {
            nameInput.classList.add('error');
            isValid = false;
        }
      

        //phone validation
        if (!phoneInput.value || !isValidPhone(phoneInput.value)) {
            phoneInput.classList.add('error');
            isValid=false;
        }

        if(!emailInput || !isValidEmail(emailInput.value)){
            emailInput.classList.add('error');
            isValid=false;
        }

        if (isValid) {
            submitBtn.disabled = true;
            
            // Collect form data
            const formData = {
                name: nameInput.value.trim(),
                city: document.getElementById('city').value.trim(),
                state: document.getElementById('state').value.trim(),
                phone: phoneInput.value.trim(),
                email: emailInput.value.trim()
            };

            // Submit via AJAX
            fetch('https://formsws-hilstaging-com-0adj9wt8gzyq.runscope.net/solar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                // Mark as submitted regardless of server response
                submitted = true;
                submitBtn.textContent = 'Submitted';
            })
            .catch(error => {
                // Ignore errors as per requirements
                submitted = true;
                submitBtn.textContent = 'Submitted';
            });
        }
      
    })
})

