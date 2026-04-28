
export enum NmuActionTypes {
  REFRESH_LIST = 'NMU_REFRESH_LIST',
  CHANGE_LANG = 'NMU_CHANGE_LANG',
  UPDATE_STATUS = 'NMU_UPDATE_STATUS'
}

export interface NmuMessage {
  type: NmuActionTypes;
  payload?: any; 
}