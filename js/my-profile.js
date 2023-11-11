document.addEventListener('DOMContentLoaded', () => {
  const user = localStorage.getItem('user');
  document.getElementById('mail').value = user;

  const profile = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null;
  const profileImageSrc = localStorage.getItem('profileImg') ?? 'img/img_perfil.png';

  if (!!profile) {
    document.getElementById('firstName').value = profile.firstName;
    document.getElementById('secondName').value = profile.secondName;
    document.getElementById('lastName').value = profile.lastName;
    document.getElementById('secondLastName').value = profile.secondLastName;
    document.getElementById('contactPhone').value = profile.contactPhone;
    document.getElementById('profileImage').src = profileImageSrc;
  }

  const form = document.getElementById('formProfile');

	form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

		if (form.checkValidity()) {
      const profile = {
        firstName: document.getElementById('firstName').value,
        secondName: document.getElementById('secondName').value,
        lastName: document.getElementById('lastName').value,
        secondLastName: document.getElementById('secondLastName').value,
        contactPhone: document.getElementById('contactPhone').value,
      }

      localStorage.setItem('profile', JSON.stringify(profile));
    }

		form.classList.add('was-validated');
	});

  const profileImg = document.getElementById('profileImg');
  profileImg.addEventListener('change', () => {
    const profileImage = profileImg.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      localStorage.setItem('profileImg', reader.result);
      document.getElementById('profileImage').src = reader.result;
    });

    if (!!profileImage) reader.readAsDataURL(profileImage);
  });
});