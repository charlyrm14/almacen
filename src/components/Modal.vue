<script setup lang="ts">

    defineEmits<{
        (e: 'CloseModalLocation'): void
    }>()
    
</script>

<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div class="bg-white dark:bg-dark rounded-2xl w-[95vw] h-[95vh] md:w-[40vw] md:h-auto max-w-[1200px] flex flex-col overflow-hidden">

            <div class="flex justify-between items-center border-b border-gray-200 dark:border-dark-light px-6 py-2">
                <h2 class="text-xl text-gray-600 flex items-center gap-2"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cuboid-icon lucide-cuboid"><path d="M10 22v-8"/><path d="M2.336 8.89 10 14l11.715-7.029"/><path d="M22 14a2 2 0 0 1-.971 1.715l-10 6a2 2 0 0 1-2.138-.05l-6-4A2 2 0 0 1 2 16v-6a2 2 0 0 1 .971-1.715l10-6a2 2 0 0 1 2.138.05l6 4A2 2 0 0 1 22 8z"/></svg>
                        Detalle de ubicación
                </h2>
                <button
                    class="text-gray-400 dark:text-gray-500 hover:text-red-500 transition cursor-pointer"
                    @click="$emit('CloseModalLocation')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
            </div>

            <div class="mt-3 px-6 py-4">
                <div class="w-full p-1 rounded-lg space-y-4">
                    <h4 class="text-gray-500"> Información de <span class="font-bold text-black"> Producto LWSDC-45-VT </span>  </h4>
                    <img src="../assets/img/tarima.jpg" alt="Tarima" class="rounded-lg shadow-lg">
                    <div class="space-y-2">
                        <span class="text-gray-500"> Otros productos en este rack </span>
                        <div class="flex justify-between items-center border-b border-gray-200 border-dashed mt-8">
                            <span class="mb-2"> Producto DSRGH-89-RF </span>
                            <span class="mb-2"> Barry </span>
                        </div>
                        <div class="flex justify-between items-center border-b border-gray-200 border-dashed">
                            <span class="mb-2"> Producto HJNLX-23-GB </span>
                            <span class="mb-2"> Barry </span>
                        </div>
                        <div class="flex justify-between items-center border-b border-gray-200 border-dashed">
                            <span class="mb-2"> Producto VBGHJ-12-XS </span>
                            <span class="mb-2"> Barry </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-end items-center gap-x-4 px-6 py-4 bg-white dark:bg-dark shrink-0 sticky bottom-0 mt-4">
                <button 
                    class="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer hover:opacity-75"
                    @click="$emit('CloseModalLocation')"> 
                        Cerrar 
                </button>
            </div>

        </div>
    </div>
</template>