window.addEventListener('DOMContentLoaded', (e) => {

    const button = document.querySelector('#get-emails')
    const tableBody = document.querySelector('.table-body')
    let allIdElements = document.querySelectorAll('.id');

    console.log(allIdElements)

    button.addEventListener('click', (e) => {

        fetch('http://localhost:5000/showEmails')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
                createAndAddElements(data)
            })
            .catch((err) => {
                console.error("error:", err)
            })

    })

//    const updateTable = (data) => {
//        if (allIdElements.length < 1) {
//            createAndAddElements(data)
//        } else {
//            for (let i = 0; i < allIdElements.length; i++) {
//                if (allIdElements.innerText ===)
//            }
//        }
//    }

    const createAndAddElements = (data) => {
        let jsonArr = JSON.parse(data)

        if (allIdElements.length < 1 ) {
            console.log("abc more123")

            for (let i = 0; i < jsonArr.length; i++ ) {
                let row = document.createElement("tr")
                row.classList.add('active-row')

                let tdId = document.createElement("td")
                tdId.classList.add('id')
                let tdName = document.createElement("td")
                let tdEmail = document.createElement("td")

                let idTxt = document.createTextNode(jsonArr[i].id)
                let nameTxt = document.createTextNode(jsonArr[i].name)
                let emailTxt = document.createTextNode(jsonArr[i].email)

                tdId.appendChild(idTxt)
                tdName.appendChild(nameTxt)
                tdEmail.appendChild(emailTxt)

                row.appendChild(tdId);
                row.appendChild(tdName);
                row.appendChild(tdEmail);

                tableBody.appendChild(row)
            }

            allIdElements = document.querySelectorAll('.id');
        } else {
            for (let i = 0; i < jsonArr.length; i++ ) {

                if (allIdElements[i] == null) {
                    let row = document.createElement("tr")
                    row.classList.add('active-row')

                    let tdId = document.createElement("td")
                    tdId.classList.add('id')
                    let tdName = document.createElement("td")
                    let tdEmail = document.createElement("td")

                    let idTxt = document.createTextNode(jsonArr[i].id)
                    let nameTxt = document.createTextNode(jsonArr[i].name)
                    let emailTxt = document.createTextNode(jsonArr[i].email)

                    tdId.appendChild(idTxt)
                    tdName.appendChild(nameTxt)
                    tdEmail.appendChild(emailTxt)

                    row.appendChild(tdId);
                    row.appendChild(tdName);
                    row.appendChild(tdEmail);

                    tableBody.appendChild(row)
                }
            }
        }
    }
})