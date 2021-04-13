export default class BaseModel {
    // eslint-disable-next-line
    static prepareFormData (data: any): FormData {
        const formData = new FormData;

        Object.keys(data).forEach(key => {
            const currentDataItem = data[key]

            if (Array.isArray(currentDataItem)) {
                currentDataItem.forEach(value1 => {
                    formData.append(`${key}[]`, value1)
                })
            } else {
                formData.set(key, currentDataItem)
            }
        })

        return formData
    }
}
