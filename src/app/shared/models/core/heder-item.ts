import { MatMenu } from "@angular/material/menu";

export interface HeaderItem {
    id:any,
    icon: string,
    name:string,
    actionName:string,
    menu : MatMenu | null
    data:any

    // menu: MenuHeaderItem[] | null
}

// export interface MenuHeaderItem {
//     text: string,
//     icon: string,
//     action:string,
//     data:any
// }