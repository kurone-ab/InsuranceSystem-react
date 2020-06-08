export const asc = (a, b) => {
    return a < b ? -1 : a === b ? 0 : 1
}

export const desc = (a, b) => {
    return a > b ? -1 : a === b ? 0 : 1
}