document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('autos').addEventListener('click', () => {
    localStorage.setItem('catID', 101);
    location.href = 'products.html';
  });
  
  document.getElementById('juguetes').addEventListener('click', () => {
    localStorage.setItem('catID', 102);
    location.href = 'products.html';
  });
  
  document.getElementById('muebles').addEventListener('click', () => {
    localStorage.setItem('catID', 103);
    location.href = 'products.html';
  });
});

