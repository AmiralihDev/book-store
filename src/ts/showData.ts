import domGenerator from "dom-generator"

function showNewBook(id: number, name: string, zhanr: string, author: string, makeYear: number, imgSrc: string, price: number): HTMLElement {
    let template = domGenerator({
        tag: "div",
        attributes: {
            class: "books"
        },
        children: [
            {
                tag: "img",
                attributes: {
                    src: imgSrc,
                    class: "imgBook"
                }

            },
            {
                tag: "div",
                children: [
                    {
                        tag: "h1",
                        attributes: {

                            class: "bookName"
                        },
                        properties: {
                            innerText: name
                        }
                    },
                    {
                        tag: "p",
                        attributes: {
                            class: "bookId",

                        },
                        properties: {
                            innerText: `شماره کتاب : ${id}`
                        }
                    },
                ]
            },

            {
                tag: "div",
                children: [
                    {
                        tag: "p",
                        attributes: {
                            class: "bookZhanr",

                        },
                        properties: {
                            innerText: `ژانر : ${zhanr}`
                        }
                    },
                    {
                        tag: "p",
                        attributes: {
                            class: "bookAuthor",

                        },
                        properties: {
                            innerText: `نویسنده : ${author}`
                        }
                    },
                    {
                        tag: "p",
                        attributes: {
                            class: "bookYear",

                        },
                        properties: {
                            innerText: `سال انتشار : ${makeYear}`
                        }
                    },
                    {
                        tag: "p",
                        attributes: {
                            class: "bookPrice",

                        },
                        properties: {
                            innerText: `قیمت کتاب : ${price.toLocaleString()}`
                        }
                    },
                ]
            },
            {
                tag: "div",
                attributes: {
                    class: "amaliatBtn"
                },
                children: [
                    {
                        tag: "button",
                        properties: {
                            innerText: "ویرایش کتاب"
                        },
                        attributes: {
                            type: "button",
                            class: "edit"
                        }
                    },
                    {
                        tag: "button",
                        properties: {
                            innerText: "حذف کتاب"
                        },
                        attributes: {
                            type: "button",
                            class: "trash"
                        }
                    }
                ]
            },
            {
                tag: "div",
                attributes: {
                    class: "bookBtn"
                },
                children: [
                    {
                        tag: "button",
                        properties: {
                            innerText: "افزودن به سبد خرید"
                        },
                        attributes: {
                            type: "button",
                            class: "addToCart"
                        }
                    },
                    {
                        tag: "button",
                        properties: {
                            innerText: "علاقه مندی ها"
                        },
                        attributes: {
                            type: "button",
                            class: "addToFav"
                        }
                    }
                ]
            },
            
        ]
    })

    return template
}
function showFavBook(id: number, name: string, zhanr: string, author: string, makeYear: number, imgSrc: string, price: number): HTMLElement {
    let template = domGenerator({
        tag: "div",
        attributes: {
            class: "books"
        },
        children: [
            {
                tag: "img",
                attributes: {
                    src: imgSrc,
                    class: "imgBook"
                }

            },
            {
                tag: "div",
                children: [
                    {
                        tag: "h1",
                        attributes: {

                            class: "bookName"
                        },
                        properties: {
                            innerText: name
                        }
                    },
                    {
                        tag: "p",
                        attributes: {
                            class: "bookId",

                        },
                        properties: {
                            innerText: `شماره کتاب : ${id}`
                        }
                    },
                ]
            },

            {
                tag: "div",
                children: [
                    {
                        tag: "p",
                        attributes: {
                            class: "bookZhanr",

                        },
                        properties: {
                            innerText: `ژانر : ${zhanr}`
                        }
                    },
                    {
                        tag: "p",
                        attributes: {
                            class: "bookAuthor",

                        },
                        properties: {
                            innerText: `نویسنده : ${author}`
                        }
                    },
                    {
                        tag: "p",
                        attributes: {
                            class: "bookYear",

                        },
                        properties: {
                            innerText: `سال انتشار : ${makeYear}`
                        }
                    },
                    {
                        tag: "p",
                        attributes: {
                            class: "bookPrice",

                        },
                        properties: {
                            innerText: `قیمت کتاب : ${price.toLocaleString()}`
                        }
                    },
                ]
            },
            {
                tag: "div",
                attributes: {
                    class: "bookBtn"
                },
                children: [
                    {
                        tag: "button",
                        properties: {
                            innerText: "افزودن به سبد خرید"
                        },
                        attributes: {
                            type: "button",
                            class: "addToCart"
                        }
                    },
                    {
                        tag: "button",
                        properties: {
                            innerText: "حذف علاقه مندی"
                        },
                        attributes: {
                            type: "button",
                            class: "removeToFav"
                        }
                    }
                ]
            }
        ]
    })

    return template
}
function showCartBook(id: number, name: string, zhanr: string, author: string, makeYear: number, imgSrc: string, price: number): HTMLElement {
    let template = domGenerator({
        tag: "div",
        attributes: {
            class: "books"
        },
        children: [
            {
                tag: "img",
                attributes: {
                    src: imgSrc,
                    class: "imgBook"
                }

            },
            {
                tag: "div",
                children: [
                    {
                        tag: "h1",
                        attributes: {

                            class: "bookName"
                        },
                        properties: {
                            innerText: name
                        }
                    },
                    {
                        tag: "p",
                        attributes: {
                            class: "bookId",

                        },
                        properties: {
                            innerText: `شماره کتاب : ${id}`
                        }
                    },
                ]
            },

            {
                tag: "div",
                children: [
                    {
                        tag: "p",
                        attributes: {
                            class: "bookZhanr",

                        },
                        properties: {
                            innerText: `ژانر : ${zhanr}`
                        }
                    },
                    {
                        tag: "p",
                        attributes: {
                            class: "bookAuthor",

                        },
                        properties: {
                            innerText: `نویسنده : ${author}`
                        }
                    },
                    {
                        tag: "p",
                        attributes: {
                            class: "bookYear",

                        },
                        properties: {
                            innerText: `سال انتشار : ${makeYear}`
                        }
                    },
                    {
                        tag: "p",
                        attributes: {
                            class: "bookPrice",

                        },
                        properties: {
                            innerText: `قیمت کتاب : ${price.toLocaleString()}`
                        }
                    },
                ]
            },
            {
                tag: "div",
                attributes: {
                    class: "bookBtn"
                },
                children: [
                    {
                        tag: "button",
                        properties: {
                            innerText: "حذف از سبد خرید"
                        },
                        attributes: {
                            type: "button",
                            class: "removeToCart"
                        }
                    },
                    {
                        tag: "button",
                        properties: {
                            innerText: "علاقه مندی ها"
                        },
                        attributes: {
                            type: "button",
                            class: "addToFav"
                        }
                    }
                ]
            }
        ]
    })

    return template
}

