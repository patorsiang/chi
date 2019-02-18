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
                action.result.forEach(element => {
                    const item = {
                        id: element.id,
                        data: JSON.stringify(element.data)
                    }
                    const req = store.add(item);
                    // req.onerror = function (e) {
                    //     console.log('Error', e.target.error.name);
                    // };
                    req.onsuccess = function (e) {
                        console.log('Woot! Did it');
                    };
                });
                const object_store = transaction.objectStore("book");
                const request = object_store.openCursor();
                // request.onerror = function (event) {
                //     console.log("error fetching data");
                // };
                request.onsuccess = (event) => {
                    const cursor = event.target.result;
                    if (cursor) {
                        const id = cursor.value.id;
                        const data = JSON.parse(cursor.value.data);
                        const idlist = initState.post.map(p => { return p.id })
                        if (!idlist.includes(id)) {
                            initState.post.push({
                                id,
                                data
                            })
                        }
                        cursor.continue();
                    }
                    else {
                        // no more results
                        state = initState
                    }
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