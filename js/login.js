const alertDanger = document.getElementById('alert-danger')
const closeBtns = document.querySelectorAll('.btn-close')

const msjError = document.getElementById('MsjError')

const btnReg = document.getElementById('BtnReg')
const btnAcc = document.getElementById('BtnAcc')

const regNom = document.getElementById('RegNom')
const regMail = document.getElementById('RegMail')
const regContra = document.getElementById('RegContra')

const accEmail = document.getElementById('AccEmail')
const accContra = document.getElementById('AccContra')

const patronEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

function showAlertError () {
  alertDanger.classList.add('show')
}

btnReg.addEventListener('click', () => {
  if (!regNom.value || !regMail.value || !regContra.value) {
    msjError.innerHTML = '<p>No se completaron todos los campos</p>'
    showAlertError()
    return
  }
  
  if (!(patronEmail.test(regMail.value))) {
    msjError.innerHTML = '<p>El dato ingresado no es un mail válido</p>'
    showAlertError()
    return
  }

  if (regContra.value.length < 6) {
    msjError.innerHTML = '<p>La contraseña de registro es muy corta</p>'
    showAlertError()
    return
  }

  const changeButton = document.querySelector('[for="reg-log"]')
  changeButton.click()

  accEmail.value = regMail.value
  accContra.value = regContra.value

  regMail.value = regMail.defaultValue 
  regNom.value = regNom.defaultValue
  regContra.value = regContra.defaultValue
})

btnAcc.addEventListener('click', () => {
  if (!accEmail.value || !accContra.value) {
    msjError.innerHTML = '<p>Ingrese usuario y contraseña</p>'
    showAlertError()
    return
  }

  if (!(patronEmail.test(accEmail.value))) {
    msjError.innerHTML = '<p>El dato ingresado no es un mail válido</p>'
    showAlertError()
    return
  }

  window.localStorage.setItem('user', 'usuario')
  window.location.href = 'index.html'
})

closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (alertDanger.classList.contains('show')) {
      alertDanger.classList.remove('show')
    }
  })
})
