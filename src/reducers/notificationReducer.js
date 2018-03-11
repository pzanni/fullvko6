const notificationAtStart = ''

const asObject = (notification) => {
    return {
        content: notification
    }
}

const initialState = notificationAtStart

const notificationReducer = (store = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.content
        default:
            return store
    }
}

export const setNotification = (content) => {
    return {
        type: 'SET_NOTIFICATION',
        content
    }
}

export default notificationReducer