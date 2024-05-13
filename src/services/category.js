import client from './http';

export function getCategories() {
    return new Promise((resolve, reject) => {
        client.get('/categories')
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

export function createCategory(category) {
    return new Promise((resolve, reject) => {
        client.post('/categories', category)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

export function updateCategoryById(id, category) {
    return new Promise((resolve, reject) => {
        client.patch(`/categories/${id}`, category)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

export function deleteCategoryById(id) {
    return new Promise((resolve, reject) => {
        client.delete(`/categories/${id}`)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}