import type { PlantStatusData } from "@/types/data";


export function RandomData() {
  function GetRand(min: number = 0, max: number = 0) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  let nowTime = new Date();

  var random_data: PlantStatusData = {
    date: `${nowTime.getFullYear()}-${nowTime.getMonth()}-${nowTime.getDate()}`,
    time: `${nowTime.getHours()}:${nowTime.getMinutes()}:${nowTime.getSeconds()}`,
    light: GetRand(0, 99) / 100,
    temperature: GetRand(-40, 45),
    humidity: GetRand(0, 99) / 100,
  };
  return random_data;
}
