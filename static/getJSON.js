document.addEventListener('DOMContentLoaded', (e) => {

    const button = document.querySelector('#get-emails')
    const tableBody = document.querySelector('.table-body')
    let allIdElements = document.querySelectorAll('.id');

    button.addEventListener('click', (e) => {

        fetch('http://localhost:5000/showEmails')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                updateTable(data)
            })
            .catch((err) => {
                console.error("error:", err)
            })
    })

    const updateTable = (data) => {
        let jsonArr = data
        if (allIdElements.length < 1) {
            for (let i = 0; i < jsonArr.length; i++ ) {
                createAndAdd(data, i)
            }
            allIdElements = document.querySelectorAll('.id');

        } else if (jsonArr.length < allIdElements.length) {
            tableBody.innerHTML = ""
            for (let i = 0; i < jsonArr.length; i++ ) {
                createAndAdd(data, i)
            }
        } else {
            for (let i = 0; i < jsonArr.length; i++ ) {
                if (allIdElements[i] == null) {
                    createAndAdd(data, i)
                    allIdElements = document.querySelectorAll('.id');
                }
            }
        }
    }

    const createAndAdd = (data, i) => {
        let jsonArr = data;

        let row = document.createElement("tr")
        row.classList.add('active-row')

        let tdId = document.createElement("td")
        tdId.classList.add('id')
        let tdName = document.createElement("td")
        let tdEmail = document.createElement("td")

        let idTxt = document.createTextNode(Object.assign({}, jsonArr[i]).id)
        let nameTxt = document.createTextNode(Object.assign({}, jsonArr[i]).name)
        let emailTxt = document.createTextNode(Object.assign({}, jsonArr[i]).email)

        tdId.appendChild(idTxt)
        tdName.appendChild(nameTxt)
        tdEmail.appendChild(emailTxt)

        row.appendChild(tdId);
        row.appendChild(tdName);
        row.appendChild(tdEmail);

        tableBody.appendChild(row)
    }
})