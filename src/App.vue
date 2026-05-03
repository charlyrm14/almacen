<script setup lang="ts">
  import { ref } from 'vue';
  import { areas, sections, RACKS, PRODUCTS } from './utils/layout';
  import type { Product } from './types/Layout';
  import Modal from './components/Modal.vue';
  
  const showOptions = ref<boolean>(false)
  const tabs = ref<number>(1)
  const showModal = ref<boolean>(false)
  const fullScreenElement = ref<HTMLElement | null>(null)

  const activeArea = ref<string | null>(null)
  const activeSection = ref<number | null>(0)

  const toggleArea = (area: string) => {
    activeArea.value = activeArea.value === area ? null : area
  }

  const toggleSection = (section: number) => {
    activeSection.value = activeSection.value === section ? null : section
  }

  const racks = ref(RACKS)

  const getRack = (key: string) => {
    return racks.value.find(r => r.key === key)
  }

  const search = ref('')
  const highlighted = ref<string[]>([])
  const products = ref<Product[]>(PRODUCTS)

  const handleSearch = () => {

    highlighted.value = []

    if (!search.value) return

    const results = products.value.filter(p =>
      p.name.toLowerCase().includes(search.value.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.value.toLowerCase())
    )

    results.forEach(product => {
      product.locations.forEach(loc => {
        highlighted.value.push(`${loc.rack}-${loc.level}-${loc.position}`)
      })
    })
  }

  const isHighlighted = (rack: string, level: number, position: number) => {
    return highlighted.value.includes(`${rack}-${level}-${position}`)
  }

  const closeModalLocation = () => showModal.value = false

  const toggleFullScreen = async () => {
    if (!document.fullscreenElement) {
      // Entrar en pantalla completa
      try {
        await fullScreenElement.value?.requestFullscreen()
      } catch (err) {
        console.error(`Error al intentar activar pantalla completa: ${err}`)
      }
    } else {
      // Salir de pantalla completa
      document.exitFullscreen()
    }
  }

</script>

