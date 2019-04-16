import FBRoot from "../../configs/fbConfig"

function compare(a, b) {
    if (a.data.date > b.data.date)
        return -1;
    if (a.data.date < b.data.date)
        return 1;
    return 0;
}

export function handler() {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        const BookRef = firebase.functions().httpsCallable('getAllBookPost')

        BookRef().then(book => {
            if (book.data.length === 0) {
                return dispatch({ type: 'GET_BOOK_SUCCESS', book: [] })
            }

            book.data.map(posts => {
                const safe = []
                const tags = []
                const themes = []
                return posts.data.photo.map(file => FBRoot.storage().refFromURL(file).getMetadata().then(
                    meta => {
                        if (meta.customMetadata.safeAdult) {
                            safe.push(meta.customMetadata.safeAdult.includes('UNLIKELY') ? 'safe' : meta.customMetadata.safeAdult.includes('LIKELY') ? 'bad' : 'maybe')
                        }

                        if (meta.customMetadata.tags) {
                            meta.customMetadata.tags.split(',').map(tag => tag.replace(" ", "_")).map(tag => tags.push(tag))
                        }

                        if (meta.customMetadata.themes) {
                            meta.customMetadata.themes.split(',').map(theme => themes.push(theme))
                        }
                        return { safe, tags, themes }
                    }).then(data => {
                        if (data.safe) {
                            if (data.safe.includes("bad")) {
                                posts.data.safe = "bad"
                            } else if (data.safe.includes("safe")) {
                                posts.data.safe = "safe"
                            } else {
                                posts.data.safe = "maybe"
                            }
                        } else {
                            posts.data.safe = "maybe"
                        }

                        data.tags.map(
                            tag => posts.data.tag.push(tag)
                        )

                        data.themes.map(
                            theme => posts.data.theme ? posts.data.theme.includes(',') ? posts.data.theme.split(',').push(theme) : [posts.data.theme].push(theme) : posts.data.theme = [theme]
                        )
                        return posts.data
                    })
                )
            })
            return book.data
        }).then(data => {
            return dispatch({ type: 'GET_BOOK_SUCCESS', book: data.sort(compare) })
        }).catch(err => {
            return dispatch({ type: 'GET_BOOK_SUCCESS', book: [] })
        })
    }
}