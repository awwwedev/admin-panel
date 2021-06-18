import {Component, Mixins} from "vue-property-decorator";


@Component
export default class ConstructorHelpers extends Mixins() {
    entityNameCreate = ''
    entityNameChange = ''

    get pageName(): string { return this.isCreatePage ? this.entityNameCreate : this.entityNameChange }
    get isCreatePage(): boolean { return this.$route.meta.isCreatePage }
}