function showFavAndCartBook(id: number, name: string, zhanr: string, author: string, makeYear: number, imgSrc: string, price: number){
    let template = domGenerator({
        tag: "div",
        attributes: {
            class: "books"
        },
        children: [
            {
                tag: "img",
                attributes: {
                    src: imgSrc,
                    class: "imgBook"
                }

            },
            {
                tag: "div",
                children: [
                    {
                        tag: "h1",
                        attributes: {

                            class: "bookName"
                        },
                        properties: {
                            innerText: name
                        }
                    },
                    {
                        tag: "p",
                        attributes: {
                            class: "bookId",

                        },
                        properties: {
                            innerText: `شماره کتاب : ${id}`
                        }
                    },
                ]
            },

            {
                tag: "div",
                children: [
                    {
                        tag: "p",
                        attributes: {
                            class: "bookZhanr",

                        },
                        properties: {
                            innerText: `ژانر : ${zhanr}`
                        }
                    },
                    {
                        tag: "p",
                        attributes: {
                            class: "bookAuthor",

                        },
                        properties: {
                            innerText: `نویسنده : ${author}`
                        }
                    },
                    {
                        tag: "p",
                        attributes: {
                            class: "bookYear",

                        },
                        properties: {
                            innerText: `سال انتشار : ${makeYear}`
                        }
                    },
                    {
                        tag: "p",
                        attributes: {
                            class: "bookPrice",

                        },
                        properties: {
                            innerText: `قیمت کتاب : ${price.toLocaleString()}`
                        }
                    },
                ]
            },
            {
                tag: "div",
                attributes: {
                    class: "bookBtn"
                },
                children: [
                    {
                        tag: "button",
                        properties: {
                            innerText: "حذف از سبد خرید"
                        },
                        attributes: {
                            type: "button",
                            class: "removeToCart"
                        }
                    },
                    {
                        tag: "button",
                        properties: {
                            innerText: "حذف علاقه مندی "
                        },
                        attributes: {
                            type: "button",
                            class: "removeToFav"
                        }
                    }
                ]
            }
        ]
    })

    return template
}
export { showNewBook,showFavBook ,showCartBook,showFavAndCartBook}