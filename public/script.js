function submitForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/send-email', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            window.location.href = '/thankyou.html'; // Redirect to the thank you page
        } else {
            alert('Error sending email');
        }
    };

    xhr.send(JSON.stringify({
        name,
        email
    }));
}