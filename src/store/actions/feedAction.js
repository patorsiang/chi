function compare(a, b) {
    if (a.data.date > b.date)
        return -1;
    if (a.data.date < b.date)
        return 1;
    return 0;
}

export const chooseChoice = (choice) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        if (choice === "ALL") {
            const searchAllPost = firebase.functions().httpsCallable('getAllPost')
            searchAllPost().then(result => {
                const userInfo = firebase.functions().httpsCallable('getUser')
                result.data.map(data => userInfo({ id: data.data.writer }).then(writer => {
                    data.data.idWriter = data.data.writer
                    data.data.writer = writer.data
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
                    }).then(() => dispatch({ type: 'SPECIAL_THEME', choice, result: result.data.sort(compare) })))
                }))
            })
                .catch(error => dispatch({ type: 'SPECIAL_THEME', choice, result: [] }))
            dispatch({ type: 'SPECIAL_THEME', choice, result: [] })
        } else {
            const searchAllPost = firebase.functions().httpsCallable('getAllPost')
            searchAllPost().then(result => {
                const userInfo = firebase.functions().httpsCallable('getUser')
                result.data.map(data => userInfo({ id: data.data.writer }).then(writer => {
                    data.data.idWriter = data.data.writer
                    data.data.writer = writer.data
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
                    }).then(() => dispatch({
                        type: 'SPECIAL_THEME', choice, result: result.data.filter(data => {
                            if (data.data.ProTheme) {
                                if (!data.data.ProTheme.includes(choice)) {
                                    return false
                                }
                                return true
                            } else {
                                if (choice === "OTHER") {
                                    return true
                                }
                                return false
                            }
                        }).sort(compare)
                    })))
                }))
            })
                .catch(error => dispatch({ type: 'SPECIAL_THEME', choice, result: [] }))
                dispatch({ type: 'SPECIAL_THEME', choice, result: [] })
        }
    }
}

