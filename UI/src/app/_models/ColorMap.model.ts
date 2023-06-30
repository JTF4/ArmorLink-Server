export interface ColorMap {
    bucket: string,
    chest: string,
    shoulders: {
      left: string,
      right: string
    },
    forarms: {
      right: string,
      left: string
    },
    thighs: {
      right: string,
      left: string
    },
    shins: {
      right: string,
      left: string
    },
    weapons: Array<weaponArray>
}

interface weaponArray {
    color: string
}