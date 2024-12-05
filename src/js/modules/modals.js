import checkNumInputs from "./checkNumInputs"

const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll()
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
                // console.log(e.target);
                // e.target.classList.add('active-modal')
                // modal.style.display = 'block'
                // e.target.classList.contains('popup_calc_btn')
                // if (!e.target.classList.contains('active-modal')) {
                //     console.log(e.target.classList);
                //     console.log(item);
                //     console.log(e.target);
                //     // e.preventDefault()
                // } else {
                //     // e.target.classList.add('active-modal')
                // }
                windows.forEach(item => {
                    item.style.display = 'none'
                    // console.log(item);
                })
                // console.log(validateForm());
                
                modal.style.display = 'block'
                document.body.style.overflow = 'hidden'
                document.body.style.marginRight = `${scroll}px`
                // document.body.classList.add('modal-open')
            })
        })

        close.addEventListener('click', (e) => {
            console.log(e);
            windows.forEach(item => {
                item.style.display = 'none'
            })

            modal.style.display = 'none'
            document.body.style.overflow = ''
            document.body.style.marginRight = `0px`
            // document.body.classList.remove('modal-open')
        })

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                    console.log(item);
                    item.style.display = 'none'
                })

                modal.style.display = 'none'
                document.body.style.overflow = ''
                document.body.style.marginRight = `0px`
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

    function validateForm() {
        const modalForm = document.querySelector('.popup_calc'),
            inputs = modalForm.querySelectorAll('input[required]');
        let isValid = true;
        inputs.forEach(input => {
          if (input.value.trim() === '') {
            input.classList.add('invalid')
            isValid = false;
          } else {
            input.value = ''
            input.classList.remove('invalid')
          }
        });
        
        return isValid;
        
    }
      
      
    document.querySelector('.popup_calc_button').addEventListener('click', () => {
        const modalForm = document.querySelector('.popup_calc'),
            calcButton = document.querySelector('.popup_calc_button'),
            calcProfile = document.querySelector('.popup_calc_profile');
            let result = validateForm()
            if (modalForm && result) {
                calcButton.style.display = 'inline-block'
                calcProfile.style.display = 'block'
                modalForm.style.display = 'none'
            } else {
                alert('Пожалуйста, заполните все обязательные поля!')
            }
    });

    document.querySelector('.popup_calc_profile_close').addEventListener('click', () => {
        const calcProfile = document.querySelector('.popup_calc_profile');
            calcProfile.style.display = 'none'
            document.body.style.overflow = ''
    })

    return bindModal

    function calcScroll() {
        let div = document.createElement('div')
        div.style.width = '50px'
        div.style.height = '50px'
        div.style.overflowY = 'scroll'
        div.style.visibility = 'hidden'
        document.body.appendChild(div)
        let scrollWidth = div.offsetWidth - div.clientWidth
        div.remove()

        return scrollWidth
    }
}

// const bindModal = modals()
// export { bindModal }
export default modals