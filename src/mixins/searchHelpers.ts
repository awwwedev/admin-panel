import {Component, Mixins} from "vue-property-decorator";


@Component
export default class SearchHelpers extends Mixins() {
    getValueWithSearchPart (someString: string, searchString: string): string {
        const someStringLC = someString.toLowerCase()
        const searchStringLC = someString.toLowerCase()
        const left = someStringLC.indexOf(searchStringLC)
        const right = left + searchString.length

        return `${someString.slice(0, left)}<b>${searchString}</b>${someString.slice(right, someString.length)}`
    }
}
