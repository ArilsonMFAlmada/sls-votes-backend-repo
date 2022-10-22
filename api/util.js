const getResponseHeaders = () => {
    return {
        'Access-Control-Allow-Origin': '*'
    }
}

const getUserId = () => {
    return Headers.app_user_id;
}

const getUserName = () => {
    return Headers.app_user_name;
}

module.exports = {
    getResponseHeaders,
    getUserId,
    getUserName
}