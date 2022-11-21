import request from "@/utils/request";



export function getPlantStatus(data = {}) {
    return request({
        method: "post",
        url: 'api/plantcenter/plantstatus',
        data,
    })
}
