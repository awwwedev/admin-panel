<template>
  <b-container>
    <h1 class="mb-5">Недвижимость</h1>
    <b-card class="mb-4 shadow-sm" >
      <div class="d-flex">
          <b-button variant="primary" class="mr-2">
            Создать
          </b-button>
          <b-button variant="danger" class="my-2 my-sm-0" type="submit">Удалить</b-button>
      </div>
    </b-card>
    <b-card class="shadow-sm">
      <b-form inline class="mb-3">
        <b-form-input class="mr-sm-2" placeholder="Поиск"></b-form-input>
        <b-button variant="outline-primary" class="my-2 my-sm-0" type="submit">Найти</b-button>
      </b-form>
      <b-table-lite
          responsive
          :items="items"
          striped
          hover
      >

      </b-table-lite>
      <div class="text-secondary mb-3">
        5 / 100
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <b-pagination/>

        <b-select value="10" style="width: auto">
          <b-select-option value="10">
            10
          </b-select-option>
          <b-select-option value="25">
            25
          </b-select-option>
          <b-select-option value="50">
            50
          </b-select-option>
          <b-select-option value="75">
            75
          </b-select-option>
          <b-select-option value="100">
            100
          </b-select-option>
          <b-select-option value="all">
            ВСЕ
          </b-select-option>
        </b-select>
      </div>
    </b-card>
  </b-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({

})
export default class Home extends Vue {
  items = [
    { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
    { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
    {
      age: 89,
      first_name: 'Geneva',
      last_name: 'Wilson',
    },
    {
      age: 40,
      first_name: 'Thor',
      last_name: 'MacDonald',
    },
    { age: 29, first_name: 'Dick', last_name: 'Dunlap' }
  ]
}
</script>

<style scoped lang="stylus">

</style>