export const searchElse = (S) => {
    /*
        1st writer
        2nd tag
        3rd title
        4th note
        5th date
    */
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();

        const writer = firebase.functions().httpsCallable('searchUserByName')
        writer({ keyword: S }).then(writerID => {
            return writerID.data
        }).then(
            result => {
                if (result.length > 0) {
                    const getposts = firebase.functions().httpsCallable('getAllPostByWriter')
                    const post = []
                    var count = 0
                    const posts = result.map(id => {
                        return getposts({ id }).then(result => {
                            return result.data
                        })
                    })

                    posts.map(pro =>
                        pro.then(result => {
                            result.map(resultArr => post.push(resultArr))
                            count++
                            return post
                        }).then(result => {
                            if (count === posts.length) {
                                if (result.length > 0) {
                                    const userInfo = firebase.functions().httpsCallable('getUser')
                                    result.map(data => userInfo({ id: data.data.writer }).then(writer => {
                                        data.data.idWriter = data.data.writer
                                        data.data.writer = writer.data
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
                                        }).then(() => dispatch({ type: 'SPECIAL_THEME', choice: 'ALL', result: result.sort(compare) })))
                                    }).catch(error => dispatch({ type: 'SPECIAL_THEME', choice: 'ALL', result: [] })))
                                } else {
                                    const tag = firebase.functions().httpsCallable('searchPostByTag')
                                    tag({ keyword: S }).then(posts => {
                                        return posts.data
                                    }).then(result => {
                                        if (result.length > 0) {
                                            const userInfo = firebase.functions().httpsCallable('getUser')
                                            result.map(data => userInfo({ id: data.data.writer }).then(writer => {
                                                data.data.idWriter = data.data.writer
                                                data.data.writer = writer.data
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
                                                }).then(() => dispatch({ type: 'SPECIAL_THEME', choice: 'ALL', result: result.sort(compare) })))
                                            }).catch(error => dispatch({ type: 'SPECIAL_THEME', choice: 'ALL', result: [] })))
                                        } else {
                                            const note = firebase.functions().httpsCallable('searchPostByNote')
                                            note({ keyword: S }).then(posts => {
                                                return posts.data
                                            }).then(result => {
                                                if (result.length > 0) {
                                                    const userInfo = firebase.functions().httpsCallable('getUser')
                                                    result.map(data => userInfo({ id: data.data.writer }).then(writer => {
                                                        data.data.idWriter = data.data.writer
                                                        data.data.writer = writer.data
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
                                                        }).then(() => dispatch({ type: 'SPECIAL_THEME', choice: 'ALL', result: result.sort(compare) })))
                                                    }).catch(error => dispatch({ type: 'SPECIAL_THEME', choice: 'ALL', result: [] })))
                                                } else {
                                                    const note = firebase.functions().httpsCallable('searchPostByNote')
                                                    note({ keyword: S }).then(posts => {
                                                        return posts.data
                                                    }).then(result => {
                                                        if (result.length > 0) {
                                                            const userInfo = firebase.functions().httpsCallable('getUser')
                                                            result.map(data => userInfo({ id: data.data.writer }).then(writer => {
                                                                data.data.idWriter = data.data.writer
                                                                data.data.writer = writer.data
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
                                                                }).then(() => dispatch({ type: 'SPECIAL_THEME', choice: 'ALL', result: result.sort(compare) })))
                                                            }).catch(error => dispatch({ type: 'SPECIAL_THEME', choice: 'ALL', result: [] })))
                                                        } else {
                                                            const date = firebase.functions().httpsCallable('searchPostByDate')
                                                            date({ keyword: S }).then(posts => {
                                                                return posts.data
                                                            }).then(result => {
                                                                if (result.length > 0) {
                                                                    const userInfo = firebase.functions().httpsCallable('getUser')
                                                                    result.map(data => userInfo({ id: data.data.writer }).then(writer => {
                                                                        data.data.idWriter = data.data.writer
                                                                        data.data.writer = writer.data
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
                                                                        }).then(() => dispatch({ type: 'SPECIAL_THEME', choice: 'ALL', result: result.sort(compare) })))
                                                                    }).catch(error => dispatch({ type: 'SPECIAL_THEME', choice: 'ALL', result: [] })))
                                                                } else {
                                                                    dispatch({ type: 'SPECIAL_THEME', choice: 'ALL', result: [] })
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            }
                        })
                    )
                } else {
                    const tag = firebase.functions().httpsCallable('searchPostByTag')
                    tag({ keyword: S }).then(posts => {
                        return posts.data
                    }).then(result => {
                        if (result.length > 0) {
                            const userInfo = firebase.functions().httpsCallable('getUser')
                            result.map(data => userInfo({ id: data.data.writer }).then(writer => {
                                data.data.idWriter = data.data.writer
                                data.data.writer = writer.data
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
                                }).then(() => dispatch({ type: 'SPECIAL_THEME', choice: 'ALL', result: result.sort(compare) })))
                            }).catch(error => dispatch({ type: 'SPECIAL_THEME', choice: 'ALL', result: [] })))
                        } else {
                            const note = firebase.functions().httpsCallable('searchPostByNote')
                            note({ keyword: S }).then(posts => {
                                return posts.data
                            }).then(result => {
                                if (result.length > 0) {
                                    const userInfo = firebase.functions().httpsCallable('getUser')
                                    result.map(data => userInfo({ id: data.data.writer }).then(writer => {
                                        data.data.idWriter = data.data.writer
                                        data.data.writer = writer.data
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
                                        }).then(() => dispatch({ type: 'SPECIAL_THEME', choice: 'ALL', result: result.sort(compare) })))
                                    }).catch(error => dispatch({ type: 'SPECIAL_THEME', choice: 'ALL', result: [] })))
                                } else {
                                    const note = firebase.functions().httpsCallable('searchPostByNote')
                                    note({ keyword: S }).then(posts => {
                                        return posts.data
                                    }).then(result => {
                                        if (result.length > 0) {
                                            const userInfo = firebase.functions().httpsCallable('getUser')
                                            result.map(data => userInfo({ id: data.data.writer }).then(writer => {
                                                data.data.idWriter = data.data.writer
                                                data.data.writer = writer.data
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
                                                }).then(() => dispatch({ type: 'SPECIAL_THEME', choice: 'ALL', result: result.sort(compare) })))
                                            }).catch(error => dispatch({ type: 'SPECIAL_THEME', choice: 'ALL', result: [] })))
                                        } else {
                                            const date = firebase.functions().httpsCallable('searchPostByDate')
                                            date({ keyword: S }).then(posts => {
                                                return posts.data
                                            }).then(result => {
                                                if (result.length > 0) {
                                                    const userInfo = firebase.functions().httpsCallable('getUser')
                                                    result.map(data => userInfo({ id: data.data.writer }).then(writer => {
                                                        data.data.idWriter = data.data.writer
                                                        data.data.writer = writer.data
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
                                                        }).then(() => dispatch({ type: 'SPECIAL_THEME', choice: 'ALL', result: result.sort(compare) })))
                                                    }).catch(error => dispatch({ type: 'SPECIAL_THEME', choice: 'ALL', result: [] })))
                                                } else {
                                                    dispatch({ type: 'SPECIAL_THEME', choice: 'ALL', result: [] })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            }
        )
    }
}