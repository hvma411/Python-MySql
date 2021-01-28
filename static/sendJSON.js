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

        if (formObj.name.length < 1 || formObj.email.length < 1) {
            alert("Type some data in all fields!")
        } else {
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
                inputName.value = ""
                inputEmail.value = ""
            })
            .catch((err) => {
                console.log(err)
            })
        }
    })
})