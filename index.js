document.querySelectorAll('.subject-btn').forEach(button => {
  button.addEventListener('click', ()=> {

    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.remove('hidden');


    const subject = button.getAttribute('data-subject');

    setTimeout(()=> {
      window.location.href = `./htmlSubjects/${subject}.html`;
    }, 1000)
  });
});

window.addEventListener('load', () => {
    document.getElementById('loading-screen').classList.add('hidden');
});