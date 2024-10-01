document.forms.openSistem.addEventListener('submit', async (event) => {
    event.preventDefault()
    if(document.getElementById('login').value && document.getElementById('password').value) {
        let link = await fetch('http://localhost/sait/Client/../server/select.php', {
            method: 'POST',
            body: new FormData(document.getElementById('top'))
        })
        let res = await link.json()
       if( res.length > 0) {
            alert('Вы вошли в систему!')
            document.getElementById('Dialog').toggleAttribute('open');
            document.getElementById('Dialog').remove();
            document.querySelector('main').innerHTML = " ";
            document.querySelector('main').style.alignItems = 'start'
            document.querySelector('main').insertAdjacentHTML('beforeend', `<section id="filesList"></section>`)
            document.getElementById('Open').setAttribute('class', 'profilButton');
            document.getElementById('Open').textContent = "";
            if(res[2].Добавлять == 1) {
                document.querySelector('footer').insertAdjacentHTML(`beforeend`, `<button id="Add">Добавить</button>`)
            } 
            if(res[2].Удалять == 1) {
                document.querySelector('footer').insertAdjacentHTML(`beforeend`, `<button id="Delete">Удалить</button>`)
            }
            createHTMLPapkaAndFiles(res)
            document.getElementById('Add').addEventListener('click', () => {
                document.body.insertAdjacentHTML('beforeend', `
                <dialog open class='dialog' id='dialogButton'>
                    <form id="dialogRadio" name = "dialogRadio" class='formInput'>
                        <button id="buttonDialog" class="buttonDialog" value="Papka">Папка</button>
                        <button id="buttonDialog" class="buttonDialog" value="File">Файл</button>
                    </form>
                </dialog>`);
                [...document.querySelectorAll('#buttonDialog')].forEach((el) => {
                    el.addEventListener('click', (event) => {
                        console.log(event.target.value)
                        if(event.target.value == 'Papka') {
                            document.getElementById('dialogButton').remove()
                            document.querySelector('main').insertAdjacentHTML('beforeend', `
                            <dialog open class='dialog' id='dialogAdd'>
                                <select id="AddPapkaGroup" name='Родительская_папка' class="select">
                                    <option>Выберите папку</option>
                                    <option>-</option>
                                </select>
                                <form id="addForm" name = "addForm" class='formInput' data-name = 'papka'>
                                    <section class='formSectionInput'>
                                        <input type="text" name='Name' id="namePapka" placeholder="Название папки">
                                        <input type="text" name='Описание' id="opisaniePapka" placeholder ="Описание">
                                    </section>
                                    <button id="actionSubmitButton" class="Papka" type="submit" data-action="add">Добавить</button>
                                </form>
                            </dialog>`)
                        } else if(event.target.value == 'File') {
                            document.getElementById('dialogButton').remove()
                            document.querySelector('main').insertAdjacentHTML('beforeend', `
                            <dialog open class='dialog' id='dialogAdd'>
                                <select id="AddPapkaGroup" name='Родительская_папка' class="select">
                                    <option>Выберите папку</option>
                                    <option>-</option>
                                </select>
                                <form id="addForm" name = "addForm" class='formInput' data-name = 'file'>
                                    <section class='formSectionInput'>
                                        <input type="text" name='Name' id="nameFile" placeholder="Название файла">
                                        <input type="text" name='Описание' id="opisanieFile" placeholder ="Описание">
                                        <input type="text" name='Ссылка' id="opisanieFile" placeholder ="Сылка">
                                    </section>
                                    <button id="actionSubmitButton" class="Papka" type="submit" data-action="add">Добавить</button>
                                </form>
                            </dialog>`)
                        }
                        res[0].forEach((el) => {
                            document.getElementById('AddPapkaGroup').insertAdjacentHTML('beforeend', `<option value="${el.id}">${el.Papka_Name}</option>`)
                        })
                        document.forms.addForm.addEventListener('submit', async (event) => {
                            event.preventDefault()
                            let form = new FormData(document.forms.addForm)
                            form.append('type', document.forms.addForm.dataset.name)
                            form.append('status', res[2].id)
                            form.append('action', document.getElementById('actionSubmitButton').dataset.action)
                            form.append('papka', document.getElementById('AddPapkaGroup').value)
                            let link = await fetch('http://localhost/sait/Client/../server/action.php', {
                                method: 'POST',
                                body: form
                            })
                            result = await link.json()
                            console.log(result)
                        })  
                    })
                })
            })
            document.getElementById('Delete').addEventListener('click', () => {

                document.body.insertAdjacentHTML('beforeend', `
                <dialog open class='dialog' id='dialogButton'>
                    <form id="dialogRadio" name = "dialogRadio" class='formInput'>
                        <button id="buttonDialog" class="buttonDialog" value="Papka">Папка</button>
                        <button id="buttonDialog" class="buttonDialog" value="File">Файл</button>
                    </form>
                </dialog>`);

                [...document.querySelectorAll('#buttonDialog')].forEach((el) => {

                    el.addEventListener('click', (event) => {

                        console.log(event.target.value)
                        if(event.target.value == 'Papka') {

                            document.getElementById('dialogButton').remove()
                            document.querySelector('main').insertAdjacentHTML('beforeend', `
                            <dialog open class='dialog' id='dialogDelete'>
                                <form id="deleteForm" class='formInput' data-name = 'papka'>
                                    <section class='formSectionInput'>
                                        <select id="deletePapka" name='Родительская_папка' class="select">
                                            <option>Выберите папку</option>
                                        </select>
                                    </section>
                                    <button id="actionSubmitButton" class="Papka" type="submit" data-action="delete">Удалить</button>
                                </form>
                            </dialog>`)

                        } else if(event.target.value == 'File') {

                            document.getElementById('dialogButton').remove()
                            document.querySelector('main').insertAdjacentHTML('beforeend', `
                            <dialog open class='dialog' id='dialogDelete'>
                                <form id="deleteForm" class='formInput' data-name = 'file'>
                                    <section class='formSectionInput'>
                                        <select id="deleteFail" name='Родительская_папка' class="select">
                                            <option>Выберите файл</option>
                                        </select>
                                    </section>
                                    <button id="actionSubmitButton" class="File" type="submit" data-action="delete">Удалить</button>
                                </form>
                            </dialog>`)

                        }

                        if(document.getElementById('deletePapka')) {
                            res[0].forEach((el) => {
                                document.getElementById('deletePapka').insertAdjacentHTML('beforeend', `<option value="${el.id}">${el.Papka_Name}</option>`)
                            })
                        } else {
                            res[1].forEach((el) => {
                                document.getElementById('deleteFail').insertAdjacentHTML('beforeend', `<option value="${el.id}">${el.Fails_Name}</option>`)
                            })
                        }
                        

                        document.forms.deleteForm.addEventListener('submit', async (event) => {
                            event.preventDefault()
                            let str = prompt('Вы уверены?') 
                            if(str == "Да") {
                                let form = new FormData()
                                form.append('type', document.forms.deleteForm.dataset.name)
                                form.append('action', document.getElementById('actionSubmitButton').dataset.action)
                                if(document.forms.deleteForm.dataset.name == "papka") {
                                    form.append('papka', document.getElementById('deletePapka').value)
                                } else if(document.forms.deleteForm.dataset.name == "file") {
                                    form.append('file', document.getElementById('deleteFail').value)
                                }
                                let link = await fetch('http://localhost/sait/Client/../server/action.php', {
                                    method: 'POST',
                                    body: form
                                })
                                result = await link.json()
                                console.log(result)
                            } else {
                                alert('Действие отменено')
                            }
                            
                        })  
                    })

                })

            })

            document.addEventListener('keydown', (event) => {
                if(event.key == 'Escape') {
                    if(document.getElementById('dialogButton')) {
                        document.getElementById('dialogButton').remove()
                    }
                    if(document.getElementById('dialogAdd')) {
                        document.getElementById('dialogAdd').remove()
                    }
                    if(document.getElementById('dialogDelete')) {
                        document.getElementById('dialogDelete').remove()
                    }
              
                }
            });
       } else {
           alert('Неверные данные')
       }
    } else {
        alert('Поля не заполнены')
    }
   
});



