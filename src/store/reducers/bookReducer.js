const initState = {
    post: []
}

const bookReducer = (state, action) => {
    switch (action.type) {
        case 'BOOK_POST':
            // In the following line, you should include the prefixes of implementations you want to test.
            const inDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
            // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)
            var openRequest = inDB.open('chi_db', 1);
            openRequest.onupgradeneeded = function (e) {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('book')) {
                    const storeOS = db.createObjectStore('book',
                        { keyPath: 'id' });
                    storeOS.createIndex("data", "data", { unique: false });
                }
            };
            openRequest.onsuccess = function (e) {
                // console.log('running onsuccess');
                const db = e.target.result;
                const transaction = db.transaction(['book'], 'readwrite');
                const store = transaction.objectStore('book');
                if (action.result.length > 0) {
                    store.clear();
                    action.result.forEach(element => {
                        const item = {
                            id: element.id,
                            data: JSON.stringify(element.data)
                        }
                        store.add(item);
                    });
                }
                
                const request = store.getAll();
                // request.onerror = function (event) {
                //     console.log("error fetching data");
                // };
                request.onsuccess = function (event) {
                    initState.post = event.target.result.map(post => {
                        return {
                            id: post.id,
                            data: JSON.parse(post.data)
                        }
                    })
                };
            };
            openRequest.onerror = function (e) {
                console.log('onerror!');
                console.dir(e);
                state = initState
            };
            break;

        default:
            state = initState
            break;
    }
    return state
}

export default bookReducer