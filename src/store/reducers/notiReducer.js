const initState = {
    noti: [],
    num: 0
}

const notiReducer = (state, action) => {
    switch (action.type) {
        case 'NOTI_INITIAL':
            // In the following line, you should include the prefixes of implementations you want to test.
            const inDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
            // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)
            var openRequest = inDB.open('chi_db_noti');
            openRequest.onupgradeneeded = function (e) {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('noti')) {
                    const storeOS = db.createObjectStore('noti',
                        { keyPath: 'id' });
                    storeOS.createIndex("data", "data", { unique: false });
                }
            };
            openRequest.onsuccess = function (e) {
                // console.log('running onsuccess');
                const db = e.target.result;
                const transaction = db.transaction(['noti'], 'readwrite');
                const store = transaction.objectStore('noti');
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
                    initState.noti = event.target.result.map(post => {
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
        // state = { ...state, noti: action.result }
            break;
        case 'NOTI_NUM':
            // In the following line, you should include the prefixes of implementations you want to test.
            const inDB2 = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
            // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)
            var openRequest2 = inDB2.open('chi_db_noti');
            if (action.result > 0) {
                initState.num = action.result
            }
            openRequest2.onsuccess = function (e) {
                // console.log('running onsuccess');
                const db = e.target.result;
                const transaction = db.transaction(['noti'], 'readwrite');
                const store = transaction.objectStore('noti');
                const request = store.getAll();
                // request.onerror = function (event) {
                //     console.log("error fetching data");
                // };
                request.onsuccess = function (event) {
                    initState.num = event.target.result.length
                };
            };
            openRequest2.onerror = function (e) {
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
export default notiReducer