import checkNumInputs from "./checkNumInputs";
import modals from "./modals";
import { bindModal } from './modals'

const forms = (state) => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input');

    checkNumInputs('input[name="user_phone"]')
    // phoneInputs.forEach(item => {
    //     item.addEventListener('input', () => {
    //         item.value = item.value.replace(/\D/, '')
    //     })
    // })

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Мы скоро с Вами свяжемся!',
        failure: 'Что-то пошло не так...'
    }

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading
        let res = await fetch(url, {
            method: 'POST',
            body: data
        })

        return await res.text()
    }

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = ''
        })
    }

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault()

            let statusMessage = document.createElement('div')
            statusMessage.classList.add('status')
            item.appendChild(statusMessage)

            const formData = new FormData(item)
            if (item.getAttribute('data-calc') === 'end') {
                console.log('data-calc');
                for (let key in state) {
                    formData.append(key, state[key])
                    // console.log(Array.from(formData));
                }

                // console.log(state);

            }

            postData('assets/server.php', formData)
                .then(res => {
                    // console.log(res);
                    statusMessage.textContent = message.success
                    setTimeout(() => {
                        // document.querySelector('.popup_engineer').style.display = 'none'
                        // bindModal('.btn-block', '.popup_engineer', '.popup_close', true)
                    }, 3000)
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs()
                    setTimeout(() => {
                        statusMessage.remove()
                        // document.querySelector('.popup_calc_end').style.display = 'none'
                        // if (document.querySelector('.popup_engineer')) {
                        // }
                    }, 5000)
                })
        })
    })

}

export default forms