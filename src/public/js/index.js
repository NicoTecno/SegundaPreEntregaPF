const linkDesc = document.getElementById('linkDesc');
linkDesc.addEventListener('click', () => {
    let url = new URL(window.location.href);
    url.searchParams.delete('sort');
    url.searchParams.set('sort', 'desc');
    linkDesc.href = url.href;
});
const linkAsc = document.getElementById('linkAsc');
linkAsc.addEventListener('click', () => {
    let url = new URL(window.location.href);
    url.searchParams.delete('sort');
    url.searchParams.set('sort', 'asc');
    linkAsc.href = url.href;
});

const CPU = document.getElementById('CPU');
CPU.addEventListener('click', () => {
    let url = new URL(window.location.href);
    url.searchParams.delete('query');
    url.searchParams.set('query', 'CPU');
    CPU.href = url.href;
});

const GPU = document.getElementById('GPU');
GPU.addEventListener('click', () => {
    let url = new URL(window.location.href);
    url.searchParams.delete('query');
    url.searchParams.set('query', 'GPU');
    GPU.href = url.href;
});

const todo = document.getElementById('todo');
todo.addEventListener('click', () => {
    let url = new URL(window.location.href);
    url.searchParams.delete('query');
    url.searchParams.set('query', '');
    todo.href = url.href;
});