<template>
  <section class="p-4 flex flex-col" ref="fullScreenElement" style="background: white; padding: 20px;">

    <!-- Container Input Search -->
    <div class="mt-4 flex justify-center">
        <div class="w-[40%] min-w-70 max-w-xl bg-gray-100 rounded-full shadow-md relative p-2">
            
            <input 
                type="search"
                name="search"
                placeholder="Buscar"
                v-model="search"
                @keypress="handleSearch"
                @click="handleSearch"
                class="w-full bg-white appearance-none border border-gray-200 text-xl rounded-full p-3 pr-14 focus:outline-none focus:ring-0">

            <button class="bg-blue-500 text-white rounded-full absolute right-3.5 top-1/2 -translate-y-1/2 w-10.5 h-10.5 flex justify-center items-center cursor-pointer hover:opacity-75">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="w-7 h-7" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor">
                    <path d="m21 21-4.34-4.34"/>
                    <circle cx="11" cy="11" r="8"/>
                </svg>
            </button>

        </div>
    </div>
    <!-- End Container Input -->

    <!-- Área Almacén -->
    <div class="border-2 border-dashed border-gray-300 bg-gray-100 rounded-lg p-4 mt-6 h-200 relative">
        
      <!-- Almacén -->
      <div class="w-full h-187.5 bg-gray-200 border-2 border-gray-300 polygon-warehouse relative overflow-hidden text-xs font-semibold">

        <!-- Área merma -->
        <div 
          class="absolute bg-red-100 border-3 border-red-300" style="width: 14.5%; height: 64%;"
          :class="activeArea === 'shrinkage' ? 'animate-pulse' : ''">

          <!-- SECCION E2 -->
          <div :class="activeSection === 5 ? 'animate-pulse' : ''" data-rack="E2" data-orientation="vertical" class="absolute top-2 left-1 bg-white border-2 border-yellow-300" style="width: 40%; height: 97%;"> 
            
            <!-- Pallets E2 -->
            <div v-if="getRack('E2')" class="absolute w-full">
              <div :class="`grid grid-cols-${getRack('E2')!.columns}`">
                <div
                  v-for="cell in getRack('E2')!.cells.filter(c => c.level === 1)"
                  :key="`E2-${cell.position}`"
                  data-rack="E2"
                  :data-level="cell.level"
                  :data-position="cell.position"
                  class="w-full h-6 border border-amber-400"
                  :class="isHighlighted(getRack('E2')!.key, cell.level, cell.position) ? 'bg-lime-500 animate-pulse cursor-pointer' : ''"
                  @click="isHighlighted(getRack('E2')!.key, cell.level, cell.position) ? showModal = !showModal : ''"></div>
              </div>
            </div>
            <!-- Termina Pallets E2 -->

          </div>
          <!-- Termina SECCION E2 -->

          <!-- SECCION E1 -->
          <div :class="activeSection === 5 ? 'animate-pulse' : ''" data-rack="E1" data-orientation="vertical" class="absolute top-2 right-5 bg-white border-2 border-yellow-300" style="width: 20%; height: 97%;">
              
              <!-- Pallets E1 -->
              <div v-if="getRack('E1')" class="absolute w-full">
                <div :class="`grid grid-cols-${getRack('E1')!.columns}`">
                  <div
                    v-for="cell in getRack('E1')!.cells.filter(c => c.level === 1)"
                    :key="`E1-${cell.position}`"
                    data-rack="E1"
                    :data-level="cell.level"
                    :data-position="cell.position"
                    class="w-full h-6 border border-amber-400"
                    :class="isHighlighted(getRack('E1')!.key, cell.level, cell.position) ? 'bg-lime-500 animate-pulse' : ''"></div>
                </div>
              </div>
              <!-- Termina Pallets E1 -->  
                    
          </div>
          <!-- Termina SECCION E1 -->

        </div>
        <!-- Termina Área de merma  -->

        <!-- Camara fría izquierda -->
        <div 
          class="absolute left-54 bg-blue-100 border-3 border-blue-300" style="width: 30%; height: 64%;"
          :class="activeArea === 'cold' ? 'animate-pulse' : ''">
        
            <!-- SECCION CAMARA FRIA F4 -->
            <div :class="activeSection === 6 ? 'animate-pulse' : ''" data-rack="F4" data-orientation="vertical" class="absolute top-2 left-1 bg-white border-2 border-red-300" style="width: 12%; height: 92%;">

              <!-- Pallets F4 -->
              <div v-if="getRack('F4')" class="absolute w-full">
                <div :class="`grid grid-cols-${getRack('F4')!.columns}`">
                  <div
                    v-for="cell in getRack('F4')!.cells.filter(c => c.level === 1)"
                    :key="`F4-${cell.position}`"
                    data-rack="F4"
                    :data-level="cell.level"
                    :data-position="cell.position"
                    class="w-full h-6 border border-red-400"></div>
                </div>
              </div>
              <!-- Termina Pallets F4 --> 
            
            </div>
            <!-- Termina SECCION CAMARA FRIA F4  -->

            <!-- SECCION CAMARA FRIA F3 -->
            <div :class="activeSection === 6 ? 'animate-pulse' : ''" data-rack="F3" data-orientation="vertical" class="absolute top-6 left-22 bg-white border-2 border-red-300" style="width: 24%; height: 41%;">

              <!-- Pallets F3 -->
              <div v-if="getRack('F3-3')" class="absolute w-full">
                <div :class="`grid grid-cols-${getRack('F3-3')!.columns}`">
                  <div
                    v-for="cell in getRack('F3-3')!.cells.filter(c => c.level === 1)"
                    :key="`F3-3-${cell.position}`"
                    data-rack="F3"
                    :data-level="cell.level"
                    :data-position="cell.position"
                    class="w-full h-8 border border-red-400"></div>
                </div>
              </div>
              <!-- Termina Pallets F3 --> 
              
            </div>

            <div :class="activeSection === 6 ? 'animate-pulse' : ''" data-rack="F3" data-orientation="vertical" class="absolute top-54.5 left-22 bg-white border-2 border-red-300" style="width: 18%; height: 11%;">

              <!-- Pallets F3 -->
              <div v-if="getRack('F3-2')" class="absolute w-full">
                <div :class="`grid grid-cols-${getRack('F3-2')!.columns}`">
                  <div
                    v-for="cell in getRack('F3-2')!.cells.filter(c => c.level === 1)"
                    :key="`F3-2-${cell.position}`"
                    data-rack="F3"
                    :data-level="cell.level"
                    :data-position="cell.position"
                    class="w-full h-11.5 border border-red-400"></div>
                </div>
              </div>
              <!-- Termina Pallets F3 --> 
              
            </div>

            <div :class="activeSection === 6 ? 'animate-pulse' : ''" data-rack="F3" data-orientation="vertical" class="absolute bottom-2.5 left-22 bg-white border-2 border-red-300" style="width: 24%; height: 41%;">

              <!-- Pallets F3 -->
              <div v-if="getRack('F3-1')" class="absolute w-full">
                <div :class="`grid grid-cols-${getRack('F3-1')!.columns}`">
                  <div
                    v-for="cell in getRack('F3-1')!.cells.filter(c => c.level === 1)"
                    :key="`F3-1-${cell.position}`"
                    data-rack="F3"
                    :data-level="cell.level"
                    :data-position="cell.position"
                    class="w-full h-8 border border-red-400"></div>
                </div>
              </div>
              <!-- Termina Pallets F3 --> 
              
            </div>
            <!-- Termina SECCION CAMARA FRIA F3 -->

            <!-- SECCION CAMARA FRIA F2 -->
            <div :class="activeSection === 6 ? 'animate-pulse' : ''" data-rack="F2" data-orientation="vertical" class="absolute top-6 left-58 bg-white border-2 border-red-300" style="width: 24%; height: 41%;">

              <!-- Pallets F2 -->
              <div v-if="getRack('F2-3')" class="absolute w-full">
                <div :class="`grid grid-cols-${getRack('F2-3')!.columns}`">
                  <div
                    v-for="cell in getRack('F2-3')!.cells.filter(c => c.level === 1)"
                    :key="`F2-3-${cell.position}`"
                    data-rack="F2"
                    :data-level="cell.level"
                    :data-position="cell.position"
                    class="w-full h-8 border border-red-400"></div>
                </div>
              </div>
              <!-- Termina Pallets F2 --> 
              
            </div>

            <div :class="activeSection === 6 ? 'animate-pulse' : ''" data-rack="F2" data-orientation="vertical" class="absolute top-54.5 left-64.5 bg-white border-2 border-red-300" style="width: 18%; height: 11%;">

              <!-- Pallets F2 -->
              <div v-if="getRack('F2-2')" class="absolute w-full">
                <div :class="`grid grid-cols-${getRack('F2-2')!.columns}`">
                  <div
                    v-for="cell in getRack('F2-2')!.cells.filter(c => c.level === 1)"
                    :key="`F2-2-${cell.position}`"
                    data-rack="F2"
                    :data-level="cell.level"
                    :data-position="cell.position"
                    class="w-full h-11.5 border border-red-400"></div>
                </div>
              </div>
              <!-- Termina Pallets F2 -->
              
            </div>

            <div :class="activeSection === 6 ? 'animate-pulse' : ''" data-rack="F2" data-orientation="vertical" class="absolute bottom-2.5 left-58 bg-white border-2 border-red-300" style="width: 24%; height: 41%;">
              
              <!-- Pallets F2 -->
              <div v-if="getRack('F2-1')" class="absolute w-full">
                <div :class="`grid grid-cols-${getRack('F2-1')!.columns}`">
                  <div
                    v-for="cell in getRack('F2-1')!.cells.filter(c => c.level === 1)"
                    :key="`F2-1-${cell.position}`"
                    data-rack="F2"
                    :data-level="cell.level"
                    :data-position="cell.position"
                    class="w-full h-8 border border-red-400"></div>
                </div>
              </div>
              <!-- Termina Pallets F2 -->

            </div>
            <!-- Termina SECCION CAMARA FRIA F2 -->

            <!-- SECCION CAMARA FRIA F1 -->
            <div :class="activeSection === 6 ? 'animate-pulse' : ''" data-rack="F1" data-orientation="vertical" class="absolute top-2 right-1 bg-white border-2 border-red-300" style="width: 12%; height: 93.5%;">
              
              <!-- Pallets F1 -->
              <div v-if="getRack('F1')" class="absolute w-full">
                <div :class="`grid grid-cols-${getRack('F1')!.columns}`">
                  <div
                    v-for="cell in getRack('F1')!.cells.filter(c => c.level === 1)"
                    :key="`F1-${cell.position}`"
                    data-rack="F1"
                    :data-level="cell.level"
                    :data-position="cell.position"
                    class="w-full h-6.5 border border-red-400"></div>
                </div>
              </div>
              <!-- Termina Pallets F1 -->
              
            </div>
            <!-- Termina SECCION CAMARA FRIA F1  -->
        
        </div>
        <!-- Termina Camara fría izquierda -->

        <!-- Camara fría derecha -->
        <div 
          class="absolute left-164 bg-blue-100 border-3 border-blue-300 polygon-cold-room" style="width: 27%; height: 64%;"
          :class="activeArea === 'cold' ? 'animate-pulse' : ''">

            <!-- SECCION CAMARA FRIA G7 -->
            <div :class="activeSection === 7 ? 'animate-pulse' : ''" data-rack="G7" data-orientation="vertical" class="absolute bottom-2 left-1 bg-white border-2 border-red-300" style="width: 6%; height: 95%;">      
              
              <!-- Pallets G7 -->
              <div v-if="getRack('G7')" class="absolute w-full">
                <div :class="`grid grid-cols-${getRack('G7')!.columns}`">
                  <div
                    v-for="cell in getRack('G7')!.cells.filter(c => c.level === 1)"
                    :key="`G7-${cell.position}`"
                    data-rack="G7"
                    :data-level="cell.level"
                    :data-position="cell.position"
                    class="w-full h-7 border border-red-400"></div>
                </div>
              </div>
              <!-- Termina Pallets G7 -->
              
            </div>
            <!-- Termina SECCION CAMARA FRIA G7  -->
            
            <!-- SECCION CAMARA FRIA G6 -->
            <div :class="activeSection === 7 ? 'animate-pulse' : ''" data-rack="G6" data-orientation="vertical" class="absolute bottom-2 left-13 bg-white border-2 border-red-300" style="width: 10%; height: 88%;">

              <!-- Pallets G6 -->
              <div v-if="getRack('G6')" class="absolute w-full">
                <div :class="`grid grid-cols-${getRack('G6')!.columns}`">
                  <div
                    v-for="cell in getRack('G6')!.cells.filter(c => c.level === 1)"
                    :key="`G6-${cell.position}`"
                    data-rack="G6"
                    :data-level="cell.level"
                    :data-position="cell.position"
                    class="w-full h-8 border border-red-400"></div>
                </div>
              </div>
              <!-- Termina Pallets G6 -->
              
            </div>
            <!-- Termina SECCION CAMARA FRIA G6  -->

            <!-- SECCION CAMARA FRIA G5 -->
            <div :class="activeSection === 7 ? 'animate-pulse' : ''" data-rack="G5" data-orientation="vertical" class="absolute bottom-2 left-28 bg-white border-2 border-red-300" style="width: 10%; height: 79.5%;">
              
              <!-- Pallets G5-->
              <div v-if="getRack('G5')" class="absolute w-full">
                <div :class="`grid grid-cols-${getRack('G5')!.columns}`">
                  <div
                    v-for="cell in getRack('G5')!.cells.filter(c => c.level === 1)"
                    :key="`G5-${cell.position}`"
                    data-rack="G5"
                    :data-level="cell.level"
                    :data-position="cell.position"
                    class="w-full h-8.5 border border-red-400"></div>
                </div>
              </div>
              <!-- Termina Pallets G5 -->

            </div>
            <!-- Termina SECCION CAMARA FRIA G5  -->

            <!-- SECCION CAMARA FRIA G4 -->
            <div :class="activeSection === 7 ? 'animate-pulse' : ''" data-rack="G4" data-orientation="vertical" class="absolute bottom-2 left-40 bg-white border-2 border-red-300" style="width: 10%; height: 75%;">

              <!-- Pallets G4 -->
              <div v-if="getRack('G4')" class="absolute w-full">
                <div :class="`grid grid-cols-${getRack('G4')!.columns}`">
                  <div
                    v-for="cell in getRack('G4')!.cells.filter(c => c.level === 1)"
                    :key="`G4-${cell.position}`"
                    data-rack="G4"
                    :data-level="cell.level"
                    :data-position="cell.position"
                    class="w-full h-8 border border-red-400"></div>
                </div>
              </div>
              <!-- Termina Pallets G4 -->
              
            </div>
            <!-- Termina SECCION CAMARA FRIA G4  -->

            <!-- SECCION CAMARA FRIA G3 -->
            <div :class="activeSection === 7 ? 'animate-pulse' : ''" data-rack="G3" data-orientation="vertical" class="absolute bottom-2 left-57 bg-white border-2 border-red-300" style="width: 10%; height: 69%;">

              <!-- Pallets G3 -->
              <div v-if="getRack('G3')" class="absolute w-full">
                <div :class="`grid grid-cols-${getRack('G3')!.columns}`">
                  <div
                    v-for="cell in getRack('G3')!.cells.filter(c => c.level === 1)"
                    :key="`G3-${cell.position}`"
                    data-rack="G3"
                    :data-level="cell.level"
                    :data-position="cell.position"
                    class="w-full h-9 border border-red-400"></div>
                </div>
              </div>
              <!-- Termina Pallets G3 -->
              
            </div>
            <!-- Termina SECCION CAMARA FRIA G3  -->

            <!-- SECCION CAMARA FRIA G2 -->
            <div :class="activeSection === 7 ? 'animate-pulse' : ''" data-rack="G2" data-orientation="vertical" class="absolute bottom-2 right-17 bg-white border-2 border-red-300" style="width: 10%; height: 60%;">

              <!-- Pallets G2 -->
              <div v-if="getRack('G2')" class="absolute w-full">
                <div :class="`grid grid-cols-${getRack('G2')!.columns}`">
                  <div
                    v-for="cell in getRack('G2')!.cells.filter(c => c.level === 1)"
                    :key="`G2-${cell.position}`"
                    data-rack="G2"
                    :data-level="cell.level"
                    :data-position="cell.position"
                    class="w-full h-10 border border-red-400"></div>
                </div>
              </div>
              <!-- Termina Pallets G2 -->
              
            </div>
            <!-- Termina SECCION CAMARA FRIA G2  -->

            <!-- SECCION CAMARA FRIA G1 -->
            <div :class="activeSection === 7 ? 'animate-pulse' : ''" data-rack="G1" data-orientation="vertical" class="absolute bottom-2 right-2 bg-white border-2 border-red-300" style="width: 10%; height: 60%;">

              <!-- Pallets G1 -->
              <div v-if="getRack('G1')" class="absolute w-full">
                <div :class="`grid grid-cols-${getRack('G1')!.columns}`">
                  <div
                    v-for="cell in getRack('G1')!.cells.filter(c => c.level === 1)"
                    :key="`G1-${cell.position}`"
                    data-rack="G1"
                    :data-level="cell.level"
                    :data-position="cell.position"
                    class="w-full h-10 border border-red-400"></div>
                </div>
              </div>
              <!-- Termina Pallets G1 -->
              
            </div>
            <!-- Termina SECCION CAMARA FRIA G1  -->

        </div>
        <!-- Termina Camara fría derecha -->

        <!-- Área Desechos -->
        <div 
          class="absolute top-56 right-81 bg-purple-200 border-3 border-purple-400" style="width: 6.5%; height: 34%;"
          :class="activeArea === 'trash' ? 'animate-pulse' : ''"></div>
        <!-- Termina Área Desechos -->

        <!-- Área Comedor -->
        <div 
          class="absolute top-65 right-62 bg-orange-200 border-3 border-orange-400" style="width: 5%; height: 32%;"
          :class="activeArea === 'dining' ? 'animate-pulse' : ''"></div>
        <!-- Termina Área Comedor -->

        <!-- Área Baños -->
        <div 
          class="absolute top-102 right-1 bg-cyan-200 border-3 border-cyan-400" style="width: 16.5%; height: 9%;"
          :class="activeArea === 'bathroom' ? 'animate-pulse' : ''"></div>
        <!-- Termina Área Baños -->

        <!-- Área Oficinas -->
        <div 
          class="absolute bottom-1 right-62 bg-indigo-200 border-3 border-indigo-400" style="width: 5%; height: 30%;"
          :class="activeArea === 'office' ? 'animate-pulse' : ''"></div>
        <!-- Termina Área Oficinas -->

        <!-- Área Oficinas 2 -->
        <div 
          class="absolute bottom-1 right-1 bg-indigo-200 border-3 border-indigo-400" style="width: 16%; height: 30%;"
          :class="activeArea === 'office' ? 'animate-pulse' : ''"></div>
        <!-- Termina Área Oficinas 2 -->

        <!-- SECCION D -->
        <div :class="activeSection === 4 ? 'animate-pulse' : ''">

          <!-- SECCION D3 -->
          <div data-rack="D3" data-orientation="vertical" class="absolute bottom-11 left-2 bg-white border-2 border-yellow-300" style="width: 5%; height: 26.5%;">
            
              <!-- Pallets D3 -->
              <div v-if="getRack('D3')" class="absolute w-full">
                <div :class="`grid grid-cols-${getRack('D3')!.columns}`">
                  <div
                    v-for="cell in getRack('D3')!.cells.filter(c => c.level === 1)"
                    :key="`D3-${cell.position}`"
                    data-rack="D3"
                    :data-level="cell.level"
                    :data-position="cell.position"
                    class="w-full h-7 border border-amber-400"></div>
                </div>
              </div>
              <!-- Termina Pallets D3 -->  

          </div>
          <!-- Termina SECCION D3  -->

          <!-- SECCION D2 -->
          <div data-rack="D2" data-orientation="vertical" class="absolute bottom-11 left-25 bg-white border-2 border-yellow-300" style="width: 5%; height: 26.5%;">

            <!-- Pallets D2 -->
            <div v-if="getRack('D2')" class="absolute w-full">
              <div :class="`grid grid-cols-${getRack('D2')!.columns}`">
                  <div
                    v-for="cell in getRack('D2')!.cells.filter(c => c.level === 1)"
                    :key="`D2-${cell.position}`"
                    data-rack="D2"
                    :data-level="cell.level"
                    :data-position="cell.position"
                    class="w-full h-7 border border-amber-400"></div>
                </div>
            </div>
            <!-- Termina Pallets D2 -->  
              
          </div>
          <!-- Termina SECCION D2  -->
          
          <!-- SECCION D1 -->
          <div data-rack="D1" data-orientation="vertical" class="absolute bottom-11 left-52 bg-white border-2 border-yellow-300" style="width: 2.6%; height: 26.5%;">  
            
            <!-- Pallets D1 -->
            <div v-if="getRack('D1')" class="absolute w-full">
              <div :class="`grid grid-cols-${getRack('D1')!.columns}`">
                <div
                  v-for="cell in getRack('D1')!.cells.filter(c => c.level === 1)"
                  :key="`D1-${cell.position}`"
                  data-rack="D1"
                  :data-level="cell.level"
                  :data-position="cell.position"
                  class="w-full h-12 border border-amber-400"></div>
              </div>
            </div>
            <!-- Termina Pallets D1 --> 
              
          </div>
          <!-- SECCION D1 -->

        </div>
        <!-- Termina SECCION D -->

        <!-- Área maquila -->
        <div 
          class="absolute left-65 bottom-17 bg-amber-200 border-3 border-amber-300" style="width: 14%; height: 22%;"
          :class="activeArea === 'maquila' ? 'animate-pulse' : ''">
            <div v-if="activeArea === 'maquila'" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-2 bg-white rounded-full">
              <div class="p-1">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="28" 
                  height="28" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  class="lucide lucide-map-pin-icon lucide-map-pin">
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                    <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
            </div>
        </div>
        <!-- Termina Área maquila  -->

        <!-- SECCION C -->
        <div :class="activeSection === 3 ? 'animate-pulse' : ''">
          
          <!-- SECCION C1 -->
          <div data-rack="C1" data-orientation="vertical" class="absolute bottom-28 left-119 bg-white border-2 border-yellow-300" style="width: 2.6%; height: 15.5%;">
            
            <!-- Pallets C1 -->
            <div v-if="getRack('C1')" class="absolute w-full">
              <div :class="`grid grid-cols-${getRack('C1')!.columns}`">
                <div
                  v-for="cell in getRack('C1')!.cells.filter(c => c.level === 1)"
                  :key="`C1-${cell.position}`"
                  data-rack="C1"
                  :data-level="cell.level"
                  :data-position="cell.position"
                  class="w-full h-7 border border-amber-400"></div>
              </div>
            </div>
            <!-- Termina Pallets C1 --> 
              
          </div>
          <!-- Termina SECCION C1  -->
          
        </div>
        <!-- Termina SECCION C -->
        
        <!-- SECCION B -->
        <div :class="activeSection === 2 ? 'animate-pulse' : ''">
          <!-- SECCION B1 -->
          <div data-rack="B1" data-orientation="horizontal" class="absolute bottom-45 left-134 bg-white border-2 border-yellow-300" style="width: 31.5%; height: 7%;">
            
            <!-- Pallets B1 -->
            <div v-if="getRack('B1')" class="absolute w-full">
              <div :class="`grid grid-cols-${getRack('B1')!.columns}`">
                <div
                  v-for="cell in getRack('B1')!.cells.filter(c => c.level === 1)"
                  :key="`B1-${cell.position}`"
                  data-rack="B1"
                  :data-level="cell.level"
                  :data-position="cell.position"
                  class="w-full h-3 border border-amber-400"></div>
              </div>
            </div>
            <!-- Termina Pallets B1 --> 
              
          </div>
          <!-- SECCION B1 -->
        </div>
        <!-- Termina SECCION B  -->

        <!-- SECCION A -->
        <div :class="activeSection === 1 ? 'animate-pulse' : ''">
          
          <!-- SECCION A2 -->
          <div data-rack="A2" data-orientation="vertical" class="absolute bottom-11.5 right-100 bg-white border-2 border-yellow-300" style="width: 3.2%; height: 25%;">

            <!-- Pallets A2 -->
            <div v-if="getRack('A2')" class="absolute w-full">
              <div :class="`grid grid-cols-${getRack('A2')!.columns}`">
                <div
                  v-for="cell in getRack('A2')!.cells.filter(c => c.level === 1)"
                  :key="`A2-${cell.position}`"
                  data-rack="A2"
                  :data-level="cell.level"
                  :data-position="cell.position"
                  class="w-full h-6.5 border border-amber-400"></div>
              </div>
            </div>
            <!-- Termina Pallets A2 --> 
              
          </div>
          <!-- SECCION A2 -->

          <!-- SECCION A1 -->
          <div data-rack="A1" data-orientation="vertical" class="absolute bottom-11.5 right-84 bg-white border-2 border-yellow-300" style="width: 3.2%; height: 25%;">
            
            <!-- Pallets A1 -->
            <div v-if="getRack('A1')" class="absolute w-full">
              <div :class="`grid grid-cols-${getRack('A1')!.columns}`">
                <div
                  v-for="cell in getRack('A1')!.cells.filter(c => c.level === 1)"
                  :key="`A1-${cell.position}`"
                  data-rack="A1"
                  :data-level="cell.level"
                  :data-position="cell.position"
                  class="w-full h-6.5 border border-amber-400"></div>
              </div>
            </div>
            <!-- Termina Pallets A1 --> 
              
          </div>
          <!-- SECCION A1 -->
          
        </div>
        <!-- Termina SECCION A  -->

        <!-- Áreas de carga/descarga -->
        <div 
          class="absolute left-25 bottom-1 bg-lime-200 border-3 border-lime-400" style="width: 2%; height: 4%;"
          :class="activeArea === 'loading' ? 'animate-pulse' : ''"></div>
        <div 
          class="absolute left-35 bottom-1 bg-lime-200 border-3 border-lime-400" style="width: 2%; height: 4%;"
          :class="activeArea === 'loading' ? 'animate-pulse' : ''"></div>
        <div 
          class="absolute left-45 bottom-1 bg-lime-200 border-3 border-lime-400" style="width: 2%; height: 4%;"
          :class="activeArea === 'loading' ? 'animate-pulse' : ''"></div>
        <div 
          class="absolute left-55 bottom-1 bg-lime-200 border-3 border-lime-400" style="width: 2%; height: 4%;"
          :class="activeArea === 'loading' ? 'animate-pulse' : ''"></div>
        <div 
          class="absolute left-65 bottom-1 bg-lime-200 border-3 border-lime-400" style="width: 2%; height: 4%;"
          :class="activeArea === 'loading' ? 'animate-pulse' : ''"></div>
        <div 
          class="absolute left-75 bottom-1 bg-lime-200 border-3 border-lime-400" style="width: 2%; height: 4%;"
          :class="activeArea === 'loading' ? 'animate-pulse' : ''"></div>
        <div 
          class="absolute left-85 bottom-1 bg-lime-200 border-3 border-lime-400" style="width: 2%; height: 4%;"
          :class="activeArea === 'loading' ? 'animate-pulse' : ''"></div>
        <div 
          class="absolute left-95 bottom-1 bg-lime-200 border-3 border-lime-400" style="width: 2%; height: 4%;"
          :class="activeArea === 'loading' ? 'animate-pulse' : ''"></div>

        <div 
          class="absolute left-125 bottom-1 bg-lime-200 border-3 border-lime-400" style="width: 2%; height: 4%;"
          :class="activeArea === 'loading' ? 'animate-pulse' : ''"></div>
        <div 
          class="absolute left-135 bottom-1 bg-lime-200 border-3 border-lime-400" style="width: 2%; height: 4%;"
          :class="activeArea === 'loading' ? 'animate-pulse' : ''"></div>
        <div 
          class="absolute left-145 bottom-1 bg-lime-200 border-3 border-lime-400" style="width: 2%; height: 4%;"
          :class="activeArea === 'loading' ? 'animate-pulse' : ''"></div>

        <div 
          class="absolute left-185 bottom-1 bg-lime-200 border-3 border-lime-400" style="width: 2%; height: 4%;"
          :class="activeArea === 'loading' ? 'animate-pulse' : ''"></div>
        <div 
          class="absolute left-195 bottom-1 bg-lime-200 border-3 border-lime-400" style="width: 2%; height: 4%;"
          :class="activeArea === 'loading' ? 'animate-pulse' : ''"></div>
        <div 
          class="absolute left-205 bottom-1 bg-lime-200 border-3 border-lime-400" style="width: 2%; height: 4%;"
          :class="activeArea === 'loading' ? 'animate-pulse' : ''"></div>
        <div 
          class="absolute left-215 bottom-1 bg-lime-200 border-3 border-lime-400" style="width: 2%; height: 4%;"
          :class="activeArea === 'loading' ? 'animate-pulse' : ''"></div>
        <div 
          class="absolute left-225 bottom-1 bg-lime-200 border-3 border-lime-400" style="width: 2%; height: 4%;"
          :class="activeArea === 'loading' ? 'animate-pulse' : ''"></div>
        <div 
          class="absolute left-235 bottom-1 bg-lime-200 border-3 border-lime-400" style="width: 2%; height: 4%;"
          :class="activeArea === 'loading' ? 'animate-pulse' : ''"></div>
        <div 
          class="absolute left-245 bottom-1 bg-lime-200 border-3 border-lime-400" style="width: 2%; height: 4%;"
          :class="activeArea === 'loading' ? 'animate-pulse' : ''"></div>
        <!-- Termina Áreas de carga/descarga -->

      </div>
      <!-- Termina Almacén -->

      <!-- Option button's -->
      <div class="absolute top-3 right-6">
        <div class="flex justify-between items-center gap-x-2">
          <button 
              @click="showOptions = !showOptions" 
              class="bg-pink-500 text-white p-2 rounded-full shadow-lg cursor-pointer hover:opacity-75"
              :class="showOptions ? 'border border-gray-300' : 'border border-gray-100'">
                  <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="22"
                      height="22"
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      stroke-width="2" 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      class="lucide lucide-grip-icon lucide-grip">
                          <circle cx="12" cy="5" r="1"/>
                          <circle cx="19" cy="5" r="1"/>
                          <circle cx="5" cy="5" r="1"/>
                          <circle cx="12" cy="12" r="1"/>
                          <circle cx="19" cy="12" r="1"/>
                          <circle cx="5" cy="12" r="1"/>
                          <circle cx="12" cy="19" r="1"/>
                          <circle cx="19" cy="19" r="1"/>
                          <circle cx="5" cy="19" r="1"/>
                  </svg>
          </button>
          <button 
            class="bg-slate-400 text-white p-2 rounded-full shadow-lg cursor-pointer hover:opacity-75"
            @click="toggleFullScreen">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="22" 
              height="22" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              class="lucide lucide-fullscreen-icon lucide-fullscreen">
                <path d="M3 7V5a2 2 0 0 1 2-2h2"/>
                <path d="M17 3h2a2 2 0 0 1 2 2v2"/>
                <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>
                <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
                <rect width="10" height="8" x="7" y="8" rx="1"/>
            </svg>
          </button>
        </div>
          
          <div v-if="showOptions" class="bg-white border border-gray-200 rounded-lg py-2 px-3 absolute top-12 right-12 shadow-md w-80 h-70 space-y-2 transition-colors overflow-y-auto">
              <div class="flex justify-start items-center gap-x-3 mt-2 border-b border-gray-200">
                  <button 
                    @click="tabs = 1" 
                    class="cursor-pointer hover:opacity-75 text-lg"
                    :class="tabs === 1 ? 'border-b-2 border-blue-500 font-light' : 'text-gray-400 font-extralight'"> 
                      Ubicaciones
                  </button>
                  <button 
                    @click="tabs = 2" 
                    class="cursor-pointer hover:opacity-75 text-lg"
                    :class="tabs === 2 ? 'border-b-2 border-blue-500 font-light' : 'text-gray-400 font-extralight'"> 
                      Racks
                  </button>
              </div>
              <div v-if="tabs === 1" class="mt-4 space-y-2">
                  <div
                    v-for="area in areas"
                    :key="area.id"
                    @click="toggleArea(area.id)"
                    class="flex justify-between items-center border-b border-dashed border-gray-300 text-gray-600 cursor-pointer hover:bg-gray-100 p-1 rounded"
                    :class="activeArea === area.id ? 'bg-gray-100' : ''">
                      <span class="text-lg"> {{ area.label }} </span>
                      <div class="w-5 h-5 flex items-center justify-center text-gray-500">
                          <span v-if="area.icon === 'snowflake'">
                            <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            stroke-width="2" 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            class="lucide lucide-thermometer-snowflake-icon lucide-thermometer-snowflake mb-1">
                                <path d="m10 20-1.25-2.5L6 18"/>
                                <path d="M10 4 8.75 6.5 6 6"/>
                                <path d="M10.585 15H10"/>
                                <path d="M2 12h6.5L10 9"/>
                                <path d="M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z"/>
                                <path d="m4 10 1.5 2L4 14"/>
                                <path d="m7 21 3-6-1.5-3"/>
                                <path d="m7 3 3 6h2"/>
                          </svg>
                        </span>
                        <span v-else-if="area.icon === 'alert'">
                          <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="20" 
                              height="20" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              stroke-width="2" 
                              stroke-linecap="round" 
                              stroke-linejoin="round" 
                              class="lucide lucide-clock-alert-icon lucide-clock-alert">
                                  <path d="M12 6v6l4 2"/>
                                  <path d="M20 12v5"/>
                                  <path d="M20 21h.01"/>
                                  <path d="M21.25 8.2A10 10 0 1 0 16 21.16"/>
                          </svg>
                        </span>
                        <span v-else-if="area.icon === 'factory'">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            stroke-width="2" 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            class="lucide lucide-factory-icon lucide-factory">
                              <path d="M12 16h.01"/>
                              <path d="M16 16h.01"/>
                              <path d="M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"/>
                              <path d="M8 16h.01"/>
                          </svg>
                        </span>
                        <span v-else-if="area.icon === 'truck'">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            stroke-width="2" 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            class="lucide lucide-truck-icon lucide-truck">
                              <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
                              <path d="M15 18H9"/>
                              <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
                              <circle cx="17" cy="18" r="2"/>
                              <circle cx="7" cy="18" r="2"/>
                          </svg>
                        </span>
                        <span v-else-if="area.icon === 'trash'">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            stroke-width="2" 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            class="lucide lucide-trash-icon lucide-trash">
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                              <path d="M3 6h18"/>
                              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                        </span>
                        <span v-else-if="area.icon === 'office'">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            stroke-width="2" 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            class="lucide lucide-laptop-icon lucide-laptop">
                              <path d="M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z"/>
                              <path d="M20.054 15.987H3.946"/>
                          </svg>
                        </span>
                        <span v-else-if="area.icon === 'food'">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            stroke-width="2" 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            class="lucide lucide-hand-platter-icon lucide-hand-platter">
                              <path d="M12 3V2"/>
                              <path d="m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5"/>
                              <path d="M2 14h12a2 2 0 0 1 0 4h-2"/>
                              <path d="M4 10h16"/>
                              <path d="M5 10a7 7 0 0 1 14 0"/>
                              <path d="M5 14v6a1 1 0 0 1-1 1H2"/>
                          </svg>
                        </span>
                        <span v-else-if="area.icon === 'bathroom'">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            stroke-width="2" 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            class="lucide lucide-toilet-icon lucide-toilet">
                              <path d="M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18"/>
                              <path d="M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8"/>
                          </svg>
                        </span>
                      </div>
                  </div>
              </div>
              <div v-if="tabs === 2" class="mt-3 space-y-2">
                  <div class="grid grid-cols-4 gap-3">
                    <div
                      v-for="section in sections"
                      :key="section.id"
                      @click="toggleSection(section.id)"
                      class="border border-dashed border-gray-300 rounded h-15 flex flex-col items-center cursor-pointer hover:opacity-75"
                      :class="activeSection === section.id ? 'bg-blue-500 text-white' : ''">
                        <span class="font-bold text-xl mt-1"> {{ section.id }} </span>
                        <span class="font-light text-xs"> {{ section.label }} </span>
                    </div>
                  </div>
              </div>
          </div>
      </div>
      <!-- Termina Option button's -->

    </div>
    <!-- Termina Área Almacén -->

    <!-- Modal -->
    <Modal
      v-if="showModal"
      @close-modal-location="closeModalLocation"/>
    <!-- Termina Modal -->
    
    </section>
</template>

<style scope>
    .polygon-warehouse {
      clip-path: polygon(
        0% 0%,
        45% 0%,
        100% 50%,
        100% 100%,
        0% 100%
      );
    }

    .polygon-cold-room {
      clip-path: polygon(
        0% 0%,
        0% 0%,
        100% 39%,
        100% 100%,
        0% 100%
      );
    }
</style>