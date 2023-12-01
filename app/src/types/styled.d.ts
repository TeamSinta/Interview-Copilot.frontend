import "styled-components";
import { DeviceTypes, type ColorTypes } from "@/styles/StyleType";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ColorTypes;
    devices: DeviceTypes;
  }
}
