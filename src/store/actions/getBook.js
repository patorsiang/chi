function compare(a, b) {
    if (a.data.date > b.date)
        return -1;
    if (a.data.date < b.date)
        return 1;
    return 0;
}

export function handler() {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        const BookRef = firebase.functions().httpsCallable('getAllBookPost')
        BookRef().then(book => {
            const userInfo = firebase.functions().httpsCallable('getUser')
            if (book.data.length === 0) {
                return dispatch({ type: 'GET_BOOK_SUCCESS', book: [] })
            }
            book.data.map(data => userInfo({ id: data.data.writer }).then(writer => {
                data.data.idWriter = data.data.writer
                data.data.writer = writer.data
                data.data.photo.forEach(photo => {
                    const httpsReference = firebase.storage().refFromURL(photo)
                    // Create file metadata to update
                    var newMetadata = {
                        cacheControl: 'public,max-age=10000000000',
                    }

                    // Update metadata properties
                    httpsReference.updateMetadata(newMetadata).then(function (metadata) {
                        // Updated metadata for 'images/forest.jpg' is returned in the Promise
                        // console.log(metadata);
                    }).catch(function (error) {
                        // Uh-oh, an error occurred!
                    });
                })
                return data.data
            }).then(data => {
                const metadata = firebase.functions().httpsCallable('getMetadata')
                const safe = []
                const tags = []
                const themes = []

                data.meta.map(file => metadata({ id: data.idWriter, file }).then(res => {
                    if (res.data.safe) {
                        safe.push(res.data.safe)
                        if (safe.includes("bad")) {
                            data.safe = "bad"
                        } else if (safe.includes("safe")) {
                            data.safe = "safe"
                        } else {
                            data.safe = "maybe"
                        }
                    } else {
                        data.safe = "maybe"
                    }

                    if (res.data.tags) {
                        res.data.tags.map(tag => tags.push(tag))
                    }

                    if (res.data.themes) {
                        res.data.themes.map(theme => themes.push(theme))
                    }
                    return { safe, tags, themes }
                }).then(obj => {
                    data.ProTag = [...new Set(obj.tags)]
                    data.ProTheme = [...new Set(obj.themes, data.theme)]
                    return data
                }).then(() => {
                    return dispatch({ type: 'GET_BOOK_SUCCESS', book: book.data.sort(compare) })
                }))
            }))
        })
        return dispatch({ type: 'GET_BOOK_SUCCESS', book: [] })
    }
}