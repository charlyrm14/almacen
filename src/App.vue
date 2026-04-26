<script setup lang="ts">
  import { ref } from 'vue';
  import { type LayoutItem, type Product } from './types/Layout';
  import { layout } from './utils/layout';
  import Modal from './components/Modal.vue';

  const search = ref('')
  const found = ref<{ item: LayoutItem; product: Product } | null>(null)
  const showModal = ref<boolean>(false)

  const handleSearch = () => {
    found.value = null

    for (const item of layout) {
      if (!item.products) continue

      const product = item.products.find(p =>
        p.sku.toLowerCase().includes(search.value.toLowerCase())
      )

      if (product) {
        found.value = { item, product }
        break
      }
    }
  }

  const isHighlighted = (item: LayoutItem, index: number) => {
    return (
      found.value &&
      found.value.item.id === item.id &&
      found.value.product.position === index
    )
  }

  const handleCloseModal = () => {
    console.log("here")
    showModal.value = false
  }

</script>

<template>
  <section class="p-4">

    <div class="bg-white border border-gray-300 border-dashed w-full h-screen rounded-lg shadow-lg relative">
        
        <!-- Grid -->
        <div class="grid grid-cols-16 grid-rows-16 gap-1 p-4">
          <div
              v-for="item in layout"
              :key="item.id"
              :style="{
                gridColumn: `${item.x} / span ${item.w}`,
                gridRow: `${item.y} / span ${item.h}`
              }"
              class="relative flex items-center justify-center text-xs font-bold text-black p-2 rounded"
              :class="item.type === 'rack'
                ? 'bg-red-300 border border-red-700'
                : 'bg-blue-300 border border-blue-700'">

                <!-- Label Rack ID -->
                <span class="absolute top-1 left-1 text-[10px] px-2 py-1 rounded-lg bg-black text-white cursor-pointer hover:opacity-75">
                  {{ item.id }}
                </span>
                <!-- End Label Rack ID -->

                <!-- Temperature -->
                <span
                  v-if="item.type === 'cold_room'"
                  class="text-[10px]">
                    {{ item.temperature }}  °C
                </span>
                <!-- En Temperature -->

                <!-- Tarimas -->
                <div
                  v-if="item.type === 'rack'"
                  class="flex gap-1 p-1"
                  :class="item.orientation === 'vertical' ? 'flex-col' : 'flex-row'">
                  <div
                    v-for="(p, i) in item.products"
                    :key="i"
                    class="w-6 h-6 rounded"
                    :class="isHighlighted(item, i)
                      ? 'bg-lime-500 animate-pulse border border-lime-700 cursor-pointer hover:opacity-75'
                      : 'bg-yellow-200'"
                      @click="showModal = !showModal"/>
                </div>
                <!-- End Tarimas-->

          </div>
        </div>

        <!-- Input Search -->
        <div class="absolute bottom-10 left-1/2 -translate-x-1/2 w-120">

          <!-- Result -->
          <div
            class="mt-2 text-center text-base p-2 rounded font-bold"
            :class="found ? 'bg-green-100  border border-green-200' : ''">
              {{ found ? `Encontrado en rack: ${ found.item.id}` : '' }}
          </div>
          <!-- End Result -->

          <div class="bg-gray-100 border border-gray-200 shadow-lg rounded-xl p-3 flex mt-4">
            <input
              v-model="search"
              type="text"
              placeholder="Buscar producto ..."
              class="flex-1 rounded-l p-4 border border-gray-200 text-sm bg-white focus:outline-none"/>
            <button
              @click="handleSearch"
              class="bg-blue-500 text-white p-4 rounded-r text-sm inline-flex items-center gap-x-2 cursor-pointer hover:opacity-75">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  class="lucide lucide-search-icon lucide-search">
                    <path d="m21 21-4.34-4.34"/>
                    <circle cx="11" cy="11" r="8"/>
                </svg>
            </button>
          </div>

          
        </div>
        <!-- End Input Search -->

        <!-- Modal -->
        <Modal v-if="showModal" @CloseModalLocation="handleCloseModal"/>
        <!-- End Modal -->

    </div>

  </section>
</template>