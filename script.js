const authenticate = () => {
    const isAuthenticated = sessionStorage.getItem('verified')

    if (isAuthenticated) init()
    else {
        const input = prompt("Please enter password to access the app!")
        if (input == 112358) sessionStorage.setItem('verified', true)
        authenticate()
    }

}


const init = () => {
    const initName = () => {
        let name = localStorage.getItem('name')
        if (!name) {
            const nameInput = prompt("What is your name?")
            localStorage.setItem('name', nameInput)
            name = nameInput
        }
    
        document.querySelector('#greetings').textContent = `Hello, ${name}!`
    }
    initName()

    let mode = localStorage.getItem('mode')
    const changeMode = mode => {
        if (mode == 'light' || !mode) {
            var linkNode = document.getElementsByTagName('link')[2];
            if (linkNode) linkNode.parentNode.removeChild(linkNode);

            document.querySelector('#mode').innerHTML = `
            <svg class="light">
                <use href="./icons.svg#icon__sun"></use>
            </svg>
            `
        } else if (mode == 'dark') {
            document.getElementsByTagName("head")[0].insertAdjacentHTML("beforeend",
            "<link rel=\"stylesheet\" href=\"style.dark.css\" />")

            document.querySelector('#mode').innerHTML = `
            <svg class="light">
                <use href="./icons.svg#icon__moon-stars-fill"></use>
            </svg>
            `
        } 
        localStorage.setItem('mode', mode)
    }
    changeMode(mode)


    const alphabetSmall = 'abcdefghijklmnopqrstuvwxyz'
    const alphabetCapital = alphabetSmall.toUpperCase()

    const encodedAlphabetSmall = 'ecbiagfjdhqmlpunksrvotzyxw'
    const encodedAlphabetCapital = encodedAlphabetSmall.toUpperCase()

    const processText = text => {
        let proccessedText = ''

        Array.from(text).forEach(cur => {
            if (alphabetSmall.includes(cur)) {
                proccessedText += encodedAlphabetSmall[alphabetSmall.indexOf(cur)]
            } else if (alphabetCapital.includes(cur)) {
                proccessedText += encodedAlphabetCapital[alphabetCapital.indexOf(cur)]
            } else {
                proccessedText += cur
            }
        })

        return proccessedText
    }


    const renderText = (text) => {
        document.querySelector('#output_text').value = text
    }


    const processTextCtrl = () => {
        const inputText = document.querySelector('#input_text').value
        const proccessedText = processText(inputText)
        console.log(proccessedText)
        renderText(proccessedText)

        if (document.querySelector('#copy').checked) {
            var copyText = document.querySelector('#output_text')
            copyText.select()
            document.execCommand('copy')
        }
    }


    document.querySelector('#enter__btn').addEventListener('click', processTextCtrl)
    document.addEventListener('keypress', e => {
        if (e.keyCode == 13) {
            e.preventDefault()
            processTextCtrl()
        }
    })

    const clearText = () => {
        document.querySelector('#input_text').value = ''
        document.querySelector('#input_text').focus()
        document.querySelector('#output_text').value = ''

    }
    document.querySelector('#clear').addEventListener('click', clearText)

    Array.from(document.querySelectorAll('.coming_soon')).forEach(cur => {
        cur.addEventListener('click', e => {
            e.preventDefault()
            alert('Coming soon...')
        })
    })

    document.querySelector('#change_name').addEventListener('click', e => {
        e.preventDefault()
        localStorage.removeItem('name')
        initName()
    })

    
    document.querySelector('#mode').addEventListener('click', () => {
        const mode = localStorage.getItem('mode') == 'light' ? 'dark' : 'light'
        changeMode(mode)
    })

}

authenticate()