async function getPosts() {
    return await fetch('/posts')
        .then((res) => res.json())
        .then((data) => data);
}