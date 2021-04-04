import {Component, Mixins} from "vue-property-decorator";


@Component
export default class ConstructorHelpers extends Mixins() {
    entityName = ''
    get pageName(): string { return this.$route.meta.isCreatePage ? 'Создание новой ' + this.entityName : 'Редактирование ' + this.entityName }
    get isCreatePage(): boolean { return this.$route.meta.isCreatePage }
}
