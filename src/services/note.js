import client from './http';

export function getNotes(notesType, selectedCategories) {
    let type;
    switch (notesType) {
        case "Archived":
            type = "archived";
            break;
        case "Unarchived":
            type = "unarchived";
            break;
        default:
            type = ""
    }

    return new Promise((resolve, reject) => {
        client.post(`/notes?${type}`, {
            categories: selectedCategories
        })
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

export function getNoteById(id) {
    return new Promise((resolve, reject) => {
        client.get(`/notes/${id}`)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

export function createNote(note) {
    return new Promise((resolve, reject) => {
        client.post('/notes/create', note)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

export function updateNoteById(id, note) {
    return new Promise((resolve, reject) => {
        client.patch(`/notes/${id}`, note)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

export function deleteNoteById(id) {
    return new Promise((resolve, reject) => {
        client.delete(`/notes/${id}`)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

export function addCategoryToNote(noteId, categoryId) {
    return new Promise((resolve, reject) => {
        client.patch(`/notes/${noteId}/category/${categoryId}`)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

export function removeCategoryFromNote(noteId, categoryId) {
    return new Promise((resolve, reject) => {
        client.delete(`/notes/${noteId}/category/${categoryId}`)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}