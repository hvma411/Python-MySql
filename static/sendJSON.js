window.addEventListener('DOMContentLoaded', e => {
    const button = document.querySelector('#send-email');
    const inputName = document.querySelector('#name')
    const inputEmail = document.querySelector('#email')

    let formObj = {
        name: "",
        email: ""
    }

    button.addEventListener('click', (e) => {

        formObj = {
            name: inputName.value,
            email: inputEmail.value,
        }

        let jsonFile = JSON.stringify(formObj)

        fetch('http://localhost:5000/addEmail', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            datatype: 'json',
            body: jsonFile
        })
        .then((res) => {
            console.log(res)
        })
    })
})