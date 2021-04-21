<template>
    <div class="view-object">
        <div class="container">
            <nav class="view-object__nav nav">
                <ul class="nav__list">
                    <li class="nav_item"><span :to="{name: 'home'}" class="nav__link link">Главная</span></li>
                    <li class="nav_item"><span class="nav__divider">-</span></li>
                    <li class="nav_item"><span class="nav__link link">Каталог</span></li>
                    <li class="nav_item"><span class="nav__divider">-</span></li>
                    <li class="nav_item"><a class="nav__link link link_disabled">{{ viewRealty.name }}</a></li>
                </ul>
            </nav>
            <div v-if="viewRealty" class="view-object__content">
                <div class="view-object__col">
                    <Slider
                        v-if="viewRealty.photo.length"
                        :images="viewRealty.photo"
                    />
                </div>
                <div class="view-object__col view-object__object-info object-info">
                    <h1 class="object-info__name">{{ viewRealty.name }}</h1>
                    <ul class="object-info__parameters parameters fw-600">
                        <li class="parameters__item">
                            <span class="parameters__name">Хозяйственное назначение</span>:<span class="parameters__value">{{ viewRealty.realtyTypeName }}</span>
                        </li>
                        <li class="parameters__item">
                          <span class="parameters__name">Площадь</span>:
                          <span class="parameters__value">{{ viewRealty.area }} кв. м.</span>
                        </li>
                        <li class="parameters__item">
                          <span class="parameters__name">Цена за м. кв.</span>:
                          <span class="parameters__value">{{ viewRealty.price_per_metr }} руб.</span>
                        </li>
                        <li class="parameters__item">
                            <span class="parameters__name">Цена: </span><span class="parameters__value">{{
                                viewRealty.price
                            }} руб.</span>
                        </li>
                    </ul>
                  <h2 class="title">Оснащение</h2>
                  <ul v-if="viewRealty.equipments" class="object-info__parameters parameters fw-600">
                    <li class="parameters__item parameters__item_doted" v-for="(equipment, idx) in viewRealty.equipments"
                        :key="idx"
                    >
                      {{ equipment.name }}
                    </li>
                  </ul>
                  <p class="object-info__description fw-600" v-html="viewRealty.description"/>
                </div>
            </div>
          <div class="view-object__btn-wrapper">
            <button class="btn btn_primary btn_sm">Арендовать</button>
          </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Mixins, Prop} from "vue-property-decorator";
import Slider from "./Slider.vue";
import { validationMixin, Validation } from "vuelidate";


@Component({
  data: () => ({
    metaDesc: '',
    metaRealtyTypeName: '',
    metaKeyWords: ''
  }),
  components: {Object, Slider},

})
export default class ViewObject extends Mixins<Validation>(validationMixin) {
  @Prop({ required: true })
  viewRealty!: { [key: string]: number | string | Array<File> | null | Array <string> }
}
</script>

<style scoped lang="stylus">
@import "~@/assets/stylus/fonts.styl"
@import "~@/assets/stylus/null.styl"
@import "~@/assets/stylus/colors.styl"
@import "~@/assets/stylus/button.styl"

h1
  font-family Inter-Bold !important

.fw-600
  font-weight: 600;

.view-object
    font-family Inter-Regular !important
    font-size 20px

    &__nav
        margin-bottom 40px

    &__content
        display flex
        margin-bottom 40px
        @media (max-width 1000px)
            margin-bottom 0
            flex-direction column

    &__col
        flex 1 1 50%
        @media (max-width 1000px)
            flex 1 1 100%

    &__btn-wrapper
        display flex
        justify-content center
        margin-bottom 100px

.nav
    color mainColor

    &__list
        display flex

    &__divider
        margin 0 5px

.object-info
    padding-top 55px

    &__name
        margin-bottom 30px
        font-size 30px

    &__description
        font-size 18px
        margin-bottom 60px

    &__parameters
        margin-bottom 25px

.parameters
  &__item
    margin-bottom 20px

    &_doted
      padding-left 15px
      display flex
      align-items center
      position relative

      &:before
        position absolute
        content ''
        display block
        background-color mainColor
        width 8px
        height 8px
        border-radius 60%
        left 0

    &:last-child
      margin-bottom 0

  &__value
    margin-left 10px

.offers
    &__title
        font-size 30px
        margin-bottom 31px

    &__body
        margin-bottom 90px
        display grid
        grid-template-columns 1fr 1fr 1fr
        grid-gap 30px
        @media (max-width 1000px)
            grid-template-columns 1fr 1fr
        @media (max-width 650px)
            grid-template-columns 1fr

    &__object
        width 100%
</style>
