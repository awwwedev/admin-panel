<template>
  <b-container>
    <h1 class="mb-4 mt-2" v-if="realtyType">Зависимости типа недвижимости &laquo;{{ realtyType.name }}&raquo;</h1>
    <EquipmentsRelations :type-id="$route.params.id"/>
    <RealtyRelations :type-id="$route.params.id"/>
  </b-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import RealtyType from "@/models/RealtyType";
import ItemsCountInfo from "@/components/ItemsCountInfo.vue";
import RealtyRelations from "@/views/Relationships/RealtyType/RealtyRelations.vue";
import EquipmentsRelations from "@/views/Relationships/RealtyType/EquipmentsRelations.vue";

@Component({
  components: {EquipmentsRelations, RealtyRelations, ItemsCountInfo}
})
export default class RealtyTypeRelationship extends Vue {
  realtyType = null as null | RealtyType

  created(): void {
    RealtyType.get({id: this.$route.params.id as unknown as number})
        .then(res => {
          this.realtyType = res.data
        })
  }
}
</script>

<style scoped>

</style>