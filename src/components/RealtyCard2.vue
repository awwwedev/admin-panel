<template>
  <div class="balloon">
    <img class="balloon__img" :src="imgPath" alt="">
    <h3 class="balloon__name">{{ name }}</h3>
    <span class="balloon__area">Площадь {{ area }} м2</span>
    <p class="balloon__desc">{{ descriptionValue }}</p>
    <div class="balloon__footer">
      <span></span>
      <div class="balloon__price-wrapper">
        <span class="balloon__price"><span class="p">&#8381;</span> {{ price }} <span class="m2">М2</span></span>
      </div>
      <button @click="onClick" type="button" class="btn btn_primary btn_sm balloon__btn">
        Подробнее
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Ref, Vue} from "vue-property-decorator";

@Component({})
export default class RealtyCard2 extends Vue {
  @Ref('balloon')
  refBalloon!: HTMLElement
  @Prop({ required: true })
  imgPath!: string
  @Prop({ required: true })
  name!: string
  @Prop({ required: true })
  area!: number
  @Prop({ required: true })
  description!: string
  @Prop({ required: true })
  price!: number
  @Prop({ required: true })
  id!: number
  @Prop({ required: false, default: false, type: Boolean }) disableLink!: boolean

  get descriptionValue (): string {
    return this.description.slice(0, 165) + '...'
  }

  onClick (): void {
    if (!this.disableLink) {
      this.$router.push({name: 'viewRealty', params: {category: 'category-name', id: this.id + ''}})
    }
  }

}

</script>

<style scoped lang="stylus">
@import "~@/assets/stylus/colors.styl"
@import "~@/assets/stylus/mixins.styl"
@import "~@/assets/stylus/common.styl";
@import "~@/assets/stylus/button.styl";

.balloon
  padding 18px 0 18px 18px
  max-width 275px
  font-size 1rem

  @media (max-width 400px)
    font-size .8rem
    max-width 200px

  &__img
    responsiveImg()
    max-height 175px
    width 100%
    display block
    margin-bottom 10px

  &__name
    color mainColor
    font-size 1em
    font-weight bold
    margin-bottom 5px

  &__area
    color mainColorDark
    font-size 0.7em
    font-weight 600

  &__desc
    font-size 0.7em
    color gray
    margin-bottom 10px

  &__footer
    margin-left -30px
    display flex
    justify-content space-between
    align-items center

  &__btn
    font-size .8em
    padding 5px 10px
    display block
    max-width 150px
    width 106px

    &:focus
      padding 5px 10px

    @media (max-width 400px)
      width 95px
      padding 5px 10px


  &__price
    position: relative;

    & .m2
      right -16px
    & .p
      left -10px

    &-wrapper
      font-size .8em
      font-weight 600
      color white
      background-color mainColorDark
      display inline-flex
      padding 4px 38px
      position absolute

      &:after
        content: '';
        display: block;
        position: absolute;
        right: -15px;
        top: 0;
        transition: border linear 0.47s;
        border-top: 0 solid transparent;
        border-left: 18px solid #071a3c;
        border-bottom: 28px solid white;


      @media (max-width 400px)
        padding: 2px 20px;
        &:after
          border-left: 15px solid #071a3c;
          border-bottom: 24px solid white;

</style>
