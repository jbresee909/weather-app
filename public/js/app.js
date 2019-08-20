

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message_1 = document.querySelector('#message-1')
const message_2 = document.querySelector('#message-2')

message_1.textContent = ''
message_2.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = '/weather?address=' + search.value

    fetch(location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message_1.textContent = data.error;
                message_2.textContent = '';
            } else {
                message_1.textContent = data.location;
                message_2.textContent = data.forecast;
            }
        })
    })
})