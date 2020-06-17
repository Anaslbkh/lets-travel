async function getCallbackRequests() {
    return await fetch('http://localhost:3000/callback-requests')
        .then((res) => res.json())
        .then((data) => data);
}
let requestsBlock = document.querySelector('#v-pills-callback');
requestsBlock.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-removed')) {
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('http://localhost:3000/callback-requests/' + id, {
            method: 'DELETE'
        }).then((res) => res.text())
            .then(() => window.history.go());
    }
})