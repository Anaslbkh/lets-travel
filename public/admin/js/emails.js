async function getEmails() {
    return await fetch('/emails')
        .then((res) => res.json())
        .then((data) => data);
}
let emailsBlock = document.querySelector('#v-pills-mails');
emailsBlock.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-removed')) {
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('/emails/' + id, {
            method: 'DELETE'
        }).then((res) => res.text())
            .then(() => window.history.go());
    }
}) 