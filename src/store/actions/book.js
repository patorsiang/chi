import uuidv1 from 'uuid/v1';
import FBRoot from "../../configs/fbConfig"

function compare(a, b) {
    if (a.data.date > b.data.date)
        return -1;
    if (a.data.date < b.data.date)
        return 1;
    return 0;
}

export function handler(id) {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        const firebase = getFirebase()
        const state = getState()
        const uid = state.firebase.auth.uid
        const notid = uuidv1();

        const PostRef = firestore.collection('diary').doc(id)
        PostRef.get().then(snapshot => {
            if (snapshot.data().book) {
                if (snapshot.data().book.includes(uid)) {
                    PostRef.update({
                        "book": firestore.FieldValue.arrayRemove(uid)
                    }).then(() => {
                        const BookRef = firebase.functions().httpsCallable('getAllBookPost')
                        BookRef().then(book => {
                            const userInfo = firebase.functions().httpsCallable('getUser')
                            if (book.data.length === 0) {
                                return dispatch({ type: 'BOOK_SUCCESS', book: [] })
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
                                    return dispatch({ type: 'BOOK_SUCCESS', book: data.sort(compare) })
                                }).catch(err => {
                                    return dispatch({ type: 'BOOK_SUCCESS', book: [] })
                                })
                            }))
                        })
                    })
                } else {
                    const name = state.firebase.profile.displayName
                    const Photo = state.firebase.profile.Photo
                    const notiRef = firestore.collection('notification').doc(notid);
                    notiRef.set({
                        owner: snapshot.data().writer,
                        type: 'book',
                        content: `saves your diary, ${snapshot.data().title}`,
                        read: false,
                        linked: '/diary',
                        participant: {
                            User_UID: uid,
                            displayName: name,
                            Photo: Photo
                        },
                        date: Date()
                    });
                    PostRef.update({
                        "book": firestore.FieldValue.arrayUnion(uid)
                    }).then(() => {
                        const BookRef = firebase.functions().httpsCallable('getAllBookPost')
                        BookRef().then(book => {
                            const userInfo = firebase.functions().httpsCallable('getUser')
                            if (book.data.length === 0) {
                                return dispatch({ type: 'BOOK_SUCCESS', book: [] })
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
                                    return dispatch({ type: 'BOOK_SUCCESS', book: data.sort(compare) })
                                }).catch(err => {
                                    return dispatch({ type: 'BOOK_SUCCESS', book: [] })
                                })
                            }))
                        })
                    })
                }
            } else {
                PostRef.set({
                    "book": [uid]
                }, { merge: true }).then(() => {
                    const BookRef = firebase.functions().httpsCallable('getAllBookPost')
                    BookRef().then(book => {
                        const userInfo = firebase.functions().httpsCallable('getUser')
                        if (book.data.length === 0) {
                            return dispatch({ type: 'BOOK_SUCCESS', book: [] })
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
                                return dispatch({ type: 'BOOK_SUCCESS', book: data.sort(compare) })
                            }).catch(err => {
                                return dispatch({ type: 'BOOK_SUCCESS', book: [] })
                            })
                        }))
                    })
                })
            }
        })
    }
}