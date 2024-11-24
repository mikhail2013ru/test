import checkNumInputs from "./checkNumInputs"

const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]')

        // trigger.addEventListener('click', (e) => {
        //     if (e.target) {
        //         console.log(e.target);
        //         e.preventDefault()
        //     }

        //     modal.style.display = 'block'
        //     document.body.style.overflow = 'hidden'
        //     // document.body.classList.add('modal-open')
        // })

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault()
                }

                windows.forEach(item => {
                    item.style.display = 'none'
                })
    
                modal.style.display = 'block'
                document.body.style.overflow = 'hidden'
                // document.body.classList.add('modal-open')
            })
        })

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none'
            })

            modal.style.display = 'none'
            document.body.style.overflow = ''
            // document.body.classList.remove('modal-open')
        })

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                    item.style.display = 'none'
                })

                console.log(modalState);

                modal.style.display = 'none'
                document.body.style.overflow = ''
                // document.body.classList.remove('modal-open')
            }
        })
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            document.querySelector(selector).style.display = 'block'
            document.body.style.overflow = 'hidden'
        }, time)
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close')
    bindModal('.phone_link', '.popup', '.popup .popup_close')
    // showModalByTime('.popup', 60000)
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close', false)
    // bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false)
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false)

    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required]'); // Выбираем все input с атрибутом required
        let isValid = true;
      
        inputs.forEach(input => {
          if (input.value.trim() === '') {
            input.classList.add('invalid'); // Добавляем класс для визуальной индикации ошибки
            isValid = false;
          } else {
            input.classList.remove('invalid'); // Убираем класс, если поле заполнено корректно
          }
        });
      
        return isValid;
      }
      
      
    document.querySelector('#popup_calc_button--id').addEventListener('click', () => {
    const modalForm = document.querySelector('.popup_calc_content');  // Предполагается, что форма находится внутри модального окна
        if (validateForm(modalForm)) {
        // console.log(modalForm);
            bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
        } else {
            alert('Пожалуйста, заполните все обязательные поля!'); // Или более изящное сообщение об ошибке
        }
    });

    return bindModal
}

// const bindModal = modals()
// export { bindModal }
export default modals