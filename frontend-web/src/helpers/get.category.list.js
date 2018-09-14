let _list = undefined;

export function getCategoryList(callback) {

    if (_list !== undefined) {
        callback(_list);
        return true;
    } 

    fetch("http://localhost:54163/api/Categories", {
        method: 'GET',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then(res => {
            return res.json();
        })
        .then(
        (result) => {
            _list = result;
            callback(result);
        },
        (error) => {
            console.log('Error on get category list: ' + error.message);
        });

    return undefined;
}