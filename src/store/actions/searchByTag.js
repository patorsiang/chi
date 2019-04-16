function compare(a, b) {
    if (a.data.date > b.date)
        return -1;
    if (a.data.date < b.date)
        return 1;
    return 0;
}

export function handler(T) {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        const searchAllPost = firebase.functions().httpsCallable('getAllPost')
        searchAllPost().then(result => {
            if (result.data.length === 0) {
                return dispatch({ type: 'SEARCH_BY_TAG', T, post: [] })
            }
            return result.data.map(data => {
                const metadata = firebase.functions().httpsCallable('getMetadata')
                const safe = []
                const tags = []
                const themes = []

                return data.meta.map(file => metadata({ file }).then(res => {
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
                    return dispatch({ type: 'SEARCH_BY_TAG', T, post: result.data.sort(compare) })
                }))
            })
        }).catch(error => { return dispatch({ type: 'SEARCH_BY_TAG', T, post: [] }) })
        return dispatch({ type: 'SEARCH_BY_TAG', T, post: [] })
    }       
}