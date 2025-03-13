



window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });


document.querySelector('.booking-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const submitButton = document.querySelector('.submit-btn');
    const textbutt = submitButton.textContent;
    submitButton.textContent = "Processing...";
    submitButton.disabled = true;
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    try{
        const response = await fetch('/api/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        });
        const data = await response.json();
        if (response.ok) {
            alert("Booking successful!");
            this.reset();
        }
        else if (response.status === 410) {
            alert("No available rooms");
        }
        else {
            alert("Failed to process booking");
        }
        submitButton.textContent = textbutt;
        submitButton.disabled = false;
    }
    catch (error) {
        console.error('Error submitting form:', error);
        alert('There was a problem processing your booking. Please try again later.');
    }

});