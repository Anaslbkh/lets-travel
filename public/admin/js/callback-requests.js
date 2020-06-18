async function getCallbackRequests() {
    return await fetch('/callback-requests')
        .then((res) => res.json())
        .then((data) => data);
}
let requestsBlock = document.querySelector('#v-pills-callback');
requestsBlock.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-removed')) {
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('/callback-requests/' + id, {
            method: 'DELETE'
        }).then((res) => res.text())
            .then(() => window.history.go());
    }
})