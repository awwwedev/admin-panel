<template>
  <div class="news" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <a class="news__link" @click="$emit('click')"></a>
    <div class="news__content-wrapper">
      <ibg :src="basePath + imgPath" class="news__img"/>
      <div class="news__name" ref="name">
        <div class="news__name-value" ref="name-value">
          <span>{{ name + (name.length > 65 ? '...' : '') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Inject, Prop, Ref, Vue, Watch} from "vue-property-decorator";
import $ from 'jquery'
import {removeHtmlTags} from "@/common";
import Ibg from "@/components/Ibg.vue";

@Component({
  components: {Ibg},
})
export default class NewsCard extends Vue {
  @Prop({ required: true }) name!: string
  @Prop({ required: true }) imgPath!: string
  @Prop({ required: true }) content!: string
  @Ref('name') refName!: HTMLElement
  @Ref('name-value') refNameValue!: HTMLElement
  @Inject('basePath') basePath!: string
  isHovered = false
  oldHeight = 0

  get descriptionValue (): string {
    return removeHtmlTags(this.content)
  }

  mounted(): void {
    this.oldHeight = $(this.refName).height() as number
  }

  @Watch('isHovered')
  watchIsHovered (val: boolean): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this
    if (val) {
      $(this.refName).stop()
          .animate({
            height: '100%',
          }, {
            start() {
              $(this).css('background-color', 'rgba(50,161,208,0.8)')
                  .find('.news__name-value')
                  .animate({
                    opacity: 0
                  }, {
                    duration: 200,
                  })
            },
            done() {
              $(this)
                  .find('.news__name-value').height('100%')
                  .addClass('news__name-value_big').animate({ opacity: 1 }, 400)
                  .find('span').text(_this.descriptionValue.slice(0, 65) + (_this.descriptionValue.length > 65 ? '...' : ''))
            }
          })
    } else {
      $(this.refName).stop()
          .animate({
            height: this.oldHeight
          }, {
            start() {
              $(this).css('background-color', '#32a1d0')
                  .find('.news__name-value')
                  .animate({
                    opacity: 0
                  }, {
                    duration: 200,
                  })
            },
            done() {
              setTimeout(() => {
                $(this).find('.news__name-value')
                    .removeClass('news__name-value_big').animate({ opacity: 1 }, 200)
                    .find('span').text(_this.name.slice(0, 65) + (_this.name.length > 65 ? '...' : ''))
              }, 200)
            }
          })
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~@/assets/stylus/colors.styl"
@import "~@/assets/stylus/null.styl"

.news
  font-size 18px
  position relative

  &__link
    position absolute
    cursor pointer
    width 100%
    height 100%
    z-index 1

  &__content-wrapper
    position relative
    margin  0 10px

  &__img
    height 300px
    width 100%

  &__name
    display block
    position absolute
    bottom 0
    left 0
    width 100%
    padding 10px 0
    color white
    background-color mainColor
    text-align right
    font-family Inter-Bold
    font-size 1.1em
    transition all linear .2s

    &-value
      transition all linear .1s
      display: flex;
      align-items  center
      justify-content flex-end

      & span
        margin-right 15px

      &_big
        display block
        text-align center
        font-size 40px

        & span
          margin-right 0

    @media (max-width 1200px)
      width 94%

    @media (max-width 800px)
      width 91%

    @media (max-width 700px)
      width 95.5%

    @media (max-width 600px)
      width 92%
</style>
