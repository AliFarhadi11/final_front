import english from "./English";
import persian from "./Persian";

const createmessages = (nestedMessages, prefix = '') => {
    if (nestedMessages === null) {
        return {}
    }
    return Object.keys(nestedMessages).reduce((messages, key) => {
        const value = nestedMessages[key]
        const prefixedkey = prefix ? `${prefix}.${key}` : key
        if (typeof value === 'string') {
            Object.assign(messages, { [prefixedkey]: value })
        } else {
            Object.assign(messages, createmessages(value, prefixedkey))
        }
        return messages
    }, {})
}

const translate = {
    en: createmessages(english),
    fa: createmessages(persian)
}

export default translate





