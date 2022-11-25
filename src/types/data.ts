/**
 * 植物状态数据
 * @remarks 从后端接收到的数据类型
 */
export interface PlantStatusData {
    /**
     * 日期
     */
    date: string,
    /** 时间
     * 
    */
    time: string,
    /**
     * 光照
     */
    light: number,
    /**
     * 温度
     */
    temperature: number,
    /**
     * 湿度
     */
    humidity: number
}
