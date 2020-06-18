let articlesBlock = document.querySelector('.articles');
articlesBlock.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-removed')) {
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('/posts/' + id, {
            method: 'DELETE'
        }).then((res) => res.text())
            .then(() => window.history.go());
    }
})