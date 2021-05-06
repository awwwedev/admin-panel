import {Component, Mixins} from "vue-property-decorator";


@Component
export default class ConstructorHelpers extends Mixins() {
    entityName = ''
    entityNamePrefixCreate = ''
    entityNamePrefixChange = ''

    get pageName(): string { return this.$route.meta.isCreatePage ? (this.entityNamePrefixCreate ? this.entityNamePrefixCreate : 'Создание новой ') + this.entityName
        : (this.entityNamePrefixChange ? this.entityNamePrefixChange : 'Редактирование ') + this.entityName }
    get isCreatePage(): boolean { return this.$route.meta.isCreatePage }
}
