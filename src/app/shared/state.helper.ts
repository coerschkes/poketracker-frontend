export class StateHelper {
  static revertBool(){
    return (currentValue: boolean) => !currentValue;
  }
}
