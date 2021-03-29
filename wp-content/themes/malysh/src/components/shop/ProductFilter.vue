<template>
  <div class="filter mb-5">
    <h3>
      Подобрать товар
    </h3>
    <b-form @submit.prevent="filteredProducts" @reset.prevent="resetFilters">
      <!--Категории-->
      <b-form-group label="Категория" v-if="filters.categories.length">
        <b-form-checkbox-group
            id="checkbox-group-1"
            v-model="filters.selected_categories"
            name="categories"
            stacked
            @change="filteredProducts"
        >
          <b-form-checkbox
              v-for="cat in filters.categories"
              :key="cat.id"
              :value="cat.id"
          >
            {{ cat.name }}
          </b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <!--Атрибуты подкатегории-->
      <b-form-group label="Подкатегория" v-if="filters.subCategories.length">
        <b-form-checkbox-group
            id="checkbox-group-2"
            v-model="filters.selected_subCategories"
            name="subCategories"
            stacked
            @change="filteredProducts"
        >
          <b-form-checkbox
              v-for="subCat in filters.subCategories"
              :key="subCat.id"
              :value="subCat.name"
          >
            {{ subCat.name }}
          </b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <!--Атрибуты размер-->
      <b-form-group label="Размер" v-if="filters.sizes.length">
        <b-form-checkbox-group
            id="checkbox-group-3"
            class="checkbox-sizes"
            v-model="filters.selected_sizes"
            name="sizes"
            stacked
            @change="filteredProducts"
        >
          <b-form-checkbox
              v-for="size in filters.sizes"
              :key="size.id"
              :value="size.name"
          >
            {{ size.name }}
          </b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <!--Атрибуты рост-->
      <b-form-group label="Рост" v-if="filters.height.length">
        <b-form-checkbox-group
            id="checkbox-group-3"
            v-model="filters.selected_height"
            name="height"
            stacked
            @change="filteredProducts"
        >
          <b-form-checkbox
              v-for="item in filters.height"
              :key="item.id"
              :value="item.name"
          >
            {{ item.name }}
          </b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <!--Фильтр по цене-->
      <b-form-group v-if="filters.selected_price.min > 0 && filters.selected_price.max > 0">
        <div class="d-flex flex-wrap justify-content-between">
          <div class="filter-range">
            <b-form-input type="range"
                          v-model="filters.selected_price.min"
                          :min="filters.price.min"
                          :max="filters.price.max"
                          @change="filteredProducts"
            />
            <b-form-input type="range"
                          v-model="filters.selected_price.max"
                          :min="filters.price.min"
                          :max="filters.price.max"
                          @change="filteredProducts"
            />
          </div>
          <span class="price-min">
                  {{ filters.selected_price.min }}
                </span>
          <span class="price-max">
                  {{ filters.selected_price.max }}
                </span>
        </div>
      </b-form-group>

      <b-form-group>
        <b-btn type="submit"
               class="btn btn-blue">
          Применить
        </b-btn>
      </b-form-group>
      <b-form-group v-if="isFilterActive">
        <b-btn type="reset"
               class="btn btn-blue">
          Сбросить фильтр
        </b-btn>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "Filter",
  props: {
    filters: {
      type: Object,
      default() {
        return {};
      }
    },
    isFilterActive: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  methods: {
    filteredProducts() {
      this.$emit('filtered', this.filters);
    },
    resetFilters() {
      this.$emit('reset');
    }
  }
}
</script>

<style scoped>

</style>