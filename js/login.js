
document.addEventListener('DOMContentLoaded', function() {

const alertSuccess = document.getElementById("alert-success");
const alertDanger = document.getElementById("alert-danger");
const closeBtns = document.querySelectorAll('.btn-close');


const msjError = document.getElementById('MsjError');
const msjExito = document.getElementById('MsjExito');


const btnReg = document.getElementById('BtnReg');
const btnAcc = document.getElementById('BtnAcc');


const regNom = document.getElementById('RegNom');
const regMail = document.getElementById('RegMail');
const regContra = document.getElementById('RegContra');


const accEmail = document.getElementById('AccEmail');
const accContra = document.getElementById('AccContra');

function showAlertSuccess() {
  alertSuccess.classList.add("show");
  alertDanger.classList.remove("show");
}

function showAlertError() {
  alertDanger.classList.add("show");
  alertSuccess.classList.remove("show");
}

function Acceder(){
    window.location.href= 'index.html';
}

btnReg.addEventListener('click', () => {

  if (!regNom.value || !regMail.value || !regContra.value) {

    msjError.innerHTML='<p>No se completaron todos los campos</p>';
    showAlertError()
    return
  }

  if (regContra.value.length < 6) {

    msjError.innerHTML='<p>La contraseña de registro es muy corta</p>';
    showAlertError()
    return
  }

  if (!(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(regMail.value))) {
    msjError.innerHTML = '<p>El dato ingresado no es un mail válido</p>';
    showAlertError();
    return;
}


  msjExito.innerHTML='<p>Usted a sido registrado!</p>';
  showAlertSuccess();
  Acceder()
});

btnAcc.addEventListener('click', () =>{
    if (!accEmail.value || !accContra.value){
        msjError.innerHTML='<p>Ingrese usuario y contraseña</p>';
        showAlertError()
        return
    }

    if (!(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(accEmail.value))) {
        msjError.innerHTML = '<p>El dato ingresado no es un mail válido</p>';
        showAlertError();
        return;
    }

    msjExito.innerHTML='<p>Bienvenido de vuelta a eMercado!</p>';
    showAlertSuccess();
    Acceder()
});

closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (alertDanger.classList.contains('show')) {
      alertDanger.classList.remove('show')
    } else {
      alertSuccess.classList.remove('show')
    }
  })
});

});
