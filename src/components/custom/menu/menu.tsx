import { component$ } from "@builder.io/qwik";
import styles from "./menu.module.css"
import { useSignal } from "@builder.io/qwik";

import test from "../../../../pk-menu/config/test.json"
import subtest7FR from "../../../../pk-menu/config/subtest_7_FR.json"
import subtest8FR from "../../../../pk-menu/config/subtest_8_FR.json"
import subtest9FR from "../../../../pk-menu/config/subtest_9_FR.json"

const menu : any = {
    "topMenuFR": test,
    "subMenu7FR": subtest7FR,
    "subMenu8FR": subtest8FR,
    "subMenu9FR": subtest9FR,
}

interface MenuInfo {
    id_pkmenu : string,
    hoveredItemPKMenu : any
}

export const Submenu = component$((props: MenuInfo) => {
    const submenu = menu[`subMenu${props.id_pkmenu}FR`]
    console.log(submenu)
    if (submenu) {
        return <div class={styles["submenu"]} onMouseLeave$={() => props.hoveredItemPKMenu.value = "0"}>
            {submenu.map((menu : any) => (
                menu.list_col.map((col : any) => (
                    col.list_menu_item.length > 0 && col.list_menu_item.map((item : any, index : any) => (
                        <div key={index}>
                            <a href="#">{item.title}</a>
                        </div>
                    ))
                ))
            ))}
        </div>
    } else {
        return null
    }
});


export default component$(() => {
    const hoveredItemPKMenu = useSignal("0")

    const topmenu = menu.topMenuFR

    return <div class={styles["menu"]}>
        <div class={styles["flextamere"]}>
            {topmenu.sort((a : any, b : any) => a.position < b.position ? -1 : 1).map((item : any, index : any) => (
                <div key={index} onMouseEnter$={() => {hoveredItemPKMenu.value = item.id_pkmenu}}>
                    <p dangerouslySetInnerHTML={item.title} ></p>
                </div>
            ))}
        </div>
        <div >
            <Submenu id_pkmenu={hoveredItemPKMenu.value} hoveredItemPKMenu={hoveredItemPKMenu} />
        </div>
    </div>
})