[...document.querySelectorAll('#Open')].map((el) => {
    el.addEventListener('click', () => {
        document.getElementById('Dialog').toggleAttribute('open')
        
    })
})

function createHTMLPapkaAndFiles(result) {
    const ar = []
    for(let obj of result[0]) {
        if(obj.Родительская_папка == "-" && ar.filter(el => el.id == obj.id).length == 0) {
            document.getElementById('filesList').insertAdjacentHTML('beforeend', `<section id="Papka${obj.id}" data-name="PapkaSection"><section data-name="PapkaSection"><img id="Papka${obj.id}" data-name="PapkaImg" src="../client/assets/image/Papka.png"><p id="Papka${obj.id}" data-name="PapkaP">${obj.Papka_Name}</p></section><section id="DocherPapka${obj.id}" class="DocherPapka"></section></section>`) 
            document.getElementById(`Papka${obj.id}`).children[0].classList.add('Papka')
            ar.push(obj)
        }
    }
    document.querySelector('main').addEventListener('click', (event) => {
                if(event.target.dataset.name == 'PapkaSection' || event.target.dataset.name == 'PapkaImg' || event.target.dataset.name == 'PapkaP') {
                    if(!event.target.parentElement.parentElement.children[1].children.length) {
                        for(let obj of result[0]) {
                            
                            if(!document.getElementById(`Papka${obj.id}`) || document.getElementById(`Papka${obj.id}`).dataset.name == 'PapkaSection') {
                                if( obj.Родительская_папка != "-" && ar.filter(el => el.id == obj.id).length == 0 && obj.Родительская_папка == event.target.id.split('Papka')[1]) {
                                    document.getElementById(`DocherPapka${obj.Родительская_папка}`).insertAdjacentHTML('afterbegin', `<section id="Papka${obj.id}" data-name="PapkaSection"><section data-name="PapkaSection"><img id="Papka${obj.id}" data-name="PapkaImg" src="../client/assets/image/Papka.png"><p id="Papka${obj.id}" data-name="PapkaP">${obj.Papka_Name}</p></section><section id = "DocherPapka${obj.id}" class="DocherPapka"></section></section>`)
                                    document.getElementById(`Papka${obj.id}`).children[0].classList.add('Papka')
                                }
                            }
                            for(let fiel of result[1]) {
                                if(event.target.parentElement.parentElement.id.split('Papka')[1] == fiel.Папка && !document.getElementById('File' + fiel.id)) {
                                    let file = fiel.Fails_Ссылка
                                    if(file.indexOf('document') != -1 ) {
                                        document.getElementById(`DocherPapka${event.target.parentElement.parentElement.id.split('Papka')[1]}`).insertAdjacentHTML('beforeend', `<a href="${file}" id= "File${fiel.id}" download class='Papka'><img src="../client/assets/image/Word.png"><p>${fiel.Fails_Name}</p></a>`)
                                    } else if(file.indexOf("spreadsheets") != -1) {
                                        document.getElementById(`DocherPapka${event.target.parentElement.parentElement.id.split('Papka')[1]}`).insertAdjacentHTML('beforeend', `<a href="${file}" id= "File${fiel.id}" download class='Papka'><img src="../client/assets/image/Excel.png"><p>${fiel.Fails_Name}</p></a>`)
                                    } else if(file.indexOf("presentation") != -1) {
                                        document.getElementById(`DocherPapka${event.target.parentElement.parentElement.id.split('Papka')[1]}`).insertAdjacentHTML('beforeend', `<a href="${file}" id= "File${fiel.id}" download class='Papka'><img src="../client/assets/image/PowerPoint.png"><p>${fiel.Fails_Name}</p></a>`)
                                    } else {
                                        console.error('Нет такого типа файла')
                                    }
                                } else {
                                    
                                }
                            }
                        }
                    } else {
                        document.getElementById(`DocherPapka${event.target.id.split('Papka')[1]}`).innerHTML = "";
                        [...document.getElementById(`${`DocherPapka${event.target.id.split('Papka')[1]}`}`).querySelectorAll('a')].forEach(el => el.remove())
                    }
                    
                } 
    })
}