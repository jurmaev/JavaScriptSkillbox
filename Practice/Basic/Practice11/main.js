(async () => {

    async function getLastPageNumber() {
        const response = await fetch('https://gorest.co.in/public-api/posts');
        const data = await response.json();
        return data.meta.pagination.pages;
    }

    async function getPage(page = 1) {
        const response = await fetch(`https://gorest.co.in/public-api/posts?page=${page}`);
        const data = await response.json();
        return data.data;
    }

    async function getPost(id) {
        const response = await fetch(`https://gorest.co.in/public-api/posts/${id}`);
        const data = await response.json();
        return data.data;
    }

    async function getComments(id) {
        const response = await fetch(`https://gorest.co.in/public-api/comments?post_id=${id}`);
        const data = await response.json();
        return data.data;
    }

    function createPosts(posts) {
        const postContainer = document.createElement('div');
        posts.forEach(post => {
            const postTitle = document.createElement('a');
            postTitle.textContent = post.title;
            postTitle.href = `post.html?id=${post.id}`;
            postTitle.target = '_blank';
            postTitle.classList.add('list-group-item', 'list-group-item-action', 'mb-2', 'shadow-sm', 'rounded-1');
            postContainer.append(postTitle);
        });

        postContainer.classList.add('container', 'list-group');
        return postContainer;
    }

    function createPaginationBtn(text, page) {
        const span = document.createElement('span');
        const item = document.createElement('li');
        const link = document.createElement('a');

        span.textContent = text;
        link.href = page !== 1 ? `index.html?page=${page}` : 'index.html';

        link.classList.add('page-link');
        item.classList.add('page-item')

        link.append(span);
        item.append(link);
        return item
    }

    function getPageNumbers(number, lastPage) {
        if (number === 1)
            number++;
        else if (number === lastPage)
            number--;
        return [number - 1, number, number + 1];
    }

    function createPagination(currentPage, lastPage) {
        const container = document.createElement('div');
        const nav = document.createElement('nav');
        const list = document.createElement('ul');

        const firtPageBtn = createPaginationBtn('Первая', 1);
        list.append(firtPageBtn);

        const displayNumbers = getPageNumbers(currentPage, lastPage);

        displayNumbers.forEach(number => {
            const item = document.createElement('li');
            const link = document.createElement('a');
            link.textContent = number;
            link.href = number !== 1 ? `index.html?page=${number}` : 'index.html';

            item.classList.add('page-item');
            link.classList.add('page-link');
            item.classList.toggle('active', number === currentPage);

            item.append(link);
            list.append(item);
        });

        container.classList.add('container', 'd-flex', 'justify-content-center');
        list.classList.add('pagination', 'shadow');

        const lastPageBtn = createPaginationBtn('Последняя', lastPage);

        list.append(lastPageBtn);

        nav.append(list);
        container.append(nav);
        return container;
    }

    function createPostPage(post, comments) {
        const postContainer = document.getElementById('post');
        const commentsContainer = document.getElementById('comments');
        const title = document.createElement('h1');
        const paragraph = document.createElement('p');
        title.textContent = post.title;
        paragraph.textContent = post.body;
        if (comments) {
            comments.forEach(comment => {
                const card = document.createElement('div');
                const cardBody = document.createElement('div');
                const title = document.createElement('h5');
                const text = document.createElement('p');

                title.textContent = comment.name;
                text.textContent = comment.body;

                card.classList.add('card', 'mb-3', 'shadow-sm');
                cardBody.classList.add('card-body');
                title.classList.add('card-header');
                text.classList.add('card-text');

                card.append(title);
                cardBody.append(text);
                card.append(cardBody);
                commentsContainer.append(card);
            })
        };

        postContainer.classList.add('mb-5', 'shadow', 'border', 'rounded-3', 'mt-4', 'p-4');
        commentsContainer.classList.add('border', 'pt-3', 'rounded-3', 'shadow')

        postContainer.append(title);
        postContainer.append(paragraph);

        return { postContainer, commentsContainer };
    }

    async function initPostPage() {
        const searchParams = new URLSearchParams(document.location.search);
        const postId = searchParams.get('id');
        const post = await getPost(postId);
        const comments = await getComments(postId);
        const postPage = createPostPage(post, comments)
        document.body.append(postPage.postContainer);
        document.body.append(postPage.commentsContainer);
    }

    async function initMainPage() {
        const searchParams = new URLSearchParams(window.location.search);
        let page = Number(searchParams.get('page'));
        if (page === 0) page = 1;
        const posts = await getPage(page);
        const lastPageNumber = await getLastPageNumber();
        const pagination = createPagination(page, lastPageNumber);
        const postsContainer = document.getElementById('posts');
        const paginationContainer = document.getElementById('pagination');
        postsContainer.append(createPosts(posts));
        paginationContainer.append(pagination);

        document.body.append(postsContainer);
        document.body.append(paginationContainer);
    }

    window.initMainPage = initMainPage;
    window.initPostPage = initPostPage;
})();